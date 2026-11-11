import { motion } from "framer-motion";
import { Suspense } from "react";
import { Reveal, SplitText, EASE } from "./motion";

export function SectionHeading({ eyebrow, title, lede, align = "center", className = "" }) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} mb-14 max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal y={16}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <h2 className="mt-5 font-display text-4xl font-light text-paper sm:text-5xl md:text-6xl">
        <SplitText text={title} />
      </h2>
      {lede && (
        <Reveal delay={0.15} y={20}>
          <p className={`mt-6 text-base leading-relaxed text-mute sm:text-lg ${center ? "mx-auto" : ""} max-w-2xl`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Full-bleed page opener with a Three.js scene behind the copy. */
export function PageHero({ eyebrow, title, accent, lede, scene, children, className = "min-h-[92svh]", align = "left" }) {
  return (
    <section className={`relative isolate flex items-end overflow-hidden pt-28 pb-16 sm:pb-24 ${className}`}>
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={null}>{scene}</Suspense>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div className={`container-x ${align === "center" ? "text-center" : ""}`}>
        <div className={align === "center" ? "mx-auto max-w-4xl" : "max-w-3xl"}>
          {eyebrow && (
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            >
              {eyebrow}
            </motion.span>
          )}
          <h1 className="mt-6 font-display text-5xl font-light leading-[0.95] text-paper sm:text-7xl lg:text-8xl">
            <SplitText text={title} delay={0.25} />
            {accent && (
              <>
                {" "}
                <SplitText text={accent} delay={0.45} className="text-gradient italic" />
              </>
            )}
          </h1>
          {lede && (
            <motion.p
              className={`mt-8 max-w-xl text-base leading-relaxed text-mute sm:text-lg ${align === "center" ? "mx-auto" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            >
              {lede}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ScrollCue() {
  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-dim sm:flex">
      Scroll
      <span className="relative h-10 w-px overflow-hidden bg-white/10">
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 bg-ember"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </div>
  );
}

export function Marquee({ children, className = "" }) {
  return (
    <div className={`marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] ${className}`}>
      <div className="marquee-track flex w-max gap-6">
        {children}
        {children}
      </div>
    </div>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
