import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  Guitar,
  Layers3,
  Music2,
  SlidersHorizontal,
} from "lucide-react";

function formatLabel(value) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ReviewStep({
  builderData,
  onBack,
  onGenerate,
}) {
  const summaryItems = [
    {
      label: "Instrument",
      value: formatLabel(builderData.instrument),
      icon: <Guitar size={20} />,
    },
    {
      label: "Budget",
      value: `$${builderData.budget.toLocaleString()}`,
      icon: <BadgeDollarSign size={20} />,
    },
    {
      label: "Tone",
      value: formatLabel(builderData.tone),
      icon: <SlidersHorizontal size={20} />,
    },
    {
      label: "Bands",
      value:
        builderData.bands.length > 0
          ? builderData.bands.join(", ")
          : "No bands selected",
      icon: <Music2 size={20} />,
    },
    {
      label: "Brands",
      value:
        builderData.brands.length > 0
          ? builderData.brands.map(formatLabel).join(", ")
          : "Let Brutal Rig choose",
      icon: <Layers3 size={20} />,
    },
  ];

  return (
    <section className="relative min-h-screen px-6 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.09),_transparent_34%),linear-gradient(to_bottom,_#050505,_#090909,_#050505)]" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-6xl"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-zinc-500">
            Rig Builder · Final Review
          </p>

          <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
            Review your
            <span className="block text-zinc-600">build profile.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            Brutal Rig will use these preferences to assemble a complete
            real-world setup that stays near your budget.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {summaryItems.map((item, index) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
              }}
              className={`rounded-3xl border border-white/10 bg-white/[0.025] p-7 ${
                item.label === "Bands" || item.label === "Brands"
                  ? "md:col-span-2"
                  : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-300">
                  {item.icon}
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-zinc-600">
                    {item.label}
                  </p>

                  <p className="mt-3 text-xl font-black uppercase leading-8 text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] p-7">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600">
            What happens next
          </p>

          <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
            Brutal Rig will select an instrument, pickups, amplification,
            cabinet, pedals, strings, cables, and accessories. The next screen
            will reveal the rig piece by piece and show the estimated total.
          </p>
        </div>

        <div className="mt-10 flex flex-col-reverse justify-between gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center gap-3 rounded-full border border-white/15 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:border-white/40 hover:bg-white/[0.05]"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            type="button"
            onClick={onGenerate}
            className="group flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition hover:scale-[1.02] hover:bg-zinc-200"
          >
            Forge My Rig

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </button>
        </div>
      </motion.div>
    </section>
  );
}