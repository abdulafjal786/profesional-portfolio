import { useThreeScene } from "./useThreeScene";
import { simplex3 } from "./glsl";

/**
 * Samples a photo into a field of particles that assemble on load,
 * breathe with noise, and scatter away from the pointer.
 */
export default function PortraitParticles({ src, className = "" }) {
  const ref = useThreeScene(
    ({ THREE, scene, camera, renderer, canvas, mobile }) => {
      camera.position.z = 7;
      const group = new THREE.Group();
      scene.add(group);

      const uniforms = {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uMouse: { value: new THREE.Vector3(99, 99, 0) },
        uPR: { value: renderer.getPixelRatio() },
        uSize: { value: mobile ? 2.6 : 2.4 },
      };

      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms,
        vertexShader: /* glsl */ `
          ${simplex3}
          attribute vec3 aColor; attribute vec3 aFrom; attribute float aSeed;
          uniform float uTime; uniform float uProgress; uniform vec3 uMouse;
          uniform float uPR; uniform float uSize;
          varying vec3 vColor; varying float vAlpha;
          void main(){
            float delay = aSeed * 0.45;
            float p = clamp((uProgress - delay) / (1.0 - 0.45), 0.0, 1.0);
            p = 1.0 - pow(1.0 - p, 3.0);
            vec3 pos = mix(aFrom, position, p);
            float n = snoise(vec3(position.xy * 0.6, uTime * 0.25));
            pos.z += n * 0.25;
            pos.xy += vec2(snoise(vec3(position.xy, uTime * 0.2 + 7.0)), snoise(vec3(position.yx, uTime * 0.2 + 3.0))) * 0.015;
            vec2 d = pos.xy - uMouse.xy;
            float dist = length(d);
            float push = smoothstep(1.1, 0.0, dist);
            pos.xy += normalize(d + 0.0001) * push * 0.55;
            pos.z += push * 0.8;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uSize * uPR * (1.0 + push * 1.4) * (7.0 / -mv.z);
            vColor = mix(aColor, vec3(0.945, 0.38, 0.21), push * 0.8);
            vAlpha = p;
          }`,
        fragmentShader: /* glsl */ `
          varying vec3 vColor; varying float vAlpha;
          void main(){
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            gl_FragColor = vec4(vColor, smoothstep(0.5, 0.15, d) * vAlpha);
          }`,
      });

      let points;
      let disposed = false;
      const img = new Image();
      img.onload = () => {
        if (disposed) return;
        const cols = mobile ? 140 : 200;
        const aspect = img.naturalHeight / img.naturalWidth;
        const rows = Math.round(cols * aspect);
        const c = document.createElement("canvas");
        c.width = cols;
        c.height = rows;
        const g = c.getContext("2d", { willReadFrequently: true });
        g.drawImage(img, 0, 0, cols, rows);
        const data = g.getImageData(0, 0, cols, rows).data;

        const worldH = 5.2;
        const step = worldH / rows;
        const pos = [], col = [], from = [], seed = [];
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const i = (y * cols + x) * 4;
            const r = data[i] / 255, gg = data[i + 1] / 255, b = data[i + 2] / 255;
            const lum = 0.299 * r + 0.587 * gg + 0.114 * b;
            // dark backdrop drops to a sparse haze so the figure stands out
            const bg = lum < 0.24;
            if (bg && Math.random() > 0.035) continue;
            // soft oval vignette so the portrait melts into the page
            const nx = x / cols - 0.5, ny = y / rows - 0.5;
            const v = 1 - Math.min(1, Math.hypot(nx * 1.25, ny * 1.4) * 1.75);
            if (Math.random() > v * 1.8) continue;
            pos.push((x - cols / 2) * step, (rows / 2 - y) * step, (lum - 0.5) * 0.6 + (bg ? -0.6 : 0));
            const k = bg ? 1.4 : 1.15 + lum * 0.35;
            col.push(Math.min(1, r * k), Math.min(1, gg * k), Math.min(1, b * k));
            const a = Math.random() * Math.PI * 2, rad = 6 + Math.random() * 6;
            from.push(Math.cos(a) * rad, Math.sin(a) * rad, (Math.random() - 0.5) * 8);
            seed.push(Math.random());
          }
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        geo.setAttribute("aColor", new THREE.Float32BufferAttribute(col, 3));
        geo.setAttribute("aFrom", new THREE.Float32BufferAttribute(from, 3));
        geo.setAttribute("aSeed", new THREE.Float32BufferAttribute(seed, 1));
        points = new THREE.Points(geo, mat);
        group.add(points);
      };
      img.src = src;

      const ray = new THREE.Raycaster();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const ndc = new THREE.Vector2();
      const hit = new THREE.Vector3();
      const target = new THREE.Vector3(99, 99, 0);
      const onMove = (e) => {
        const r = canvas.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        if (ray.ray.intersectPlane(plane, hit)) target.copy(group.worldToLocal(hit.clone()));
      };
      const onLeave = () => target.set(99, 99, 0);
      window.addEventListener("pointermove", onMove, { passive: true });
      canvas.addEventListener("pointerleave", onLeave);

      return {
        update(dt, t) {
          uniforms.uTime.value = t;
          if (points) uniforms.uProgress.value = dt === 0 ? 1 : Math.min(1, uniforms.uProgress.value + dt * 0.45);
          uniforms.uMouse.value.lerp(target, 0.12);
          group.rotation.y = Math.sin(t * 0.25) * 0.12;
        },
        resize(w) {
          group.position.x = w > 1024 ? 2.1 : 0;
          const s = w < 640 ? 0.8 : 1;
          group.scale.setScalar(s);
        },
        dispose() {
          disposed = true;
          window.removeEventListener("pointermove", onMove);
          canvas.removeEventListener("pointerleave", onLeave);
        },
        onReady() {
          uniforms.uProgress.value = 1;
        },
      };
    },
    [src]
  );

  return <div ref={ref} aria-hidden className={className} />;
}
