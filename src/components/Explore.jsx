import { ArrowUpRight } from "lucide-react";
import a1 from "../assets/explore/slideshare-scribd-company.svg";
import a2 from "../assets/explore/goodread.jpg";
import a3 from "../assets/explore/Add-a-heading6-png.webp";
import a4 from "../assets/explore/quotefancy.jpg";
import a5 from "../assets/explore/madras-shoppe-logo.jpg";
import a6 from "../assets/explore/desertcart.jpg";
import a7 from "../assets/explore/coronatodays.png";
import { SectionHeading } from "./ui/Section";
import { Stagger, StaggerItem, TiltCard } from "./ui/motion";

const exploreData = [
  { id: 1, logo: a1, quote: "Success is not a destination, it's a journey. – Arun Prabhu", link: "https://www.slideshare.net/arunprabhuans" },
  {
    id: 2,
    logo: a2,
    quote: "“They say the teacher is always there. They only appear when the student is ready….” – Arun Prabhu",
    link: "https://www.goodreads.com/author/quotes/16482577.Arun_Prabhu_aradhya",
  },
  {
    id: 3,
    logo: a3,
    quote: "Count your chickens before you lay them. – Arun Prabhu",
    link: "https://www.pastcart.com/product/count-your-chickens-before-you-lay-them-by-arun-prabhu-aradhya/",
  },
  {
    id: 4,
    logo: a4,
    quote: "“We see the problems of the world through our perception of the world. Change ….” – Arun Prabhu",
    link: "https://quotefancy.com/arun-prabhu-aradhya-quotes",
  },
  {
    id: 5,
    logo: a5,
    quote: "“Count Your Chicken Before You Lay Them” – Arun Prabhu",
    link: "https://www.madrasshoppe.com/count-your-chicken-before-you-lay-them-arun-prabhu-aradhya-9789381902592-181054.html?srsltid=AfmBOoo652-Xmo-2RR4ora215OiCFJyzOQK-VdtfHYbx1vBPGVZCqbO8a",
  },
  {
    id: 6,
    logo: a6,
    quote: "Count Your Chicken Before You Lay Them. – 2019 – Arun Prabhu",
    link: "https://www.desertcart.tn/products/166281601-count-your-chicken-before-you-lay-them-2019-english-paperback-arun-prabhu-aradhya",
  },
  { id: 7, logo: a7, quote: "Arun Prabhu Aradhya Quote Everything In This Universe Happens For A– Arun Prabhu", link: "https://jethrojeff.com/" },
];

const Explore = () => (
  <section className="relative py-24 sm:py-32">
    <div className="container-x">
      <SectionHeading eyebrow="Featured on" title="Explore Arun Prabhu’s Reach" lede="See which leading platforms have featured Arun Prabhu’s powerful words" />
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {exploreData.map(({ id, logo, quote, link }, i) => (
          <StaggerItem key={id} className={i === 0 ? "lg:col-span-2" : ""}>
            <TiltCard max={6} className="h-full rounded-3xl">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass flex h-full flex-col justify-between gap-8 rounded-3xl p-7 transition-colors duration-500 hover:border-sky/40"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-16 w-32 place-items-center rounded-xl bg-paper p-2">
                    <img src={logo} alt="Platform logo" className="max-h-12 max-w-full object-contain" draggable="false" loading="lazy" />
                  </span>
                  <ArrowUpRight className="text-dim transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sky" />
                </div>
                <p className="font-display text-xl font-light italic leading-snug text-paper/85 transition-colors group-hover:text-paper">{quote}</p>
              </a>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);

export default Explore;
