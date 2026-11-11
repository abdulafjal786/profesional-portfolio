import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Mounts a WebGL renderer into the returned ref's element and runs `setup`.
 * `setup(ctx)` may return { update(dt, t), resize(w, h), dispose() }.
 * Rendering pauses while the element is off-screen or the tab is hidden,
 * and only renders static frames when the user prefers reduced motion.
 */
export function useThreeScene(setup, deps = [], options = {}) {
  const ref = useRef(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: options.antialias ?? true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // WebGL unavailable: the CSS fallback behind the canvas stays visible.
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const canvas = renderer.domElement;
    Object.assign(canvas.style, { display: "block", width: "100%", height: "100%" });
    el.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(options.fov ?? 45, 1, 0.1, 200);
    camera.position.set(0, 0, options.cameraZ ?? 6);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const ctx = { THREE, renderer, scene, camera, el, canvas, pointer, reduce, mobile };
    const api = setupRef.current(ctx) || {};

    const render = () => renderer.render(scene, camera);

    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      api.resize?.(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const onMove = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), {
      rootMargin: "100px",
    });
    io.observe(el);

    const clock = new THREE.Clock();
    let raf = 0;
    let elapsed = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible || document.hidden) return;
      elapsed += dt;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      api.update?.(dt, elapsed);
      render();
    };

    // Reduced motion: freeze time and repaint slowly (so late-loading textures
    // still appear). Interactive scenes keep the full loop so drag still works.
    let interval = 0;
    if (reduce && !options.interactive) {
      api.onReady?.();
      const still = () => {
        if (!visible || document.hidden) return;
        api.update?.(0, 2);
        render();
      };
      still();
      interval = setInterval(still, 400);
    } else {
      loop();
    }

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      api.dispose?.();
      scene.traverse((obj) => {
        obj.geometry?.dispose?.();
        const mats = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : [];
        mats.forEach((m) => {
          Object.values(m).forEach((v) => v?.isTexture && v.dispose());
          if (m.uniforms) Object.values(m.uniforms).forEach((u) => u?.value?.isTexture && u.value.dispose());
          m.dispose();
        });
      });
      renderer.dispose();
      renderer.forceContextLoss?.();
      canvas.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
