import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SOCIALS } from "./Header";
import { Reveal, Magnetic } from "./ui/motion";
import { ArrowIcon } from "./ui/Section";
import { scrollToTop } from "./lenis";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2/60 pt-24 pb-10">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-ember/10 blur-3xl" />
      <div className="container-x relative">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 border-b border-line pb-16 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-display text-5xl font-light leading-[0.95] text-paper sm:text-7xl">
              Let&rsquo;s create something that <em className="text-gradient">moves people.</em>
            </h2>
            <Magnetic>
              <Link to="/contact" className="btn-primary px-8 py-4 text-base">
                Start a conversation <ArrowIcon />
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl text-paper">
              Arun <span className="italic text-ember">Prabhu</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-mute">
              Author. Filmmaker. Storyteller. Welcome to my creative universe of literature, cinema, and personal reflections.
            </p>
          </div>

          <div>
            <h3 className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-dim">Explore</h3>
            <ul className="space-y-3 text-sm">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Books", "/book"],
                ["Movies", "/movies"],
                ["Sessions", "/sessions"],
                ["Gallery", "/gallery"],
              ].map(([l, to]) => (
                <li key={to}>
                  <Link to={to} className="text-paper/70 transition-colors hover:text-ember">
                    {l}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://arunprabhuaradhya.blogspot.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-paper/70 transition-colors hover:text-ember"
                >
                  Blog <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-dim">Contact</h3>
            <ul className="space-y-4 text-sm text-paper/70">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-ember" />
                <span>301-B, 402-B, Flatted Factory Complex, Hartron Technology Park, Sector 18, Gurugram, Haryana</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-ember" />
                <a href="tel:+918882212649" className="hover:text-paper">
                  +91 88822 12649
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-ember" />
                <a href="mailto:arun@arunprabhu.com" className="hover:text-paper">
                  arun@arunprabhu.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-dim">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-paper/70 transition-all hover:-translate-y-1 hover:border-ember hover:bg-ember hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-dim sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-paper/80">Arun Prabhu Aradhya</span>. All Rights Reserved.
          </p>
          <button
            type="button"
            onClick={() => scrollToTop()}
            className="uppercase tracking-[0.25em] transition-colors hover:text-ember"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
