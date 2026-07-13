import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const budgetPresets = [
  {
    value: 500,
    label: "Starter",
    description: "A practical first rig focused on value and essential gear.",
  },
  {
    value: 1000,
    label: "Serious",
    description: "Stronger instruments and amplification with room to upgrade.",
  },
  {
    value: 1500,
    label: "Stage Ready",
    description: "A balanced rig designed for rehearsals, recording, and shows.",
  },
  {
    value: 2500,
    label: "Professional",
    description: "Premium gear with fewer compromises and stronger long-term value.",
  },
];

export default function BudgetStep({
  budget,
  onBudgetChange,
  onBack,
  onContinue,
}) {
  const selectedPreset = budgetPresets.find(
    (preset) => preset.value === Number(budget),
  );

  return (
    <section className="relative flex min-h-screen items-center px-6 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.09),_transparent_34%),linear-gradient(to_bottom,_#050505,_#090909,_#050505)]" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-zinc-500">
            Rig Builder · Step 02
          </p>

          <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
            Set your
            <span className="block text-zinc-600">budget.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            Brutal Rig will keep the complete setup near this total, including
            the instrument, amplification, pedals, and essential accessories.
          </p>
        </div>

        <div className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.025] p-8 md:p-12">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
              Total rig budget
            </p>

            <div className="mt-4 text-6xl font-black tracking-tight text-white md:text-8xl">
              ${Number(budget).toLocaleString()}
            </div>

            <p className="mt-4 text-zinc-400">
              {selectedPreset?.label ?? "Custom Budget"}
            </p>
          </div>

          <div className="mt-12">
            <input
              type="range"
              min="400"
              max="5000"
              step="100"
              value={budget}
              onChange={(event) => onBudgetChange(Number(event.target.value))}
              aria-label="Rig budget"
              className="w-full cursor-pointer accent-white"
            />

            <div className="mt-4 flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-600">
              <span>$400</span>
              <span>$5,000</span>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {budgetPresets.map((preset) => {
              const isSelected = Number(budget) === preset.value;

              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => onBudgetChange(preset.value)}
                  className={`rounded-2xl border p-5 text-left transition duration-300 ${
                    isSelected
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-black/20 text-white hover:border-white/35 hover:bg-white/[0.05]"
                  }`}
                >
                  <p
                    className={`text-xs font-black uppercase tracking-[0.25em] ${
                      isSelected ? "text-black/50" : "text-zinc-600"
                    }`}
                  >
                    ${preset.value.toLocaleString()}
                  </p>

                  <h2 className="mt-4 text-xl font-black uppercase">
                    {preset.label}
                  </h2>

                  <p
                    className={`mt-3 text-sm leading-6 ${
                      isSelected ? "text-black/65" : "text-zinc-400"
                    }`}
                  >
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse justify-between gap-4 sm:flex-row">
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
            className="group flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition hover:scale-[1.02] hover:bg-zinc-200"
          >
            Continue
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