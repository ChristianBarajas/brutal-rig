import { BrainCircuit, ListChecks, SlidersHorizontal } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    id: 1,
    icon: <SlidersHorizontal />,
    title: "Tell Us What Matters",
    text: "Choose an instrument, a real budget, a heavy tone, favorite bands, trusted brands, and how you prefer to shop.",
  },
  {
    id: 2,
    icon: <ListChecks />,
    title: "The Engine Verifies It",
    text: "Deterministic rules score real gear, check head-and-cab compatibility, select required cables, and protect the budget.",
  },
  {
    id: 3,
    icon: <BrainCircuit />,
    title: "AI Makes It Usable",
    text: "On request, AI Rig Tech adds a signal chain, practical starting settings, setup notes, and a realistic upgrade path.",
  },
];

export default function Features() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 py-28 md:grid-cols-3 md:px-6"
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
