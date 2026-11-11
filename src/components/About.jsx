import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import directorImage from "../assets/poster.jpg";
import speakingImage from "../assets/speaking.jpg";
import teachingImage from "../assets/a10.jpeg";
import entrepreneurImage from "../assets/a24.jpeg";
import acting from "../assets/acting_guru.jpeg";
import h1 from "../assets/Dream & Passion- Selected Pics/dream_banner.jpeg";
import h2 from "../assets/RMS- Conference/a1.jpeg";
import h3 from "../assets/first_session/1.jpg";
import h4 from "../assets/Body Mind Soul Workshop/7.jpg";
import h5 from "../assets/Speak To Change Mentoring Session/1.jpg";
import h6 from "../assets/54th Public Speaking Event/1.jpg";
import { Reveal, Stagger, StaggerItem, Counter, TiltCard, ScrollWords, ParallaxImage, Magnetic, SplitText, EASE } from "./ui/motion";
import { SectionHeading, ScrollCue, ArrowIcon } from "./ui/Section";

const ImageHelix = lazy(() => import("../three/ImageHelix"));
const HELIX = [speakingImage, h1, directorImage, h2, teachingImage, h3, acting, h4, entrepreneurImage, h5, h6];

const ROLES = ["Author", "Actor", "Director", "Speaker", "Mentor", "Entrepreneur"];

const CHAPTERS = [
  {
    key: "visionary",
    no: "01",
    title: "The Creative Visionary",
    image: directorImage,
    body: "As a director, Arun brings psychological depth and emotional authenticity to his projects. His films and theatrical productions are celebrated for their compelling narratives and character-driven storytelling that leaves a lasting impact.",
    stats: [
      ["20+", "Directorial Projects"],
      ["15+", "Years in Industry"],
    ],
  },
  {
    key: "speaker",
    no: "02",
    title: "The Motivational Speaker",
    image: speakingImage,
    body: "With his signature style that blends storytelling, humor, and hard-hitting truths, Arun has graced stages across India and internationally. His talks on personal mastery, professional excellence, and purposeful living have transformed corporate cultures and individual lives.",
    stats: [
      ["50+", "Motivational Sessions"],
      ["10+", "Companies Transformed"],
    ],
  },
  {
    key: "guru",
    no: "03",
    title: "The Acting Guru",
    image: acting,
    sub: "Truth-Based Acting Methodology",
    body: "Having developed his own unique approach, Arun has mentored some of the most promising talents in the industry. His acting workshops are known for their intensity and life-changing impact that goes beyond just performance techniques.",
    list: ["1000+ Acting Students Trained", "Personalized Coaching Approach", "Industry-Proven Techniques"],
  },
  {
    key: "entrepreneur",
    no: "04",
    title: "The Entrepreneur",
    image: entrepreneurImage,
    body: "Beyond the stage and screen, Arun has successfully launched several ventures that bridge the gap between personal development and entertainment, proving that creativity and commerce can beautifully coexist.",
    stats: [
      ["25+", "Successful Ventures"],
      ["15+", "Team Members"],
      ["15+", "Years Experience"],
    ],
  },
];

const PHILOSOPHY = [
  ["01", "Authenticity", "True success comes from being fully aligned with one's authentic self, not from mimicking others' paths."],
  ["02", "Integration", "Personal and professional growth require the harmonious development of mind, body, and spirit."],
  ["03", "Purpose", "Lasting achievement springs from work that serves something greater than oneself."],
];

const ENTERPRISES = [
  ["Humhai Theatres", "Cutting-edge actor training institute with 5 centers nationwide"],
  ["MindStage Productions", "Content creation house specializing in transformational media"],
  ["Arun Prabhu Academy", "Offline learning platform with 50+ courses on acting"],
];

const BUSINESS = [
  ["Value Creation", "Business must create more than financial returns - it should create meaning, growth, and transformation."],
  ["Community Focus", "The most sustainable businesses are those that build and serve communities."],
  ["Creative Innovation", "The intersection of art and commerce is where true innovation happens."],
  ["Ethical Foundations", "Profit must never come at the cost of purpose or principles."],
];

const FRAMEWORK = [
  ["Emotional Archaeology", "Unearthing authentic emotional responses"],
  ["Psychological Gesture", "Physical embodiment of character essence"],
  ["Present Moment Awareness", "Heightened performance reality"],
];

function RoleTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.15em] min-w-[6ch] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROLES[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-gradient italic"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="absolute inset-0 -z-10 lg:left-auto lg:w-[52%] lg:[mask-image:linear-gradient(to_right,transparent,black_18%)]">
        <Suspense fallback={null}>
          <ImageHelix images={HELIX} fit className="h-full w-full opacity-40 sm:opacity-70 lg:opacity-100" />
        </Suspense>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent lg:hidden" />
      {/* <HeroOrb/> */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div className="container-x">
        <div className="max-w-2xl">
          <motion.span className="eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            The Multifaceted Personality
          </motion.span>
          <h1 className="mt-6 font-display text-6xl font-light leading-[0.9] text-paper sm:text-8xl lg:text-[8.5rem]">
            <SplitText text="Arun" delay={0.1} />
            <br />
            <SplitText text="Prabhu" delay={0.2} className="italic" />
          </h1>
          <motion.p
            className="mt-6 font-display text-2xl font-light text-paper/90 sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          >
            <RoleTicker />
          </motion.p>
          <motion.p
            className="mt-6 max-w-lg text-base leading-relaxed text-mute sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
          >
            Author, filmmaker, theatre artist, motivational speaker and life coach — at the intersection of art, motivation, and business.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
          >
            <Magnetic>
              <Link to="/about" className="btn-primary">
                Discover the journey <ArrowIcon />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/sessions" className="btn-ghost">
                View sessions
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>
      
      <ScrollCue />
    </section>
  );
}

