import { FaQuoteLeft } from "react-icons/fa";
import { FiAward } from "react-icons/fi";
import { RiFilmLine, RiTeamLine, RiUserHeartLine } from "react-icons/ri";
import work2 from "../assets/a28.jpeg";
import work3 from "../assets/film_direction.jpg";
import work4 from "../assets/workshop21.jpg";
import work5 from "../assets/about/a2.jpg";
import work6 from "../assets/about/a3.jpg";
import work7 from "../assets/about/a5.jpg";
import { Reveal, Counter, Stagger, StaggerItem, SplitText } from "./ui/motion";

const galleryImages = [
  { img: work2, alt: "Theater Performance" },
  { img: work3, alt: "Film Direction" },
  { img: work4, alt: "Workshop Session" },
  { img: work5, alt: "Motivational Speaking" },
  { img: work6, alt: "Group Workshop" },
  { img: work7, alt: "Training Session" },
];

const stats = [
  { value: "25+", label: "Events", Icon: RiTeamLine },
  { value: "15+", label: "Productions", Icon: RiFilmLine },
  { value: "100+", label: "Workshops", Icon: FiAward },
  { value: "10K+", label: "Lives Touched", Icon: RiUserHeartLine },
];

const Home_Our_work = () => (
  <section className="relative py-24 sm:py-32">
    <div className="container-x grid items-center gap-16 lg:grid-cols-2">
      <div>
        <Reveal>
          <span className="eyebrow">Our impact</span>
        </Reveal>
        <h2 className="mt-5 font-display text-4xl font-light leading-tight text-paper sm:text-6xl">
          <SplitText text="Transforming Lives Through" /> <SplitText text="Creative Expression" delay={0.2} className="text-gradient italic" />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg leading-relaxed text-mute">
            With over 15 years of multifaceted experience across performance arts, education, and humanitarian work, Arun Prabhu brings a unique synthesis
            of artistic excellence and human connection.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <figure className="glass mt-10 rounded-3xl p-7">
            <FaQuoteLeft className="text-2xl text-ember" />
            <blockquote className="mt-4 font-display text-xl font-light italic leading-snug text-paper/90">
              &ldquo;His approach combines technical mastery with emotional intelligence, creating transformative experiences whether on stage, on screen, or
              in the classroom.&rdquo;
            </blockquote>
          </figure>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-4">
          {stats.map(({ value, label, Icon }) => (
            <StaggerItem key={label} className="flex items-center gap-4 rounded-2xl border border-line p-5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sky/10 text-xl text-sky">
                <Icon />
              </span>
              <div>
                <Counter value={value} className="font-display text-3xl text-paper" />
                <p className="text-xs uppercase tracking-wider text-mute">{label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {galleryImages.map((im, i) => (
          <StaggerItem key={im.alt} className={`group relative overflow-hidden rounded-2xl ${i % 3 === 1 ? "sm:translate-y-10" : ""}`}>
            <img
              src={im.img}
              alt={im.alt}
              loading="lazy"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              className="aspect-[3/4] w-full object-cover grayscale-[40%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-sm font-medium text-paper">{im.alt}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);

export default Home_Our_work;
