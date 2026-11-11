import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiPlay, FiX, FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import albums from "./albumData";
import { SplitText, EASE } from "./ui/motion";
import { stopLenis, startLenis } from "./lenis";

// Albums reached from the Sessions page; everything else came from the Gallery.
const SESSION_IDS = [1, 2, 3, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

const isVideo = (item) => typeof item === "string" && item.endsWith(".mp4");
const isLinked = (item) => item && typeof item === "object";
const isYouTube = (url) => /youtube\.com\/embed\//.test(url);

function Lightbox({ items, index, onClose, onNav, title }) {
  const item = items[index];
  useEffect(() => {
    stopLenis();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      startLenis();
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  const media = isLinked(item) ? item : null;
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — item ${index + 1} of ${items.length}`}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-sm text-mute">
        <span>
          <span className="text-paper">{index + 1}</span> / {items.length}
        </span>
        <button type="button" onClick={onClose} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full border border-line text-paper hover:border-ember hover:text-ember">
          <FiX size={20} />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-20" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.96, x: -30 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex max-h-full w-full max-w-6xl items-center justify-center"
          >
            {isVideo(item) ? (
              <video src={item} controls autoPlay playsInline className="max-h-[80vh] w-full rounded-2xl" />
            ) : media && isYouTube(media.link) ? (
              <div className="aspect-video w-full overflow-hidden rounded-2xl">
                <iframe src={`${media.link}?autoplay=1`} title={title} className="h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              </div>
            ) : (
              <img
                src={media ? media.src : item}
                alt={`${title} ${index + 1}`}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
            )}
          </motion.div>
        </AnimatePresence>
        {items.length > 1 && (
          <>
            <button type="button" onClick={() => onNav(-1)} aria-label="Previous" className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/5 text-paper hover:bg-ember sm:left-6">
              <FiChevronLeft size={22} />
            </button>
            <button type="button" onClick={() => onNav(1)} aria-label="Next" className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/5 text-paper hover:bg-ember sm:right-6">
              <FiChevronRight size={22} />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

const Session_Gallery = () => {
  const { albumId } = useParams();
  const album = albums.find((a) => a.id === albumId);
  const [open, setOpen] = useState(null);
  const count = album?.images.length ?? 0;
  const nav = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count]);
  const close = useCallback(() => setOpen(null), []);

  const fromSessions = SESSION_IDS.includes(parseInt(albumId, 10));
  const back = (
    <Link to={fromSessions ? "/sessions" : "/gallery"} className="group inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-ember">
      <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
      Back to {fromSessions ? "Sessions" : "Gallery"}
    </Link>
  );

  if (!album) {
    return (
      <section className="container-x grid min-h-[70vh] place-items-center pt-28 text-center">
        <div>
          <h1 className="font-display text-5xl font-light text-paper">Album not found.</h1>
          <div className="mt-8">{back}</div>
        </div>
      </section>
    );
  }

  const hasVideos = album.images.some(isVideo);

  const handleOpen = (item, i) => {
    // Non-YouTube external links (written interviews) open in a new tab, as before.
    if (isLinked(item) && !isYouTube(item.link)) {
      window.open(item.link, "_blank", "noopener,noreferrer");
      return;
    }
    setOpen(i);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container-x">
        {back}
        <div className="mt-8 flex flex-col justify-between gap-6 border-b border-line pb-10 sm:flex-row sm:items-end">
          <h1 className="max-w-4xl font-display text-4xl font-light leading-tight text-paper sm:text-6xl">
            <SplitText text={album.title} />
          </h1>
          <p className="shrink-0 text-sm uppercase tracking-[0.2em] text-mute">
            {album.images.length} {hasVideos ? "Media Items" : "Images"}
          </p>
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {album.images.map((item, index) => {
            const video = isVideo(item);
            const linked = isLinked(item);
            return (
              <motion.button
                type="button"
                key={index}
                onClick={() => handleOpen(item, index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: (index % 4) * 0.06, ease: EASE }}
                className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line bg-ink-2 text-left"
                aria-label={`${video ? "Play video" : linked ? "Open" : "View image"} ${index + 1}`}
              >
                {video ? (
                  <video
                    className="aspect-video w-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  >
                    <source src={item} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={linked ? item.src : item}
                    alt={`${album.title} ${index + 1}`}
                    loading="lazy"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-ember text-white shadow-lg">
                    {video || (linked && isYouTube(item.link)) ? <FiPlay size={22} /> : linked ? <FiExternalLink size={20} /> : <span className="text-xl">+</span>}
                  </span>
                </div>
                {linked && (
                  <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-paper backdrop-blur">
                    {isYouTube(item.link) ? "Watch" : "Read interview"}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>{open !== null && <Lightbox items={album.images} index={open} onClose={close} onNav={nav} title={album.title} />}</AnimatePresence>
    </div>
  );
};

export default Session_Gallery;
