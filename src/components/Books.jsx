import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAmazon, FaRegClock } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import count from "../assets/book/count.jpg";
import ak from "../assets/book/ak.png";
import niharika from "../assets/book/niharika.png";
import create from "../assets/book/create.jpg";
import chemistry from "../assets/book/chemistry.jpg";
import { SectionHeading } from "./ui/Section";
import { Reveal, Stagger, StaggerItem, TiltCard, SplitText, EASE } from "./ui/motion";

const BookCarousel3D = lazy(() => import("../three/BookCarousel3D"));

// Defined at module scope so the 3D scene isn't rebuilt on every render.
const books = [
  {
    title: "Niharika I Want to Live Again",
    status: "buy now",
    cover: niharika,
    description: "A powerful story of rebirth and second chances that will move your soul.",
    amazonLink:
      "https://www.amazon.in/Niharika-again-count-chicken-before-ebook/dp/B01NAOT48H/ref=sr_1_2?ie=UTF8&qid=1551379362&sr=8-2&keywords=count+your+chicken+before+you+lay+them",
  },
  {
    title: "Count Your Chickens Before You Lay Them",
    status: "buy now",
    cover: count,
    description: "Unconventional wisdom for achieving success in business and life.",
    amazonLink:
      "https://www.amazon.in/COUNT-YOUR-CHICKEN-BEFORE-THEM-ebook/dp/B00AXGX08U/ref=sr_1_1?ie=UTF8&qid=1551379362&sr=8-1&keywords=count+your+chicken+before+you+lay+them",
  },
  {
    title: "The Chemistry of Diseases",
    status: "coming soon",
    cover: chemistry,
    description: "Explore the biochemical foundations of diseases and their impact on human health.",
  },
  {
    title: "Create Your Universe",
    status: "coming soon",
    cover: create,
    description: "A guide to manifesting your reality through conscious creation and mindset shifts.",
  },
  {
    title: "Akanksha Ek Mahatvakanksha",
    status: "coming soon",
    cover: ak,
    description: "An inspirational journey of aspirations and their transformational power.",
  },
];

function BookCTA({ book }) {
  return book.status === "coming soon" ? (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-mute">
      <FaRegClock /> Coming Soon
    </span>
  ) : (
    <a href={book.amazonLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
      <FaAmazon /> Buy on Amazon
    </a>
  );
}

const Books = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const book = books[index];
  const go = (d) => {
    setPaused(true);
    setIndex((i) => (i + d + books.length) % books.length);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % books.length), 4500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div>
      <section className="relative isolate overflow-hidden pt-28">
        <div className="container-x">
          <div className="max-w-3xl">
            <motion.span className="eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE }}>
              The Library
            </motion.span>
            <h1 className="mt-6 font-display text-5xl font-light leading-[0.95] text-paper sm:text-7xl">
              <SplitText text="Arun Prabhu's" delay={0.1} /> <SplitText text="Books" delay={0.25} className="text-gradient italic" />
            </h1>
            <motion.p
              className="mt-6 max-w-xl text-lg text-mute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Explore the literary works of Arun Prabhu - transformative books that inspire, educate, and empower.
            </motion.p>
          </div>
        </div>

        <div className="relative mt-4 grid items-center lg:grid-cols-[1.4fr_1fr]" onPointerDown={() => setPaused(true)}>
          <div className="relative h-[52vh] min-h-[380px] lg:h-[68vh]">
            <Suspense fallback={null}>
              <BookCarousel3D books={books} index={index} onChange={setIndex} className="h-full w-full" />
            </Suspense>
            <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-dim">
              Drag to browse
            </p>
          </div>

          <div className="container-x pb-16 lg:pb-0 lg:pl-0">
            <div className="glass relative min-h-[300px] overflow-hidden rounded-[2rem] p-8 sm:p-10" aria-live="polite">
              <div className="flex items-center justify-between text-xs text-dim">
                <span>
                  <span className="text-paper">{String(index + 1).padStart(2, "0")}</span> / {String(books.length).padStart(2, "0")}
                </span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => go(-1)} aria-label="Previous book" className="grid h-10 w-10 place-items-center rounded-full border border-line text-paper hover:border-ember hover:text-ember">
                    <ChevronLeft size={18} />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label="Next book" className="grid h-10 w-10 place-items-center rounded-full border border-line text-paper hover:border-ember hover:text-ember">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mt-8"
                >
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${book.status === "coming soon" ? "text-sky" : "text-ember"}`}>
                    {book.status === "coming soon" ? "Forthcoming" : "Available now"}
                  </span>
                  <h2 className="mt-3 font-display text-3xl font-light text-paper sm:text-4xl">{book.title}</h2>
                  <p className="mt-4 text-mute">{book.description}</p>
                  <div className="mt-8">
                    <BookCTA book={book} />
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 flex">
                {books.map((b, i) => (
                  <button
                    key={b.title}
                    type="button"
                    aria-label={`Show ${b.title}`}
                    onClick={() => {
                      setPaused(true);
                      setIndex(i);
                    }}
                    className="h-1 flex-1 bg-white/5"
                  >
                    <span className={`block h-full transition-all duration-500 ${i === index ? "bg-ember" : "bg-transparent"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="All titles" title="The complete shelf" />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {books.map((b) => (
              <StaggerItem key={b.title}>
                <TiltCard max={12} className="group h-full rounded-3xl">
                  <div className="glass flex h-full flex-col rounded-3xl p-5">
                    <div className="relative grid aspect-[3/4] place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent p-4">
                      <img
                        src={b.cover}
                        alt={b.title}
                        loading="lazy"
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                        className="max-h-full w-auto object-contain shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-5 font-display text-xl text-paper">{b.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-mute">{b.description}</p>
                    <div className="mt-5">
                      {b.status === "coming soon" ? (
                        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-sky">
                          <FaRegClock /> Coming Soon
                        </span>
                      ) : (
                        <a
                          href={b.amazonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-ember hover:text-ember-2"
                        >
                          <FaAmazon /> Buy on Amazon →
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mx-auto mt-28 max-w-4xl">
            <figure className="relative text-center">
              <span aria-hidden className="absolute -top-16 left-1/2 -translate-x-1/2 font-display text-[10rem] leading-none text-ember/20">
                &ldquo;
              </span>
              <blockquote className="relative font-display text-2xl font-light italic leading-snug text-paper sm:text-4xl">
                Each book I write is a piece of my journey, distilled into words that I hope will light the path for others. Whether it&rsquo;s about health,
                personal growth, or fictional stories with deep life lessons, my aim is always to create works that transform as much as they inform.
              </blockquote>
              <figcaption className="mt-8 text-sm uppercase tracking-[0.25em] text-ember">A note from Arun Prabhu</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Books;
