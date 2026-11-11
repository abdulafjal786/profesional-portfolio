import aboutImg from "../assets/5.png";
import { Reveal, TiltCard, Stagger, StaggerItem, SplitText } from "./ui/motion";

const BOOKS_OUT = ["Count Your Chicken Before You Lay Them", "Niharika I Want to Live Again"];
const BOOKS_NEXT = ["Akanksha Ek Mehatvakanksha", "Create Your Universe", "The Chemistry of Diseases"];

const Home_About = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal x={-40} y={0} className="lg:sticky lg:top-28">
          <TiltCard max={8} className="overflow-hidden rounded-[2rem] border border-line">
            <img
              src={aboutImg}
              alt="Founder - Arun Prabhu"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6">
              <p className="font-display text-2xl text-paper">Arun Prabhu</p>
              <p className="text-sm text-mute">Founder &amp; Visionary</p>
            </div>
          </TiltCard>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">About us</span>
          </Reveal>
          <h2 className="mt-5 font-display text-4xl font-light leading-tight text-paper sm:text-5xl">
            <SplitText text="Engineer by education. Storyteller by passion." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-paper/85">
              Arun Prabhu is a mechanical engineer by education, an IT professional by vocation, and a multifaceted creative by passion — an author,
              filmmaker, theater artist, motivational speaker, and life coach.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="glass rounded-2xl p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ember">Published · 5★ rated</p>
                <ul className="mt-4 space-y-3">
                  {BOOKS_OUT.map((b) => (
                    <li key={b} className="font-display text-lg italic leading-snug text-paper">
                      &ldquo;{b}&rdquo;
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky">In the works</p>
                <ul className="mt-4 space-y-3">
                  {BOOKS_NEXT.map((b) => (
                    <li key={b} className="font-display text-lg italic leading-snug text-paper/85">
                      &ldquo;{b}&rdquo;
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-14 text-[11px] font-semibold uppercase tracking-[0.25em] text-dim">Arun is the visionary founder of</p>
          </Reveal>
          <Stagger className="mt-6 space-y-4">
            <StaggerItem className="rounded-2xl border border-line p-6 transition-colors hover:border-sky/40">
              <h3 className="font-display text-2xl text-paper">Sartrac Global</h3>
              <p className="mt-2 text-mute">Promoting holistic living and personal transformation</p>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-line p-6 transition-colors hover:border-ember/40">
              <h3 className="font-display text-2xl text-paper">Akanksha Aradhya Foundation</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["Arogyam", "Medicine-free healthy living initiatives"],
                  ["Gurukul", "Reviving the ancient Gurukul education system"],
                  ["Annapoorna", "Nourishment programs for the underprivileged"],
                  ["Palna", "Support and adoption programs for girl children"],
                ].map(([t, d]) => (
                  <li key={t} className="rounded-xl bg-white/[0.03] p-4">
                    <p className="text-sm font-semibold text-ember">{t}</p>
                    <p className="mt-1 text-sm text-mute">{d}</p>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
};

export default Home_About;
