import { useThreeScene } from "./useThreeScene";
import { softPointFrag, EMBER, SKY, PAPER } from "./glsl";

const HOME = { lat: 28.46, lon: 77.03 }; // Gurugram
const REACH = [
  { lat: 19.08, lon: 72.88 }, // Mumbai
  { lat: 12.97, lon: 77.59 }, // Bengaluru
  { lat: 22.57, lon: 88.36 }, // Kolkata
  { lat: 13.08, lon: 80.27 }, // Chennai
  { lat: 25.2, lon: 55.27 }, // Dubai
  { lat: 51.5, lon: -0.12 }, // London
  { lat: 40.71, lon: -74.0 }, // New York
  { lat: 1.35, lon: 103.82 }, // Singapore
  { lat: -33.86, lon: 151.2 }, // Sydney
  { lat: 26.85, lon: 80.95 }, // Lucknow
];

/** A dotted globe with pulses travelling out from Gurugram. */
export default function SignalGlobe({ className = "" }) {
  const ref = useThreeScene(({ THREE, scene, camera, renderer, pointer, mobile }) => {
    camera.position.set(0, 0, mobile ? 7.5 : 6.2);
    const R = 2;
    const globe = new THREE.Group();
    scene.add(globe);

    const toVec = ({ lat, lon }, r = R) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lon + 180) * Math.PI) / 180;
      return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
    };

    // Fibonacci sphere of dots
    const N = mobile ? 1800 : 3200;
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), seed = new Float32Array(N);
    const paper = new THREE.Color(PAPER), sky = new THREE.Color(SKY);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      pos.set([Math.cos(th) * r * R, y * R, Math.sin(th) * r * R], i * 3);
      const c = Math.random() < 0.12 ? sky : paper;
      col.set([c.r, c.g, c.b], i * 3);
      seed[i] = Math.random();
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    dotGeo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    dotGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const dotMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
      vertexShader: /* glsl */ `
        attribute vec3 aColor; attribute float aSeed;
        uniform float uTime; uniform float uPR;
        varying vec3 vColor; varying float vAlpha;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vec3 n = normalize(mat3(modelViewMatrix) * position);
          float facing = smoothstep(-0.2, 0.6, n.z);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = 18.0 * uPR / -mv.z;
          vColor = aColor;
          vAlpha = (0.12 + 0.55 * facing) * (0.7 + 0.3 * sin(uTime * 2.0 + aSeed * 30.0));
        }`,
      fragmentShader: softPointFrag,
    });
    globe.add(new THREE.Points(dotGeo, dotMat));

    // Dark core so back-side dots are occluded softly
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 48, 48), new THREE.MeshBasicMaterial({ color: 0x0b0a10, transparent: true, opacity: 0.85 })));

    // Thin fresnel rim (transparent in the middle, glowing at the limb)
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.03, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uC: { value: new THREE.Color(SKY) } },
        vertexShader: /* glsl */ `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: /* glsl */ `uniform vec3 uC; varying vec3 vN; void main(){ float i = pow(1.0 - abs(vN.z), 4.0); gl_FragColor = vec4(uC, i * 0.55); }`,
      })
    );
    scene.add(atmo);

    // Arcs with a travelling pulse
    const arcMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uC: { value: new THREE.Color(EMBER) } },
      vertexShader: /* glsl */ `
        attribute float aT; attribute float aOff; varying float vT; varying float vOff;
        void main(){ vT = aT; vOff = aOff; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform float uTime; uniform vec3 uC; varying float vT; varying float vOff;
        void main(){
          float head = fract(uTime * 0.28 + vOff);
          float tail = smoothstep(head - 0.28, head, vT) * step(vT, head);
          float base = 0.12;
          gl_FragColor = vec4(uC, base + tail * 0.95);
        }`,
    });
    const home = toVec(HOME);
    REACH.forEach((p, k) => {
      const end = toVec(p);
      const mid = home.clone().add(end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(R + home.distanceTo(end) * 0.45);
      const curve = new THREE.QuadraticBezierCurve3(home, mid, end);
      const pts = curve.getPoints(80);
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      g.setAttribute("aT", new THREE.Float32BufferAttribute(pts.map((_, i) => i / 80), 1));
      g.setAttribute("aOff", new THREE.Float32BufferAttribute(pts.map(() => k * 0.137), 1));
      globe.add(new THREE.Line(g, arcMat));
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), new THREE.MeshBasicMaterial({ color: SKY }));
      dot.position.copy(end);
      globe.add(dot);
    });
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), new THREE.MeshBasicMaterial({ color: EMBER }));
    beacon.position.copy(home);
    globe.add(beacon);
    const pulse = new THREE.Mesh(
      new THREE.RingGeometry(0.06, 0.09, 32),
      new THREE.MeshBasicMaterial({ color: EMBER, transparent: true, side: THREE.DoubleSide })
    );
    pulse.position.copy(home.clone().multiplyScalar(1.002));
    pulse.lookAt(home.clone().multiplyScalar(2));
    globe.add(pulse);

    // Face India toward the camera initially
    const baseY = -Math.atan2(home.x, home.z);
    globe.rotation.set(0.35, baseY, 0);
    let spin = 0;

    return {
      update(dt, t) {
        dotMat.uniforms.uTime.value = t;
        arcMat.uniforms.uTime.value = t;
        spin += dt * 0.05;
        globe.rotation.y = baseY + Math.sin(spin) * 0.9 + pointer.x * 0.3;
        globe.rotation.x = 0.35 - pointer.y * 0.2;
        const k = (t * 0.8) % 1;
        pulse.scale.setScalar(1 + k * 3);
        pulse.material.opacity = 1 - k;
      },
    };
  });

  return <div ref={ref} aria-hidden className={className} />;
}
