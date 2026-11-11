import { useEffect, useRef } from "react";
import { useThreeScene } from "./useThreeScene";
import { loadTexture } from "./textures";
import { EMBER, SKY } from "./glsl";

/**
 * A ring of real 3D books (cover textures on the front face).
 * Controlled by `index`; dragging or swiping reports a new index via `onChange`.
 */
export default function BookCarousel3D({ books, index, onChange, className = "" }) {
  const indexRef = useRef(index);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const ref = useThreeScene(
    ({ THREE, scene, camera, canvas, pointer, mobile, reduce }) => {
      camera.position.set(0, 0.35, mobile ? 9.5 : 8);
      camera.lookAt(0, 0, 0);

      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const key = new THREE.DirectionalLight(0xfff1e0, 2.2);
      key.position.set(2, 4, 6);
      scene.add(key);
      const rimA = new THREE.PointLight(EMBER, 30, 20);
      rimA.position.set(-5, 1, -2);
      scene.add(rimA);
      const rimB = new THREE.PointLight(SKY, 30, 20);
      rimB.position.set(5, -1, -2);
      scene.add(rimB);

      const ring = new THREE.Group();
      scene.add(ring);
      const n = books.length;
      const step = (Math.PI * 2) / n;
      const radius = n > 3 ? 3.1 : 2.2;

      const pages = new THREE.MeshStandardMaterial({ color: 0xece2cf, roughness: 0.9 });
      const back = new THREE.MeshStandardMaterial({ color: 0x1b1824, roughness: 0.6 });
      const spines = [];
      const meshes = books.map((b, i) => {
        const cover = new THREE.MeshStandardMaterial({ color: 0x2a2633, roughness: 0.45, metalness: 0.05 });
        const spine = new THREE.MeshStandardMaterial({ color: 0x2a2633, roughness: 0.5 });
        spines.push(spine);
        // BoxGeometry face order: +x, -x, +y, -y, +z, -z
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.2, 0.26), [pages, spine, pages, pages, cover, back]);
        const a = i * step;
        const holder = new THREE.Group();
        holder.position.set(Math.sin(a) * radius, 0, Math.cos(a) * radius);
        holder.rotation.y = a;
        holder.add(mesh);
        ring.add(holder);
        loadTexture(b.cover, { max: 768, aspect: 1.5 / 2.2 })
          .then((tex) => {
            cover.map = tex;
            cover.color.set(0xffffff);
            cover.needsUpdate = true;
            // tint the spine from the cover's average colour
            const c = tex.image.getContext("2d").getImageData(2, 0, 1, tex.image.height).data;
            let r = 0, g = 0, bl = 0;
            for (let k = 0; k < c.length; k += 4) { r += c[k]; g += c[k + 1]; bl += c[k + 2]; }
            const cnt = c.length / 4;
            spine.color.setRGB(r / cnt / 255, g / cnt / 255, bl / cnt / 255, THREE.SRGBColorSpace);
          })
          .catch(() => {});
        return mesh;
      });

      // Glow floor
      const floor = new THREE.Mesh(
        new THREE.RingGeometry(0.2, radius + 1.6, 64),
        new THREE.MeshBasicMaterial({ color: EMBER, transparent: true, opacity: 0.07, side: THREE.DoubleSide })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -1.55;
      scene.add(floor);

      let rot = -indexRef.current * step;
      let target = rot;
      let lastIndex = indexRef.current;
      let dragging = false;
      let startX = 0;
      let startRot = 0;
      let moved = 0;

      const nearestIndex = (r) => ((Math.round(-r / step) % n) + n) % n;

      const onDown = (e) => {
        dragging = true;
        moved = 0;
        startX = e.clientX;
        startRot = rot;
        canvas.setPointerCapture?.(e.pointerId);
      };
      const onMoveDrag = (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        moved = Math.max(moved, Math.abs(dx));
        rot = startRot + (dx / canvas.clientWidth) * Math.PI * 1.4;
        target = rot;
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        const idx = nearestIndex(rot);
        target = -Math.round(-rot / step) * step;
        lastIndex = idx;
        if (moved > 4) onChangeRef.current?.(idx);
      };
      canvas.style.touchAction = "pan-y";
      canvas.style.cursor = "grab";
      canvas.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMoveDrag);
      window.addEventListener("pointerup", onUp);

      return {
        update(dt, t) {
          if (!dragging && indexRef.current !== lastIndex) {
            const desired = -indexRef.current * step;
            let delta = (desired - target) % (Math.PI * 2);
            if (delta > Math.PI) delta -= Math.PI * 2;
            if (delta < -Math.PI) delta += Math.PI * 2;
            target += delta;
            lastIndex = indexRef.current;
          }
          rot += (target - rot) * (reduce ? 1 : 0.08);
          ring.rotation.y = rot;
          const active = nearestIndex(rot);
          meshes.forEach((m, i) => {
            const isActive = i === active;
            m.position.y = Math.sin(t * 1.2 + i) * 0.08 + (isActive ? 0.15 : 0);
            m.rotation.y = Math.sin(t * 0.6 + i) * 0.06;
            const s = isActive ? 1.08 : 0.92;
            m.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
          });
          ring.rotation.x = pointer.y * 0.08;
          camera.position.x = pointer.x * 0.4;
          camera.lookAt(0, 0, 0);
          canvas.style.cursor = dragging ? "grabbing" : "grab";
        },
        dispose() {
          canvas.removeEventListener("pointerdown", onDown);
          window.removeEventListener("pointermove", onMoveDrag);
          window.removeEventListener("pointerup", onUp);
        },
      };
    },
    [books],
    { interactive: true }
  );

  return <div ref={ref} className={className} role="img" aria-label="3D shelf of Arun Prabhu's books. Drag to rotate." />;
}
