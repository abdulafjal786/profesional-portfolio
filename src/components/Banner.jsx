import { lazy } from "react";
import arunsir from "../assets/Arun sir (2).jpg";
import first from "../assets/slider_logo/RBSM School.jpg";
import second from "../assets/slider_logo/Astral Education.jpg";
import third from "../assets/slider_logo/RMS School.jpg";
import fourth from "../assets/slider_logo/J M International School.jpg";
import fifth from "../assets/slider_logo/ITI Mandkola.jpg";
import { PageHero, Marquee } from "./ui/Section";
import { Counter, Reveal } from "./ui/motion";

const PortraitParticles = lazy(() => import("../three/PortraitParticles"));

const trustedBrands = [
  { name: "RBSM School", logo: first },
  { name: "Astral Education", logo: second },
  { name: "RMS School", logo: third },
  { name: "J M International School", logo: fourth },
  { name: "ITI Mandkola", logo: fifth },
];

const Banner = () => {
  return (
    <>
      <PageHero
        eyebrow="About Arun Prabhu"
        title="Being minimalistic is an attitude"
        accent="and not a trend."
        lede="Award-winning motivational speaker, acting coach, and entrepreneur with 15+ years of experience transforming lives through powerful workshops and inspirational talks."
        scene={<PortraitParticles src={arunsir} className="h-full w-full opacity-50 lg:opacity-100" />}
      >
        <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
          {[
            ["15+", "Years Experience"],
            ["100+", "Students Trained"],
            ["25+", "Successful Ventures"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-display text-5xl font-light text-paper">
                <Counter value={v} />
              </dd>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-mute">{l}</p>
            </div>
          ))}
        </dl>
        <p className="mt-10 hidden text-xs text-dim lg:block">Move your cursor across the portrait →</p>
      </PageHero>

      <section className="border-y border-line bg-ink-2/50 py-14">
        <div className="container-x">
          <Reveal>
            <div className="mb-10 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
              <h2 className="font-display text-2xl font-light text-paper sm:text-3xl">Trusted by Leading Organizations</h2>
              <p className="max-w-md text-sm text-mute">Partnered with top educational institutions and corporate organizations across India</p>
            </div>
          </Reveal>
          <Marquee>
            {trustedBrands.map((b) => (
              <div
                key={b.name}
                className="flex h-24 w-52 shrink-0 items-center justify-center rounded-2xl bg-paper p-4 opacity-80 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              >
                <img src={b.logo} alt={b.name} title={b.name} className="max-h-16 w-auto object-contain" draggable="false" />
              </div>
            ))}
          </Marquee>
        </div>
      </section>
    </>
  );
};

export default Banner;
