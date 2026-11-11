import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaMicrophone, FaTheaterMasks, FaFilm, FaChalkboardTeacher, FaStar } from "react-icons/fa";
import { SectionHeading } from "./ui/Section";
import { Reveal, EASE } from "./ui/motion";

const categories = [
  {
    title: "Motivational Speaker",
    Icon: FaMicrophone,
    description: "Renowned for impactful speeches that transform lives and inspire action at prestigious platforms worldwide.",
    items: ["RMS Global Conference Keynote", "RBSM Leadership Summit", "Dream & Passion International Forum", "Youth Empowerment Symposium", "Corporate Mindset Workshops"],
  },
  {
    title: "Actor",
    Icon: FaTheaterMasks,
    description: "Compelling performances that bring characters to life across diverse genres and formats.",
    items: ["1943: A Lota Story (Lead Role)", "Wazir (Supporting Role)", "Drishti Kaun? (Protagonist)", "Phamily Byness (Ensemble Cast)", "Oh Fish Office (Comedic Lead)"],
  },
  {
    title: "Director",
    Icon: FaFilm,
    description: "Visionary storytelling through innovative direction and cinematic techniques.",
    items: ["Drishti Kaun? (Award-winning Short)", "Wazir (Thriller Show)", "Phamily Byness (Comedy Show)", "Oh Fish Office (Corporate Satire)", "5 Untitled Projects (In Development)"],
  },
  {
    title: "Educator",
    Icon: FaChalkboardTeacher,
    description: "Mentoring the next generation of performers through comprehensive theater education.",
    items: ["Weekend Theater Workshops", "Acting Masterclasses", "Corporate Presentation Training", "1-on-1 Coaching Sessions", "Annual Student Showcases"],
  },
  {
    title: "Humanitarian",
    Icon: FaStar,
    description: "Committed to social causes through artistic expression and community engagement.",
    items: ["Founder - Akanksha Aradhya Foundation", "Arts Education for Underprivileged", "Mental Health Awareness Programs", "Women Empowerment Initiatives", "Cultural Preservation Projects"],
  },
];

/** Accordion of expanding panels on desktop; stacked tabs on mobile. */
const Home_What_We_Do = () => {
  const [active, setActive] = useState(0);
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="What he does" title="A Renaissance Artist" lede="Bridging Performance, Direction, Education & Social Impact" />

        <Reveal>
          <div className="flex flex-col gap-3 lg:h-[560px] lg:flex-row">
            {categories.map((c, i) => {
              const open = i === active;
              return (
                <motion.div
                  key={c.title}
                  layout
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`group relative cursor-pointer overflow-hidden rounded-3xl border transition-colors duration-500 ${
                    open ? "border-ember/40 bg-gradient-to-br from-ember/15 via-ink-3 to-ink-2 lg:flex-[4]" : "border-line bg-ink-2/60 hover:border-white/20 lg:flex-1"
                  }`}
                  tabIndex={0}
                  role="button"
                  aria-expanded={open}
                >
                  <div className="flex h-full flex-col p-6 sm:p-8">
                    <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                      <span
                        className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-xl transition-colors duration-500 ${
                          open ? "bg-ember text-white" : "bg-white/5 text-paper/70"
                        }`}
                      >
                        <c.Icon />
                      </span>
                      <h3
                        className={`font-display text-2xl font-light text-paper transition-all duration-500 sm:text-3xl ${
                          open ? "" : "lg:mt-auto lg:[writing-mode:vertical-rl] lg:rotate-180"
                        }`}
                      >
                        {c.title}
                      </h3>
                    </div>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.6, ease: EASE } }}
                          exit={{ opacity: 0, transition: { duration: 0.15 } }}
                          className="mt-6 lg:mt-auto"
                        >
                          <p className="max-w-md text-mute">{c.description}</p>
                          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                            {c.items.map((it) => (
                              <li key={it} className="flex items-start gap-2 text-sm text-paper/85">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                                {it}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Home_What_We_Do;
