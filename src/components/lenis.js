import Lenis from "@studio-freight/lenis";

let lenis;

export const initLenis = () => {
  if (lenis || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
};

export const stopLenis = () => lenis?.stop();
export const startLenis = () => lenis?.start();

export const scrollToTop = (immediate = false) => {
  if (lenis) lenis.scrollTo(0, { duration: 0.8, immediate });
  else window.scrollTo(0, 0);
};
