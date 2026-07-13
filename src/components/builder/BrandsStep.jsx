import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const brands = [
  { id: "esp-ltd", name: "ESP / LTD", category: "Guitars" },
  { id: "ibanez", name: "Ibanez", category: "Guitars" },
  { id: "jackson", name: "Jackson", category: "Guitars" },
  { id: "schecter", name: "Schecter", category: "Guitars" },
  { id: "fender", name: "Fender", category: "Guitars & Bass" },
  { id: "music-man", name: "Music Man", category: "Guitars & Bass" },
  { id: "peavey", name: "Peavey", category: "Amplification" },
  { id: "mesa-boogie", name: "Mesa / Boogie", category: "Amplification" },
  { id: "orange", name: "Orange", category: "Amplification" },
  { id: "marshall", name: "Marshall", category: "Amplification" },
  { id: "darkglass", name: "Darkglass", category: "Bass" },
  { id: "ampeg", name: "Ampeg", category: "Bass" },
];

export default function BrandsStep({
  selectedBrands,
  onToggleBrand,
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
            Rig Builder · Step 05
          </p>

          <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
            Choose your
            <span className="block text-zinc-600">brands.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            Pick up to four brands you already trust. You can also skip this
            step and let Brutal Rig choose the strongest options for your budget.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand, index) => {
            const isSelected = selectedBrands.includes(brand.id);
            const limitReached = selectedBrands.length >= 4 && !isSelected;

            return (
              <motion.button
                key={brand.id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={limitReached ? undefined : { y: -4 }}
                whileTap={limitReached ? undefined : { scale: 0.99 }}
                disabled={limitReached}
                onClick={() => {
                  if (!limitReached) {
                    onToggleBrand(brand.id);
                  }
                }}
                className={`group flex min-h-36 items-center justify-between rounded-3xl border p-6 text-left transition duration-300 ${
                  isSelected
                    ? "border-white bg-white text-black"
                    : limitReached
                      ? "cursor-not-allowed border-white/5 bg-white/[0.01] text-zinc-700"
                      : "border-white/10 bg-white/[0.025] text-white hover:border-white/35 hover:bg-white/[0.055]"
                }`}
              >
                <div>
                  <p
                    className={`text-xs font-black uppercase tracking-[0.28em] ${
                      isSelected ? "text-black/45" : "text-zinc-600"
                    }`}
                  >
                    {brand.category}
                  </p>

                  <h2 className="mt-4 text-2xl font-black uppercase tracking-tight">
                    {brand.name}
                  </h2>
                </div>

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-black/15 bg-black/5"
                      : "border-white/10"
                  }`}
                >
                  {isSelected && <Check size={18} />}
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-7 flex justify-between text-xs font-black uppercase tracking-[0.22em] text-zinc-600">
          <span>{selectedBrands.length} selected</span>
          <span>Optional · Maximum 4</span>
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
            className="group flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition hover:scale-[1.02] hover:bg-zinc-200"
          >
            {selectedBrands.length > 0 ? "Continue" : "Skip & Continue"}

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