function Chapters() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Four stages, one voice" title="Many roles. One purpose." align="left" />
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Sticky image stage (desktop) */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28 h-[72vh] overflow-hidden rounded-[2rem] border border-line">
              <AnimatePresence initial={false}>
                <motion.img
                  key={CHAPTERS[active].key}
                  src={CHAPTERS[active].image}
                  alt={CHAPTERS[active].title}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }}
                  animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.3 } }}
                  transition={{ duration: 1, ease: EASE }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <span className="font-display text-7xl font-light italic text-paper/90">{CHAPTERS[active].no}</span>
                <div className="flex gap-2">
                  {CHAPTERS.map((c, i) => (
                    <span key={c.key} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-ember" : "w-4 bg-white/30"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling text */}
          <div>
            {CHAPTERS.map((c, i) => (
              <motion.article
                key={c.key}
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.6 }}
                className="flex min-h-[auto] flex-col justify-center py-10 lg:min-h-[80vh]"
              >
                <div className="mb-8 aspect-[4/3] overflow-hidden rounded-3xl border border-line lg:hidden">
                  <ParallaxImage src={c.image} alt={c.title} className="h-full" />
                </div>
                <Reveal y={20}>
                  <span className="font-sans text-sm text-ember">— {c.no}</span>
                </Reveal>
                <h3 className="mt-4 font-display text-4xl font-light text-paper sm:text-5xl">
                  <SplitText text={c.title} />
                </h3>
                {c.sub && (
                  <Reveal delay={0.1}>
                    <p className="mt-4 text-lg text-sky">{c.sub}</p>
                  </Reveal>
                )}
                <Reveal delay={0.15}>
                  <p className="mt-6 text-lg leading-relaxed text-mute">{c.body}</p>
                </Reveal>
                {c.stats && (
                  <Stagger className={`mt-10 grid gap-4 ${c.stats.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                    {c.stats.map(([v, l]) => (
                      <StaggerItem key={l} className="glass rounded-2xl p-5">
                        <Counter value={v} className="font-display text-4xl text-paper sm:text-5xl" />
                        <p className="mt-2 text-xs uppercase tracking-wider text-mute">{l}</p>
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}
                {c.list && (
                  <Stagger as="ul" className="mt-8 space-y-3">
                    {c.list.map((l) => (
                      <StaggerItem as="li" key={l} className="flex items-center gap-4 border-b border-line pb-3 text-paper/90">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ember/15 text-xs text-ember">✓</span>
                        {l}
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const About = () => {
  return (
    <div>
      <Hero />

      {/* Intro statement */}
      <section className="py-24 sm:py-36">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">Who is Arun Prabhu</span>
          </Reveal>
          <ScrollWords
            className="mt-8 max-w-5xl font-display text-3xl font-light leading-[1.2] text-paper sm:text-5xl lg:text-6xl"
            text="Arun Prabhu stands at the intersection of art, motivation, and business — a rare combination that makes him one of the most sought-after personalities in the personal development and entertainment industry."
          />
        </div>
      </section>

      <Chapters />

      {/* Mentor's methodology */}
      <section className="relative py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Pedagogy"
            title="The Mentor's Methodology"
            lede="Arun Prabhu's teaching philosophy transcends conventional acting techniques, creating artists who bring authentic humanity to their craft."
          />
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <Reveal x={-40} y={0}>
              <TiltCard max={6} className="overflow-hidden rounded-[2rem] border border-line">
                <ParallaxImage src={teachingImage} alt="Acting workshop" className="aspect-[4/3]" />
              </TiltCard>
            </Reveal>
            <div>
              <Reveal>
                <h3 className="font-display text-3xl font-light text-paper sm:text-4xl">The Prabhu Acting Framework</h3>
                <p className="mt-5 text-lg leading-relaxed text-mute">
                  A revolutionary approach that combines Stanislavski&rsquo;s system with contemporary neuroscience and Eastern philosophy, creating performers of
                  extraordinary depth and versatility.
                </p>
              </Reveal>
              <Stagger className="mt-10 space-y-4">
                {FRAMEWORK.map(([t, d], i) => (
                  <StaggerItem
                    key={t}
                    className="group flex gap-5 rounded-2xl border border-line p-5 transition-colors duration-500 hover:border-ember/50 hover:bg-ember/5"
                  >
                    <span className="font-display text-2xl italic text-ember">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h4 className="font-sans text-base font-semibold text-paper">{t}</h4>
                      <p className="mt-1 text-sm text-mute">{d}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ink-2/80 to-transparent" />
        <div className="container-x">
          <SectionHeading eyebrow="Core principles" title="The Prabhu Philosophy" lede="The core principles that guide all of Arun Prabhu's work across disciplines." />
          <Stagger className="grid gap-6 md:grid-cols-3">
            {PHILOSOPHY.map(([n, t, d]) => (
              <StaggerItem key={n}>
                <TiltCard className="glass h-full rounded-3xl p-8">
                  <span className="font-display text-7xl font-light italic text-ember/90">{n}</span>
                  <h3 className="mt-8 font-display text-3xl text-paper">{t}</h3>
                  <p className="mt-4 leading-relaxed text-mute">{d}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Business visionary */}
      <section className="relative py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Enterprise"
            title="The Business Visionary"
            lede="Arun Prabhu's entrepreneurial ventures demonstrate how creativity and commerce can synergize to create impactful, sustainable businesses in the arts and personal development space."
          />
          <Reveal>
            <h3 className="mb-6 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-dim">Creative Enterprises</h3>
          </Reveal>
          <Stagger className="border-t border-line">
            {ENTERPRISES.map(([name, desc], i) => (
              <StaggerItem
                key={name}
                className="group relative grid grid-cols-[auto_1fr] items-baseline gap-6 overflow-hidden border-b border-line py-8 sm:grid-cols-[80px_1fr_1fr]"
              >
                <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-ember/15 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100" />
                <span className="font-sans text-sm text-dim">0{i + 1}</span>
                <h4 className="font-display text-3xl font-light text-paper transition-transform duration-500 group-hover:translate-x-3 sm:text-5xl">{name}</h4>
                <p className="col-span-2 text-mute sm:col-span-1 sm:text-right">{desc}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-20">
            <div className="glass grain relative overflow-hidden rounded-[2rem] p-8 sm:p-14">
              <h3 className="font-display text-3xl font-light text-paper sm:text-4xl">The Prabhu Business Philosophy</h3>
              <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
                {BUSINESS.map(([t, q]) => (
                  <div key={t}>
                    <h4 className="flex items-center gap-3 font-sans text-sm font-semibold uppercase tracking-wider text-ember">
                      <span className="h-px w-6 bg-ember" />
                      {t}
                    </h4>
                    <p className="mt-3 font-display text-xl font-light italic leading-snug text-paper/90">&ldquo;{q}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default About;
