import { lazy, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import card1 from "../assets/Dream & Passion- Selected Pics/dream_banner.jpeg";
import card2 from "../assets/RBSM- DSLR Images/shaping your life.jpeg";
import card3 from "../assets/RMS- Conference/a1.jpeg";
import card4 from "../assets/first_session/1.jpg";
import card5 from "../assets/Body Mind Soul Workshop/7.jpg";
import card6 from "../assets/If You Fail to Plan, You Are Planning to Fail - 12 Jan 14/1.jpg";
import card7 from "../assets/Body Mind Soul Workshop - Corporate Workshop for Nexus Telecom/1.jpg";
import card8 from "../assets/Body Mind Soul Workshop- Govt Polytechnic Mandkola/3.jpg";
import card9 from "../assets/Body Mind Soul Workshop with MBA Students of YMCA College Faridabad/2.jpg";
import card10 from "../assets/Body Mind Soul Workshop Ideashacks- LOA healing workshop/1.jpg";
import card11 from "../assets/Speak To Change Mentoring Session/1.jpg";
import card12 from "../assets/37th Mentoring Session/1.jpg";
import card13 from "../assets/39th Mentoring Session/1.jpg";
import card14 from "../assets/40th Mentoring Session/1.jpg";
import card15 from "../assets/Workshop on the Fundamentals of Public Speaking/4.jpg";
import card16 from "../assets/54th Public Speaking Event/1.jpg";
import card17 from "../assets/The Great Debate- Public Event/1.jpg";
import card18 from "../assets/Speak To Explain- Public Event/1.jpg";
import card19 from "../assets/Dilli Nama- Speech Contest/1.jpg";
import card20 from "../assets/Pronunciation Workshop/1.jpg";
import card21 from "../assets/Tarkash- Hindi Poetry Contest/1.jpg";
import card22 from "../assets/Speak To Change- Public Event/1.jpg";
import card23 from "../assets/The Great Silver Coin Debate/2.jpg";
import card24 from "../assets/Pecha Kucha Contest/1.jpg";
import { PageHero, ArrowIcon } from "./ui/Section";
import { Reveal, EASE } from "./ui/motion";

const ImageHelix = lazy(() => import("../three/ImageHelix"));

const SESSION_ALBUMS = [
  { id: 1, title: "Dream & Passion", coverImage: card1, imageCount: 24, tag: "Conference" },
  { id: 2, title: "RBSM- Shaping your life", coverImage: card2, imageCount: 18, tag: "School" },
  { id: 3, title: "RMS- Conference", coverImage: card3, imageCount: 7, tag: "Conference" },
  { id: 11, title: "First Session", coverImage: card4, imageCount: 8, tag: "Mentoring" },
  { id: 12, title: "Body Mind Soul Workshop", coverImage: card5, imageCount: 6, tag: "Workshop" },
  { id: 13, title: "If You Fail to Plan, You Are Planning to Fail", coverImage: card6, imageCount: 8, tag: "Workshop" },
  { id: 14, title: "Body Mind Soul Workshop - Corporate Workshop for Nexus Telecom", coverImage: card7, imageCount: 8, tag: "Workshop" },
  { id: 15, title: "Body Mind Soul Workshop- Govt Polytechnic Mandkola", coverImage: card8, imageCount: 8, tag: "Workshop" },
  { id: 16, title: "Body Mind Soul Workshop with MBA Students of YMCA College Faridabad", coverImage: card9, imageCount: 8, tag: "Workshop" },
  { id: 17, title: "Body Mind Soul Workshop Ideashacks- LOA healing workshop", coverImage: card10, imageCount: 8, tag: "Workshop" },
  { id: 18, title: "Speak To Change Mentoring Session", coverImage: card11, imageCount: 8, tag: "Mentoring" },
  { id: 19, title: "37th Mentoring Session", coverImage: card12, imageCount: 8, tag: "Mentoring" },
  { id: 20, title: "39th Mentoring Session", coverImage: card13, imageCount: 8, tag: "Mentoring" },
  { id: 21, title: "40th Mentoring Session", coverImage: card14, imageCount: 8, tag: "Mentoring" },
  { id: 22, title: "Workshop on the Fundamentals of Public Speaking", coverImage: card15, imageCount: 8, tag: "Workshop" },
  { id: 23, title: "54th Public Speaking Event", coverImage: card16, imageCount: 8, tag: "Public Event" },
  { id: 24, title: "The Great Debate- Public Event", coverImage: card17, imageCount: 8, tag: "Public Event" },
  { id: 25, title: "Speak To Explain- Public Event", coverImage: card18, imageCount: 8, tag: "Public Event" },
  { id: 26, title: "Dilli Nama- Speech Contest", coverImage: card19, imageCount: 8, tag: "Contest" },
  { id: 27, title: "Pronunciation Workshop", coverImage: card20, imageCount: 8, tag: "Workshop" },
  { id: 28, title: "Tarkash- Hindi Poetry Contest", coverImage: card21, imageCount: 8, tag: "Contest" },
  { id: 29, title: "Speak To Change- Public Event", coverImage: card22, imageCount: 8, tag: "Public Event" },
  { id: 30, title: "The Great Silver Coin Debate", coverImage: card23, imageCount: 8, tag: "Contest" },
  { id: 31, title: "Pecha Kucha Contest", coverImage: card24, imageCount: 8, tag: "Contest" },
];

const HELIX = SESSION_ALBUMS.slice(0, 18).map((a) => a.coverImage);
const TAGS = ["All", "Conference", "Workshop", "Mentoring", "Public Event", "Contest", "School"];

const Sessions = () => {
  const [tag, setTag] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(
    () => SESSION_ALBUMS.filter((a) => (tag === "All" || a.tag === tag) && a.title.toLowerCase().includes(q.trim().toLowerCase())),
    [tag, q]
  );

  return (
    <div>
      <PageHero
        eyebrow="Services · Sessions"
        title="Transformative"
        accent="Sessions"
        lede="Workshops, mentoring circles, debates and keynotes — every session designed not just to inform but to ignite change."
        scene={<ImageHelix images={HELIX} className="h-full w-full" />}
      />

      <section className="py-24 sm:py-28">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="eyebrow">{SESSION_ALBUMS.length} albums</span>
                <h2 className="mt-5 font-display text-4xl font-light text-paper sm:text-6xl">Our Signature Programs</h2>
              </div>
              <label className="relative block w-full lg:w-80">
                <span className="sr-only">Search sessions</span>
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search sessions…"
                  className="w-full rounded-full border border-line bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-paper outline-none transition-colors placeholder:text-dim focus:border-ember/60"
                />
              </label>
            </div>
            <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter sessions">
              {TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tag === t}
                  onClick={() => setTag(t)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${tag === t ? "text-white" : "text-mute hover:text-paper"}`}
                >
                  {tag === t && <motion.span layoutId="session-tag" className="absolute inset-0 -z-10 rounded-full bg-ember" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  {t}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((album, i) => (
                <motion.div
                  key={album.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: Math.min(i, 8) * 0.04, ease: EASE } }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                >
                  <Link
                    to={`/Session-Gallery/${album.id}`}
                    className="group block overflow-hidden rounded-3xl border border-line bg-ink-2/60 transition-colors duration-500 hover:border-ember/40"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={album.coverImage}
                        alt={album.title}
                        loading="lazy"
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[11px] uppercase tracking-wider text-paper/90 backdrop-blur">
                        {album.tag}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4 p-6">
                      <div>
                        <h3 className="font-display text-xl leading-snug text-paper">{album.title}</h3>
                        <p className="mt-2 text-sm text-mute">{album.imageCount}+ Powerful Moments</p>
                      </div>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-paper transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-ember group-hover:bg-ember">
                        <ArrowIcon />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && <p className="mt-16 text-center text-mute">No sessions match &ldquo;{q}&rdquo;.</p>}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-4xl">
            <figure className="glass grain relative overflow-hidden rounded-[2rem] p-8 sm:p-14">
              <figcaption className="eyebrow">A Note from Arun Prabhu</figcaption>
              <blockquote className="mt-6 font-display text-xl font-light italic leading-relaxed text-paper/90 sm:text-2xl">
                &ldquo;Arun Prabhu has led a wide range of impactful sessions at various institutions, corporate organizations, educational campuses, and
                community platforms. From inspiring workshops on personal transformation to focused mentoring programs, his sessions have reached and
                resonated with audiences across multiple cities and backgrounds. Each session is designed not just to inform but to ignite change, leaving a
                lasting impression on participants.&rdquo;
              </blockquote>
              <p className="mt-6 text-sm text-mute">— Arun Prabhu</p>
            </figure>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Sessions;
