import * as THREE from "three";

/**
 * Loads an image and downsamples it onto a canvas so large DSLR photos
 * don't blow up GPU memory. Optionally center-crops to an aspect ratio.
 */
export function loadTexture(url, { max = 512, aspect } = {}) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (aspect) {
        const src = sw / sh;
        if (src > aspect) { const nw = sh * aspect; sx = (sw - nw) / 2; sw = nw; }
        else { const nh = sw / aspect; sy = (sh - nh) / 2; sh = nh; }
      }
      const scale = Math.min(1, max / Math.max(sw, sh));
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(sw * scale));
      c.height = Math.max(1, Math.round(sh * scale));
      c.getContext("2d").drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      resolve(tex);
    };
    img.onerror = reject;
    img.src = url;
  });
}
