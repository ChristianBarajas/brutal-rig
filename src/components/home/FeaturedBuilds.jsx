import BuildCard from "./BuildCard";

const builds = [
  {
    title: "Modern Hardcore",
    subtitle:
      "A tight, aggressive setup built around fast attack, controlled gain, and powerful live rhythm tone.",
    budget: "$1,500",
    instrument: "Guitar Rig",
    gear: ["LTD", "High-Output Pickups", "6505", "2x12 Cab"],
    featured: true,
  },
  {
    title: "Budget Metalcore",
    subtitle:
      "A complete entry-level rig that stays clear under gain and leaves room for future upgrades.",
    budget: "$850",
    instrument: "Guitar Rig",
    gear: ["Schecter", "Humbuckers", "High-Gain Combo"],
  },
  {
    title: "Doom Wall",
    subtitle:
      "Massive low end, thick distortion, and a slow, heavy response designed for room-filling weight.",
    budget: "$2,100",
    instrument: "Guitar Rig",
    gear: ["Les Paul Style", "Orange", "4x12 Cab", "Fuzz"],
  },
  {
    title: "Touring Bass",
    subtitle:
      "A dependable heavy bass setup with punch, clarity, stage volume, and enough headroom for live use.",
    budget: "$2,400",
    instrument: "Bass Rig",
    gear: ["5-String Bass", "Active Pickups", "Bass Head", "4x10 Cab"],
    featured: true,
  },
];

export default function FeaturedBuilds() {
  return (
    <section id="builds" className="relative px-6 py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#050505,_#090909_50%,_#050505)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-zinc-500">
              Featured builds
            </p>

            <h2 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
              Start with a complete
              <span className="block text-zinc-600">heavy rig.</span>
            </h2>
          </div>

          <p className="max-w-md leading-7 text-zinc-400">
            Explore complete guitar and bass setups before building your own.
            Every build is designed around a specific budget, purpose, and heavy
            tone direction.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {builds.map((build) => (
            <BuildCard
              key={build.title}
              title={build.title}
              subtitle={build.subtitle}
              budget={build.budget}
              instrument={build.instrument}
              gear={build.gear}
              featured={build.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}