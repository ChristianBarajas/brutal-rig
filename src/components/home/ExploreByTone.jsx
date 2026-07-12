import ToneCard from "./ToneCard";

const tones = [
  {
    title: "Hardcore",
    description:
      "Tight low end, aggressive mids, controlled gain, and brutal rhythm clarity built for breakdowns.",
    characteristics: ["Tight", "Percussive", "Aggressive"],
  },
  {
    title: "Metalcore",
    description:
      "Modern high-gain tone with clear palm mutes, cutting leads, and enough definition for layered riffs.",
    characteristics: ["Modern", "Clear", "High Gain"],
  },
  {
    title: "Death Metal",
    description:
      "Fast attack, heavy saturation, powerful low end, and articulation for technical or crushing riffs.",
    characteristics: ["Heavy", "Fast", "Saturated"],
  },
  {
    title: "Thrash",
    description:
      "Sharp pick attack, focused mids, restrained low end, and enough bite to cut through fast rhythm work.",
    characteristics: ["Sharp", "Dry", "Focused"],
  },
  {
    title: "Doom & Sludge",
    description:
      "Massive low end, thick distortion, slower response, and a wall-of-sound character that feels physical.",
    characteristics: ["Huge", "Fuzzy", "Dark"],
  },
  {
    title: "Nu Metal",
    description:
      "Extended low end, scooped aggression, punchy rhythm response, and support for lower tunings.",
    characteristics: ["Low Tuned", "Punchy", "Wide"],
  },
];

export default function ExploreByTone() {
  return (
    <section id="tones" className="relative px-6 py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#050505,_#080808_45%,_#050505)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-zinc-500">
              Explore by tone
            </p>

            <h2 className="mt-5 max-w-3xl text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
              Start with the sound
              <span className="block text-zinc-600">you’re chasing.</span>
            </h2>
          </div>

          <p className="max-w-md leading-7 text-zinc-400">
            Choose a heavy-music tone profile and Brutal Rig will build around
            the response, gain structure, tuning, pickups, and feel that define
            it.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tones.map((tone, index) => (
            <ToneCard
              key={tone.title}
              title={tone.title}
              description={tone.description}
              characteristics={tone.characteristics}
              number={String(index + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}