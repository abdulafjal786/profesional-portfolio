import { lazy } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaImages, FaQuoteLeft, FaMicrophone } from "react-icons/fa";
import card1 from "../assets/gallery/about-1.jpg";
import a3 from "../assets/gallery/about-3.jpg";
import sessionBanner from "../assets/gallery_banner.jpg";
import v1 from "../assets/gallery/Intro-1.mp4";
import v2 from "../assets/gallery/Candle flame -final.mp4";
import v3 from "../assets/gallery/The Fight Within.mp4";
import v4 from "../assets/gallery/akashvani interview.mp4";
import h1 from "../assets/Dream & Passion- Selected Pics/dream_banner.jpeg";
import h2 from "../assets/RMS- Conference/a1.jpeg";
import h3 from "../assets/first_session/1.jpg";
import h4 from "../assets/Body Mind Soul Workshop/7.jpg";
import h5 from "../assets/Speak To Change Mentoring Session/1.jpg";
import h6 from "../assets/54th Public Speaking Event/1.jpg";
import h7 from "../assets/The Great Debate- Public Event/1.jpg";
import h8 from "../assets/Tarkash- Hindi Poetry Contest/1.jpg";
import { PageHero, SectionHeading, ArrowIcon } from "./ui/Section";
import { Reveal, Stagger, StaggerItem, Counter, TiltCard, Magnetic } from "./ui/motion";

const ImageHelix = lazy(() => import("../three/ImageHelix"));
const HELIX = [a3, h1, card1, h2, sessionBanner, h3, h4, h5, h6, h7, h8];

const galleryAlbums = [
  { id: 4, title: "Images", coverImage: a3, imageCount: 24, Icon: FaImages, description: "Captured moments from events, sessions, and special occasions" },
  { id: 5, title: "Videos", coverImage: v1, imageCount: 18, Icon: FaPlay, description: "Performance clips and highlights from various shows" },
  { id: 6, title: "Poetry", coverImage: v2, imageCount: 32, Icon: FaQuoteLeft, description: "Emotional and thought-provoking poetic performances" },
  { id: 7, title: "Motivational Videos", coverImage: v3, imageCount: 24, Icon: FaPlay, description: "Inspirational talks and life-changing messages" },
  { id: 8, title: "Interview Videos", coverImage: v4, imageCount: 18, Icon: FaMicrophone, description: "Conversations with media and thought leaders" },
  { id: 10, title: "Interviews", coverImage: card1, imageCount: 15, Icon: FaMicrophone, description: "In-depth discussions about art and life" },
];

const isVideo = (src) => typeof src === "string" && src.endsWith(".mp4");

const Gallery = () => (
  <div>
    <PageHero
      eyebrow="Gallery"
      title="Experience"
      accent="Our World"
      lede="A visual journey through motivational sessions, performances, and creative expressions"
      scene={<ImageHelix images={HELIX} className="h-full w-full" />}
      className="min-h-[92svh]"
    />

    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Multimedia"
          title="Explore Our Multimedia Gallery"
          lede="Dive into our rich collection of images, videos, and poetic expressions that capture the essence of our work. Each album tells a unique story of transformation and inspiration."
        />

        <Stagger className="mb-24 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {[
            ["7+", "Media Categories"],
            ["150+", "Videos"],
            ["500+", "Images"],
            ["50+", "Poetic Works"],
          ].map(([v, l]) => (
            <StaggerItem key={l} className="bg-ink p-8 text-center">
              <Counter value={v} className="font-display text-5xl font-light text-paper" />
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-mute">{l}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <h3 className="mb-10 font-display text-3xl font-light text-paper sm:text-4xl">Browse Our Collections</h3>
        </Reveal>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryAlbums.map((album, i) => (
            <StaggerItem key={album.id} className={i === 0 ? "lg:row-span-2" : ""}>
              <TiltCard max={6} className="group h-full rounded-3xl">
                <Link
                  to={`/Session-Gallery/${album.id}`}
                  className={`relative block h-full min-h-[320px] overflow-hidden rounded-3xl border border-line ${i === 0 ? "lg:min-h-[664px]" : ""}`}
                >
                  {isVideo(album.coverImage) ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src={album.coverImage} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      loading="lazy"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <album.Icon className="text-xl text-ember" />
                    <h4 className="mt-4 font-display text-3xl text-paper">{album.title}</h4>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm text-mute opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                      {album.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-paper/70">{album.imageCount}+ Media Files</span>
                      <span className="inline-flex items-center gap-2 font-semibold text-ember">
                        Explore <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Testimonials" title="What People Say" />
        <Stagger className="grid gap-6 md:grid-cols-2">
          {[
            [
              "The gallery beautifully captures the transformative energy of Arun Prabhu's sessions. Each image tells a story of personal growth and inspiration.",
              "Shivam Kumar",
            ],
            [
              "The video collections are incredibly powerful. They've become my go-to resource when I need motivation or creative inspiration.",
              "Somya Mohan, Assistant Director",
            ],
          ].map(([q, who]) => (
            <StaggerItem key={who} className="glass rounded-3xl p-8 sm:p-10">
              <span className="font-display text-6xl leading-none text-ember/60">&ldquo;</span>
              <p className="mt-2 font-display text-xl font-light italic leading-snug text-paper/90 sm:text-2xl">{q}</p>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-mute">— {who}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-28 text-center">
          <h3 className="font-display text-4xl font-light text-paper sm:text-5xl">Want to Experience These Sessions Live?</h3>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-mute">
            Join us for our upcoming events and workshops to be part of these transformative experiences.
          </p>
          <Magnetic className="mt-10">
            <Link to="/sessions" className="btn-primary px-8 py-4 text-base">
              View Upcoming Sessions <ArrowIcon />
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  </div>
);

export default Gallery;
