import { useThreeScene } from "./useThreeScene";

/** Full-bleed shader: a flickering projector cone with drifting dust and film grain. */
export default function ProjectorBeam({ className = "" }) {
  const ref = useThreeScene(({ THREE, scene, renderer, pointer }) => {
    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2() },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      depthTest: false,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse;
        varying vec2 vUv;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p){
          vec2 i = floor(p), f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1,0)), u.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
        }
        void main(){
          float aspect = uRes.x / uRes.y;
          vec2 uv = vUv;
          vec2 src = vec2(0.5 + uMouse.x * 0.06, 1.18);
          vec2 d = uv - src; d.x *= aspect;
          float ang = atan(d.x, -d.y);
          float dist = length(d);
          float cone = smoothstep(0.5, 0.0, abs(ang));
          float rays = noise(vec2(ang * 16.0, uTime * 0.25)) * 0.55 + noise(vec2(ang * 42.0, -uTime * 0.18)) * 0.45;
          float beam = cone * (0.3 + 0.7 * rays) * smoothstep(1.9, 0.15, dist);
          float flicker = 0.9 + 0.1 * noise(vec2(uTime * 9.0, 1.7));

          // dust motes
          vec2 g = uv * vec2(aspect, 1.0) * 55.0 + vec2(uTime * 0.4, uTime * 0.9);
          vec2 id = floor(g); vec2 f = fract(g) - 0.5;
          float h = hash(id);
          vec2 o = vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5;
          float dust = step(0.975, h) * smoothstep(0.14, 0.0, length(f - o * 0.6));

          vec3 warm = vec3(1.0, 0.78, 0.58);
          vec3 col = vec3(0.043, 0.039, 0.063);
          col += warm * beam * flicker * 0.85;
          col += vec3(1.0, 0.92, 0.85) * dust * (0.2 + beam * 3.0);
          col += vec3(0.95, 0.38, 0.21) * smoothstep(1.2, 0.0, length((uv - vec2(0.5, 1.05)) * vec2(aspect, 3.0))) * 0.25;
          col += (hash(uv * uRes + fract(uTime * 7.0) * 91.0) - 0.5) * 0.05;
          // fade bottom into the page background
          col = mix(vec3(0.043, 0.039, 0.063), col, smoothstep(0.0, 0.35, uv.y));
          // gate-weave vignette
          col *= smoothstep(1.25, 0.35, length((uv - 0.5) * vec2(aspect * 0.7, 1.0)));
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    quad.frustumCulled = false;
    scene.add(quad);

    return {
      update(dt, t) {
        uniforms.uTime.value = t;
        uniforms.uMouse.value.set(pointer.x, pointer.y);
      },
      resize(w, h) {
        const pr = renderer.getPixelRatio();
        uniforms.uRes.value.set(w * pr, h * pr);
      },
    };
  });

  return <div ref={ref} aria-hidden className={className} />;
}
