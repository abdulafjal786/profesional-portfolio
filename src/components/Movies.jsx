import { lazy } from "react";
import { Play } from "lucide-react";
import { PageHero, SectionHeading } from "./ui/Section";
import { Reveal, Stagger, StaggerItem, TiltCard } from "./ui/motion";

const ProjectorBeam = lazy(() => import("../three/ProjectorBeam"));

const releasedMovies = [
  {
    title: "Tanaya",
    year: "2019",
    youtubeEmbed: "https://www.youtube.com/embed/SnJbl3P5d8g",
    description: "A powerful drama about second chances and the resilience of the human spirit, marking Arun Prabhu's directorial debut.",
    role: "Director, Writer, Producer",
    duration: "8m 8s",
    genre: "Suspense , Mystery",
  },
];

const upcomingProjects = [
  { title: "The Chemistry of Life", status: "Pre-production", expected: "2024", description: "An inspirational story blending science and human perseverance." },
  { title: "Create Your Universe", status: "Scripting", expected: "2025", description: "A metaphysical journey exploring consciousness and reality." },
];

const Movies = () => {
  return (
    <div>
      <PageHero
        eyebrow="Now showing"
        title="Arun Prabhu"
        accent="Films"
        lede="Cinematic storytelling that entertains, inspires, and transforms"
        scene={<ProjectorBeam className="h-full w-full" />}
        className="min-h-[80svh]"
        align="center"
      />

      <section className="relative pb-24">
        <div className="container-x">
          <Reveal className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-light text-paper sm:text-5xl">Released Films</h2>
            <span className="rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-xs text-ember">
              {releasedMovies.length} Movie
            </span>
          </Reveal>

          {releasedMovies.map((m) => (
            <Reveal key={m.title}>
              <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
                <div className="relative rounded-[2rem] border border-line bg-black p-2 shadow-[0_40px_120px_-30px_rgba(241,97,54,0.35)]">
                  <div className="aspect-video overflow-hidden rounded-[1.6rem]">
                    <iframe
                      src={m.youtubeEmbed}
                      className="h-full w-full"
                      frameBorder="0"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={m.title}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-dim">{m.year}</p>
                  <h3 className="mt-2 font-display text-6xl font-light italic text-paper">{m.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[m.genre, m.duration].map((t) => (
                      <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-mute">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-6 leading-relaxed text-mute">{m.description}</p>
                  <p className="mt-4 text-sm text-paper/80">
                    <span className="text-dim">Role —</span> {m.role}
                  </p>
                  <a href={m.youtubeEmbed.replace("embed/", "watch?v=")} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 self-start">
                    <Play size={16} /> Watch on YouTube
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="In development" title="Upcoming Projects" align="left" />
          <Stagger className="grid gap-6 md:grid-cols-2">
            {upcomingProjects.map((p, i) => (
              <StaggerItem key={p.title}>
                <TiltCard max={6} className="group h-full overflow-hidden rounded-3xl">
                  <div className="glass relative h-full rounded-3xl p-8 sm:p-10">
                    {/* film perforations */}
                    <div aria-hidden className="absolute inset-y-0 right-4 flex flex-col justify-around opacity-20">
                      {Array.from({ length: 8 }).map((_, k) => (
                        <span key={k} className="h-3 w-2 rounded-sm bg-paper" />
                      ))}
                    </div>
                    <span className="font-display text-7xl font-light italic text-white/10">0{i + 1}</span>
                    <h3 className="mt-2 font-display text-3xl text-paper">{p.title}</h3>
                    <div className="mt-4 flex items-center gap-3 text-xs">
                      <span className={`rounded-full px-3 py-1 ${p.status === "Pre-production" ? "bg-sky/15 text-sky" : "bg-ember/15 text-ember"}`}>{p.status}</span>
                      <span className="text-dim">Expected: {p.expected}</span>
                    </div>
                    <p className="mt-5 max-w-md text-mute">{p.description}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <div className="glass grain relative overflow-hidden rounded-[2rem] p-8 sm:p-14">
              <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ember/20 blur-3xl" />
              <h2 className="font-display text-4xl font-light text-paper sm:text-5xl">The Prabhu Filmmaking Philosophy</h2>
              <div className="mt-12 grid gap-10 md:grid-cols-2">
                <div>
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-ember">Storytelling with Purpose</h3>
                  <p className="mt-4 font-display text-xl font-light italic leading-snug text-paper/90">
                    &ldquo;I believe cinema should do more than entertain - it should illuminate the human condition. Each frame must serve the story, and every
                    story must serve truth.&rdquo;
                  </p>
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-ember">Actor-Centered Direction</h3>
                  <p className="mt-4 font-display text-xl font-light italic leading-snug text-paper/90">
                    &ldquo;My approach combines psychological depth with technical precision, creating an environment where actors feel safe to explore their
                    most authentic performances.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Movies;
