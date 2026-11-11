import { useThreeScene } from "./useThreeScene";
import { simplex3, softPointFrag, EMBER, SKY, PAPER } from "./glsl";

/** Home hero: a breathing, noise-displaced orb with orbiting particle rings. */
export default function HeroOrb({ className = "" }) {
  const ref = useThreeScene(({ THREE, scene, camera, renderer, pointer, mobile }) => {
    camera.position.set(0, 0, mobile ? 8.2 : 6.4);
    const root = new THREE.Group();
    scene.add(root);

    // --- Orb ---
    const orbMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uAmp: { value: 0.32 },
        uA: { value: new THREE.Color(EMBER) },
        uB: { value: new THREE.Color(SKY) },
      },
      vertexShader: /* glsl */ `
        ${simplex3}
        uniform float uTime; uniform float uAmp;
        varying vec3 vN; varying vec3 vV; varying float vNoise;
        void main(){
          float n = snoise(normal * 1.3 + vec3(uTime * 0.22));
          n += 0.5 * snoise(normal * 3.1 - vec3(uTime * 0.31));
          vNoise = n;
          vec3 p = position + normal * n * uAmp;
          vec4 wp = modelMatrix * vec4(p, 1.0);
          vN = normalize(mat3(modelMatrix) * normal);
          vV = normalize(cameraPosition - wp.xyz);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uA; uniform vec3 uB;
        varying vec3 vN; varying vec3 vV; varying float vNoise;
        void main(){
          float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.4);
          vec3 core = vec3(0.035, 0.03, 0.05);
          float veins = smoothstep(0.15, 0.9, vNoise);
          vec3 col = mix(core, uA, veins * 0.9);
          col += uA * pow(veins, 3.0) * 0.8;
          col += uB * f * 1.3;
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.55, mobile ? 48 : 96), orbMat);
    root.add(orb);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.15, 2),
      new THREE.MeshBasicMaterial({ color: PAPER, wireframe: true, transparent: true, opacity: 0.06 })
    );
    root.add(shell);

    // --- Rings of particles ---
    const ringMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
      vertexShader: /* glsl */ `
        attribute vec3 aColor; attribute float aSeed;
        uniform float uTime; uniform float uPR;
        varying vec3 vColor; varying float vAlpha;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (2.0 + aSeed * 5.0) * uPR * 4.0 / -mv.z;
          vColor = aColor;
          vAlpha = 0.4 + 0.6 * sin(uTime * 2.0 + aSeed * 50.0);
        }`,
      fragmentShader: softPointFrag,
    });
    const makeRing = (radius, spread, n, color, tiltX, tiltZ) => {
      const pos = new Float32Array(n * 3);
      const col = new Float32Array(n * 3);
      const seed = new Float32Array(n);
      const c = new THREE.Color(color);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = radius + (Math.random() - 0.5) * spread;
        pos.set([Math.cos(a) * r, (Math.random() - 0.5) * spread * 0.25, Math.sin(a) * r], i * 3);
        col.set([c.r, c.g, c.b], i * 3);
        seed[i] = Math.random();
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
      g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
      const p = new THREE.Points(g, ringMat);
      p.rotation.set(tiltX, 0, tiltZ);
      root.add(p);
      return p;
    };
    const r1 = makeRing(2.7, 0.5, mobile ? 700 : 1400, EMBER, 1.2, 0.25);
    const r2 = makeRing(3.3, 0.9, mobile ? 500 : 1000, SKY, 1.45, -0.4);
    const r3 = makeRing(3.9, 1.6, mobile ? 300 : 600, PAPER, 1.05, 0.6);

    let scrollFade = 0;
    let baseX = 0;
    return {
      update(dt, t) {
        orbMat.uniforms.uTime.value = t;
        ringMat.uniforms.uTime.value = t;
        orbMat.uniforms.uAmp.value = 0.28 + Math.sin(t * 0.6) * 0.06;
        orb.rotation.y += dt * 0.12;
        shell.rotation.y -= dt * 0.05;
        shell.rotation.x += dt * 0.03;
        r1.rotation.y += dt * 0.18;
        r2.rotation.y -= dt * 0.12;
        r3.rotation.y += dt * 0.06;
        root.rotation.y += (pointer.x * 0.5 - root.rotation.y) * 0.05;
        root.rotation.x += (-pointer.y * 0.3 - root.rotation.x) * 0.05;
        const s = Math.min(window.scrollY / window.innerHeight, 1.2);
        scrollFade += (s - scrollFade) * 0.1;
        root.position.set(baseX, -scrollFade * 1.4, -scrollFade * 2.0);
      },
      resize(w) {
        baseX = w > 1024 ? 1.8 : 0;
      },
    };
  });

  return <div ref={ref} aria-hidden className={className} />;
}
