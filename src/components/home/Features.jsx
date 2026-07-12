import { Guitar, Search, ShieldCheck } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    id: 1,
    icon: <Guitar />,
    title: "Real Gear Only",
    text: "Guitars, basses, amps, cabs, pedals, pickups, strings, and accessories. No digital rigs in the MVP.",
  },
  {
    id: 2,
    icon: <Search />,
    title: "Best Price Hunt",
    text: "Compare buying paths across Sweetwater, Guitar Center, Reverb, Facebook Marketplace, and OfferUp.",
  },
  {
    id: 3,
    icon: <ShieldCheck />,
    title: "Artist-Inspired Tone",
    text: "Build rigs inspired by metal and hardcore sounds without pretending to copy exact private setups.",
  },
];

export default function Features() {
  return (
    <section
      id="gear"
      className="relative z-10 mx-auto grid max-w-7xl gap-5 px-6 pb-28 md:grid-cols-3"
    >
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          icon={feature.icon}
          title={feature.title}
          text={feature.text}
        />
      ))}
    </section>
  );
}