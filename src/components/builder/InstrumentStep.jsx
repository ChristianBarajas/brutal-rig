import { motion } from "framer-motion";
import { ArrowRight, Guitar } from "lucide-react";

const instruments = [
  {
    id: "guitar",
    name: "Guitar",
    description:
      "Build around pickups, tuning, scale length, amp gain, cabinets, pedals, and your preferred heavy style.",
  },
  {
    id: "bass",
    name: "Bass",
    description:
      "Build around string count, pickup style, low-end clarity, amplification, cabinets, drive, and live power.",
  },
];

export default function InstrumentStep({ selectedInstrument, onSelect }) {
  return (
    <section className="relative flex min-h-screen items-center px-6 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.09),_transparent_34%),linear-gradient(to_bottom,_#050505,_#090909,_#050505)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-zinc-500">
            Rig Builder · Step 01
          </p>

          <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
            Choose your
            <span className="block text-zinc-600">instrument.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            Start with the foundation of your rig. We’ll shape every later
            recommendation around this choice.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {instruments.map((instrument, index) => {
            const isSelected = selectedInstrument === instrument.id;

            return (
              <motion.button
                key={instrument.id}
                type="button"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelect(instrument.id)}
                className={`group relative min-h-[470px] overflow-hidden rounded-[2rem] border p-8 text-left transition duration-500 ${
                  isSelected
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-white/[0.025] text-white hover:border-white/35 hover:bg-white/[0.055]"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_35%)] transition duration-500 ${
                    isSelected ? "opacity-30" : "opacity-50 group-hover:opacity-100"
                  }`}
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
                        isSelected
                          ? "border-black/15 bg-black/5 text-black"
                          : "border-white/10 bg-white/[0.04] text-zinc-300"
                      }`}
                    >
                      <Guitar size={26} />
                    </div>

                    <span
                      className={`text-xs font-black uppercase tracking-[0.3em] ${
                        isSelected ? "text-black/50" : "text-zinc-600"
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-28">
                    <h2 className="text-5xl font-black uppercase tracking-tight">
                      {instrument.name}
                    </h2>

                    <p
                      className={`mt-6 max-w-lg leading-7 ${
                        isSelected ? "text-black/65" : "text-zinc-400"
                      }`}
                    >
                      {instrument.description}
                    </p>
                  </div>

                  <div className="mt-12 flex items-center justify-between border-t border-current/10 pt-6">
                    <span className="text-xs font-black uppercase tracking-[0.22em]">
                      {isSelected ? "Selected" : "Choose instrument"}
                    </span>

                    <ArrowRight
                      size={20}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}