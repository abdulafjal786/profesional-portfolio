import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useThreeScene } from "../three/useThreeScene";
import { softPointFrag, EMBER, SKY, PAPER } from "../three/glsl";

const roles = ["Author", "Actor", "Director", "Motivational Speaker"];

function Vortex() {
  const ref = useThreeScene(({ THREE, scene, camera, renderer, mobile }) => {
    camera.position.z = 7;
    const n = mobile ? 2500 : 5000;
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), seed = new Float32Array(n);
    const pal = [EMBER, SKY, PAPER].map((c) => new THREE.Color(c));
    for (let i = 0; i < n; i++) {
      seed[i] = Math.random();
      const c = pal[i % 3];
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
      vertexShader: /* glsl */ `
        attribute vec3 aColor; attribute float aSeed;
        uniform float uTime; uniform float uPR;
        varying vec3 vColor; varying float vAlpha;
        void main(){
          float k = clamp(uTime / 2.2, 0.0, 1.0);
          k = 1.0 - pow(1.0 - k, 3.0);
          float a = aSeed * 6.2831 * 9.0 + uTime * (0.6 + aSeed * 0.8);
          float r = mix(7.0 + aSeed * 6.0, 2.4 + sin(aSeed * 80.0) * 0.08, k);
          float y = mix((aSeed - 0.5) * 10.0, sin(a * 3.0 + uTime) * 0.04, k);
          vec3 p = vec3(cos(a) * r, y, sin(a) * r);
          p.yz = mat2(cos(1.15), -sin(1.15), sin(1.15), cos(1.15)) * p.yz;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.5 + fract(aSeed * 13.0) * 3.0) * uPR * 5.0 / -mv.z;
          vColor = aColor;
          vAlpha = 0.25 + 0.75 * k;
        }`,
      fragmentShader: softPointFrag,
    });
    scene.add(new THREE.Points(g, mat));
    return {
      update(dt, t) {
        mat.uniforms.uTime.value = t;
      },
    };
  });
  return <div ref={ref} className="absolute inset-0" aria-hidden />;
}

const Loader = () => {
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveRole((p) => (p + 1) % roles.length), 650);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-ink"
      role="status"
      aria-label="Loading"
    >
      <Vortex />
      <div className="relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.8em" }}
          animate={{ opacity: 0.7, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-[11px] font-semibold uppercase text-mute"
        >
          Creative Visionary &amp; Thought Leader
        </motion.p>
        <h1 className="overflow-hidden font-display text-5xl font-light text-paper sm:text-7xl">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Arun <em className="text-gradient font-normal">Prabhu</em>
          </motion.span>
        </h1>
        <div className="relative mt-6 h-8 overflow-hidden">
          {roles.map((role, i) => (
            <motion.span
              key={role}
              className="absolute inset-x-0 text-lg text-sky"
              initial={false}
              animate={{ y: activeRole === i ? 0 : activeRole > i ? -32 : 32, opacity: activeRole === i ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {role}
            </motion.span>
          ))}
        </div>
        <div className="mx-auto mt-8 h-px w-56 overflow-hidden bg-white/10">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-ember to-sky"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
