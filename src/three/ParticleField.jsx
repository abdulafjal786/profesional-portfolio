import { useThreeScene } from "./useThreeScene";
import { softPointFrag, EMBER, SKY, PAPER } from "./glsl";

/** Fixed, site-wide drifting dust that parallaxes with scroll and pointer. */
export default function ParticleField() {
  const ref = useThreeScene(({ THREE, scene, camera, renderer, pointer, mobile }) => {
    camera.position.z = 14;
    const count = mobile ? 900 : 1800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const scale = new Float32Array(count);
    const seed = new Float32Array(count);
    const palette = [EMBER, SKY, PAPER, PAPER].map((c) => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 2;
      const c = palette[(Math.random() * palette.length) | 0];
      col.set([c.r, c.g, c.b], i * 3);
      scale[i] = Math.pow(Math.random(), 3) * 3 + 0.4;
      seed[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scale, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uPR: { value: renderer.getPixelRatio() },
      },
      vertexShader: /* glsl */ `
        attribute vec3 aColor; attribute float aScale; attribute float aSeed;
        uniform float uTime; uniform float uScroll; uniform float uPR;
        varying vec3 vColor; varying float vAlpha;
        void main(){
          vec3 p = position;
          p.x += sin(uTime * 0.12 + aSeed * 6.283) * 0.6;
          p.y += cos(uTime * 0.09 + aSeed * 12.0) * 0.4;
          // depth-dependent scroll parallax, wrapped so the field never runs out
          p.y = mod(p.y + uScroll * (0.6 + (p.z + 11.0) * 0.06) + 20.0, 40.0) - 20.0;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = 26.0 * aScale * uPR / -mv.z;
          vColor = aColor;
          vAlpha = 0.35 + 0.45 * sin(uTime * 1.3 + aSeed * 40.0);
        }`,
      fragmentShader: softPointFrag,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    return {
      update(dt, t) {
        mat.uniforms.uTime.value = t;
        const target = window.scrollY * 0.004;
        mat.uniforms.uScroll.value += (target - mat.uniforms.uScroll.value) * 0.08;
        points.rotation.y = pointer.x * 0.08;
        points.rotation.x = -pointer.y * 0.05;
      },
    };
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,rgba(241,97,54,0.14),transparent_70%),radial-gradient(50%_45%_at_95%_30%,rgba(39,174,228,0.12),transparent_70%),radial-gradient(70%_60%_at_50%_110%,rgba(241,97,54,0.08),transparent_70%)]" />
      <div ref={ref} className="absolute inset-0" />
    </div>
  );
}
