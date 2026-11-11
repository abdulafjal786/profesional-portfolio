import { useThreeScene } from "./useThreeScene";
import { loadTexture } from "./textures";

/**
 * Photos arranged on a slowly turning helix. Scrolling spins it faster,
 * the pointer tilts it, and depth fog fades the far side into the page.
 */
export default function ImageHelix({ images, className = "", fit = false }) {
  const ref = useThreeScene(
    ({ THREE, scene, camera, pointer, mobile }) => {
      camera.position.set(0, 0, mobile ? 11 : 9);
      scene.fog = new THREE.Fog(0x0b0a10, 6, 15);

      const helix = new THREE.Group();
      scene.add(helix);

      const count = Math.max(images.length, 14);
      const perTurn = mobile ? 7 : 9;
      const radius = mobile ? 3.4 : 4.2;
      const rise = 0.42;
      const geo = new THREE.PlaneGeometry(1.9, 1.3, 12, 1);
      // bend each card to follow the cylinder
      const p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i);
        const ang = x / radius;
        p.setX(i, Math.sin(ang) * radius);
        p.setZ(i, Math.cos(ang) * radius - radius);
      }
      geo.computeVertexNormals();

      const cards = [];
      for (let i = 0; i < count; i++) {
        const mat = new THREE.MeshBasicMaterial({
          color: 0x1b1824,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0,
        });
        const m = new THREE.Mesh(geo, mat);
        const a = (i / perTurn) * Math.PI * 2;
        m.position.set(Math.sin(a) * radius, (i - count / 2) * rise, Math.cos(a) * radius);
        m.rotation.y = a;
        helix.add(m);
        cards.push(m);
        loadTexture(images[i % images.length], { max: 512, aspect: 1.9 / 1.3 })
          .then((tex) => {
            mat.map = tex;
            mat.color.set(0xffffff);
            mat.needsUpdate = true;
          })
          .catch(() => {});
      }

      let spin = 0;
      let lastScroll = window.scrollY;
      let velocity = 0;
      return {
        update(dt, t) {
          const sy = window.scrollY;
          velocity += (sy - lastScroll) * 0.0009;
          lastScroll = sy;
          velocity *= 0.92;
          spin += dt * 0.12 + velocity;
          helix.rotation.y = spin;
          helix.position.y = Math.sin(t * 0.3) * 0.15;
          helix.rotation.x = 0.12 + pointer.y * 0.12;
          helix.rotation.z = -0.1 + pointer.x * 0.06;
          cards.forEach((c, i) => {
            c.material.opacity = Math.min(1, c.material.opacity + dt * 0.8 * (c.material.map ? 1 : 0.2));
            if (dt === 0) c.material.opacity = 1;
            c.position.y += Math.sin(t * 0.8 + i) * 0.0008;
          });
        },
        resize(w, h) {
          // `fit`: shrink the helix so it stays whole inside a narrow canvas (desktop side panel)
          const s = fit && w >= 640 ? Math.min(1, Math.max(0.5, w / h / 1.1)) : 1;
          helix.scale.setScalar(s);
        },
      };
    },
    [images, fit]
  );

  return <div ref={ref} aria-hidden className={className} />;
}
