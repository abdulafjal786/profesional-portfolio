import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll, animate } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

/** Fade/slide children in when they enter the viewport. */
export function Reveal({ children, delay = 0, y = 40, x = 0, className = "", as = "div", once = true }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Stagger container + item for lists and grids. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
export const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
export function Stagger({ children, className = "", as = "div" }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {children}
    </Comp>
  );
}
export function StaggerItem({ children, className = "", as = "div", ...rest }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp className={className} variants={item} {...rest}>
      {children}
    </Comp>
  );
}

/** Splits a heading into words that rise into place. */
export function SplitText({ text, className = "", delay = 0, as = "span" }) {
  const Comp = motion[as] ?? motion.span;
  const words = text.split(" ");
  return (
    <Comp className={className} initial="hidden" whileInView="show" viewport={{ once: true }} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/** Counts up to the numeric part of `value` ("10K+", "15+") when in view. */
export function Counter({ value, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);
  useEffect(() => {
    if (!inView || !match) return;
    const target = parseFloat(match[2]);
    const controls = animate(0, target, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setDisplay(`${match[1]}${Math.round(v)}${match[3]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/** Card that tilts in 3D toward the pointer, with a moving glare. */
export function TiltCard({ children, className = "", max = 10 }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(400px circle at ${x} ${y}, rgba(255,255,255,0.12), transparent 45%)`);

  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glare }} />
    </motion.div>
  );
}

/** Paragraph whose words light up as it scrolls through the viewport. */
export function ScrollWords({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={`relative ${className}`}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}
function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

/** Image that drifts within its frame as the page scrolls. */
export function ParallaxImage({ src, alt, className = "", imgClassName = "", amount = 12 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1 + amount / 50 }}
        loading="lazy"
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

/** Button/link wrapper that drifts toward the pointer. */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 250, damping: 18 });
  const y = useSpring(0, { stiffness: 250, damping: 18 });
  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType === "touch") return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
