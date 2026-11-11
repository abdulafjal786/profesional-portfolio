import { Link } from "react-router-dom";
import { SectionHeading, ArrowIcon } from "./ui/Section";
import { Stagger, StaggerItem, TiltCard, Reveal, Magnetic } from "./ui/motion";

const HIGHLIGHTS = [
  ["6+ Years", "Of impactful sessions under the “Speak to Change” initiative"],
  ["Mumbai", "Keynote sessions in India’s financial capital"],
  ["Nationwide", "Inspiring audiences across multiple cities"],
];

const High_Career_Highlights = () => (
  <section className="relative overflow-hidden py-24 sm:py-32">
    <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-sky/[0.04] to-transparent" />
    <div className="container-x">
      <SectionHeading eyebrow="On stage" title="Sessions by Arun Prabhu" lede="Transforming lives through powerful speaking engagements across India" />
      <Stagger className="grid gap-6 md:grid-cols-3">
        {HIGHLIGHTS.map(([t, d], i) => (
          <StaggerItem key={t}>
            <TiltCard className="glass h-full rounded-3xl p-8">
              <span className="text-xs text-dim">0{i + 1}</span>
              <h3 className="mt-6 font-display text-4xl font-light text-paper">{t}</h3>
              <p className="mt-3 text-mute">{d}</p>
              <span className="mt-8 block h-px w-full bg-gradient-to-r from-sky/60 to-transparent" />
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="mt-14 text-center">
        <Magnetic>
          <Link to="/sessions" className="btn-primary">
            View Session Gallery <ArrowIcon />
          </Link>
        </Magnetic>
      </Reveal>
    </div>
  </section>
);

export default High_Career_Highlights;
