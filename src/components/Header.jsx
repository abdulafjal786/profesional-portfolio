import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Menu, X, Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowUpRight } from "lucide-react";
import { EASE } from "./ui/motion";

export const SOCIALS = [
  { href: "https://www.facebook.com/arunprabhuaradhya", label: "Facebook", Icon: Facebook },
  { href: "https://twitter.com/auth_arunprabhu", label: "Twitter", Icon: Twitter },
  { href: "https://www.instagram.com/authorarun/", label: "Instagram", Icon: Instagram },
  { href: "https://www.youtube.com/channel/UCzr36VjVblFAmYqJcBVxRQg/videos", label: "YouTube", Icon: Youtube },
  { href: "https://www.linkedin.com/company/author-arun-prabhu-aradhya/", label: "LinkedIn", Icon: Linkedin },
];

const ENGAGEMENTS = [
  { label: "Amosta Solutions", href: "https://www.amosta.com/" },
  { label: "Speak to Change Foundation", href: "http://speaktochange.in/" },
  { label: "Sartrac Global", href: "https://sartracglobal.com/" },
  { label: "Humhai Theatres", href: "https://humhaitheatres.com/" },
  { label: "Akanksha Aradhya Foundation", href: "http://www.akankshaaradhyafoundation.com/" },
];

const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Explore",
    children: [
      { label: "Blog", href: "https://arunprabhuaradhya.blogspot.com/" },
      { label: "Books", to: "/book" },
      { label: "Movies", to: "/movies" },
    ],
  },
  {
    label: "Services",
    children: [{ label: "Sessions", to: "/sessions" }, { label: "Engagements", group: ENGAGEMENTS }],
  },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

function Dropdown({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-paper/80 transition-colors hover:text-paper"
      >
        {item.label}
        <ChevronDown size={14} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3"
          >
            <div className="glass rounded-2xl bg-ink/80 p-2 shadow-2xl shadow-black/50">
              {item.children.map((c) =>
                c.group ? (
                  <div key={c.label} className="mt-1 border-t border-line pt-2">
                    <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-dim">{c.label}</p>
                    {c.group.map((g) => (
                      <a
                        key={g.href}
                        href={g.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm text-paper/80 transition-colors hover:bg-white/5 hover:text-paper"
                      >
                        {g.label}
                        <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    ))}
                  </div>
                ) : c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-paper/80 transition-colors hover:bg-white/5 hover:text-paper"
                  >
                    {c.label}
                    <ArrowUpRight size={14} className="opacity-50 transition-opacity group-hover:opacity-100" />
                  </a>
                ) : (
                  <NavLink
                    key={c.label}
                    to={c.to}
                    className={({ isActive }) =>
                      `block rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-white/5 ${isActive ? "text-ember" : "text-paper/80 hover:text-paper"}`
                    }
                  >
                    {c.label}
                  </NavLink>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ onClose }) {
  const [openGroup, setOpenGroup] = useState(null);
  const flat = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Books", to: "/book" },
    { label: "Movies", to: "/movies" },
    { label: "Sessions", to: "/sessions" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ];
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
      animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
      exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed inset-0 z-40 overflow-y-auto bg-ink/95 px-6 pb-12 pt-28 backdrop-blur-xl lg:hidden"
    >
      <nav className="flex flex-col">
        {flat.map((l, i) => (
          <motion.div
            key={l.to}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }}
          >
            <NavLink
              to={l.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl font-light ${isActive ? "text-ember" : "text-paper"}`
              }
            >
              <span className="font-sans text-xs text-dim">0{i + 1}</span>
              {l.label}
            </NavLink>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6">
          <a
            href="https://arunprabhuaradhya.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-3 text-lg text-paper/80"
          >
            Blog <ArrowUpRight size={18} />
          </a>
          <button
            type="button"
            onClick={() => setOpenGroup((g) => (g ? null : "eng"))}
            aria-expanded={!!openGroup}
            className="flex w-full items-center justify-between py-3 text-lg text-paper/80"
          >
            Engagements <ChevronDown size={18} className={`transition-transform ${openGroup ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {openGroup && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pl-4">
                {ENGAGEMENTS.map((g) => (
                  <a key={g.href} href={g.href} target="_blank" rel="noopener noreferrer" className="block py-2 text-mute hover:text-paper">
                    {g.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-8 flex gap-5">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-mute hover:text-ember">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.div>
  );
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 300 && y > prev && !mobileOpen);
  });

  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className={`transition-all duration-500 ${solid ? "border-b border-line bg-ink/70 backdrop-blur-xl" : "bg-transparent"}`}>
          <div className="container-x flex h-20 items-center justify-between">
            <Link to="/" className="group relative z-50 flex items-center gap-3" aria-label="Arun Prabhu — home">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 font-display text-sm italic text-paper transition-colors group-hover:border-ember group-hover:text-ember">
                AP
              </span>
              <span className="font-display text-xl text-paper">
                Arun <span className="italic text-ember">Prabhu</span>
              </span>
            </Link>

            <nav className="hidden items-center lg:flex" aria-label="Main">
              {NAV.map((item) =>
                item.children ? (
                  <Dropdown key={item.label} item={item} />
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? "text-paper" : "text-paper/70 hover:text-paper"}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full border border-ember/40 bg-ember/15"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        {item.label}
                      </>
                    )}
                  </NavLink>
                )
              )}
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-paper/60 transition-all hover:-translate-y-0.5 hover:text-ember"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-paper lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-gradient-to-r from-ember via-ember-2 to-sky" />
      </motion.header>
      <AnimatePresence>{mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}</AnimatePresence>
    </>
  );
};

export default Header;
