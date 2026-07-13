import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const tones = [
  {
    id: "hardcore",
    name: "Hardcore",
    description:
      "Tight low end, aggressive mids, controlled gain, and brutal rhythm clarity.",
    traits: ["Tight", "Percussive", "Aggressive"],
  },
  {
    id: "metalcore",
    name: "Metalcore",
    description:
      "Modern high gain with clear palm mutes, cutting leads, and strong definition.",
    traits: ["Modern", "Clear", "High Gain"],
  },
  {
    id: "death-metal",
    name: "Death Metal",
    description:
      "Fast attack, heavy saturation, powerful low end, and articulate riffing.",
    traits: ["Heavy", "Fast", "Saturated"],
  },
  {
    id: "thrash",
    name: "Thrash",
    description:
      "Sharp pick attack, focused mids, restrained lows, and aggressive bite.",
    traits: ["Sharp", "Dry", "Focused"],
  },
  {
    id: "doom-sludge",
    name: "Doom & Sludge",
    description:
      "Massive low end, thick distortion, slow response, and a wall of sound.",
    traits: ["Huge", "Fuzzy", "Dark"],
  },
  {
    id: "nu-metal",
    name: "Nu Metal",
    description:
      "Extended low end, punchy rhythm response, and support for lower tunings.",
    traits: ["Low Tuned", "Punchy", "Wide"],
  },
];

export default function ToneStep({
  selectedTone,
  onSelect,
  onBack,
  onContinue,
}) {
  return (
    <section className="relative min-h-screen px-6 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.09),_transparent_34%),linear-gradient(to_bottom,_#050505,_#090909,_#050505)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-black uppercase tracking-[0.35em] text-zinc-500">
            Rig Builder · Step 03
          </p>

          <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
            Choose your
            <span className="block text-zinc-600">tone.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            Choose the heavy sound you want Brutal Rig to build around.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tones.map((tone, index) => {
            const isSelected = selectedTone === tone.id;

            return (
              <motion.button
                key={tone.id}
                type="button"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelect(tone.id)}
                className={`group relative min-h-[360px] overflow-hidden rounded-[2rem] border p-7 text-left transition duration-500 ${
                  isSelected
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-white/[0.025] text-white hover:border-white/35 hover:bg-white/[0.055]"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_36%)] transition duration-500 ${
                    isSelected
                      ? "opacity-25"
                      : "opacity-40 group-hover:opacity-100"
                  }`}
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-xs font-black uppercase tracking-[0.3em] ${
                        isSelected ? "text-black/50" : "text-zinc-600"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-black/15 bg-black/5 text-black"
                          : "border-white/10 text-zinc-500"
                      }`}
                    >
                      {isSelected && <Check size={18} />}
                    </div>
                  </div>

                  <div className="mt-16">
                    <h2 className="text-3xl font-black uppercase tracking-tight">
                      {tone.name}
                    </h2>

                    <p
                      className={`mt-5 leading-7 ${
                        isSelected ? "text-black/65" : "text-zinc-400"
                      }`}
                    >
                      {tone.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {tone.traits.map((trait) => (
                        <span
                          key={trait}
                          className={`rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-wider ${
                            isSelected
                              ? "border-black/10 bg-black/5 text-black/65"
                              : "border-white/10 bg-white/[0.03] text-zinc-400"
                          }`}
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
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
            onClick={onContinue}
            disabled={!selectedTone}
            className="group flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition hover:scale-[1.02] hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
          >
            Continue
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}