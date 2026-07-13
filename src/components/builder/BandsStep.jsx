import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Search, X } from "lucide-react";

const bands = [
  "Knocked Loose",
  "Kublai Khan TX",
  "Deftones",
  "Metallica",
  "Slayer",
  "Lamb of God",
  "Counterparts",
  "Jesus Piece",
  "Slipknot",
  "Loathe",
  "Turnstile",
  "Meshuggah",
  "Pantera",
  "Gojira",
  "Architects",
  "Bring Me The Horizon",
  "Dying Fetus",
  "Cannibal Corpse",
  "Sunami",
  "Drain",
  "Code Orange",
  "Hatebreed",
  "Trivium",
  "Spiritbox",
];

export default function BandsStep({
  selectedBands,
  onToggleBand,
  onBack,
  onContinue,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBands = useMemo(() => {
    return bands.filter((band) =>
      band.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    );
  }, [searchTerm]);

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
            Rig Builder · Step 04
          </p>

          <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
            Choose your
            <span className="block text-zinc-600">influences.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            Select up to five bands. Brutal Rig will use them to shape the
            pickup response, tuning direction, gain character, and overall feel
            of your setup.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search bands..."
              className="w-full rounded-full border border-white/10 bg-white/[0.035] py-4 pl-14 pr-14 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/35"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear band search"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="mt-6 flex min-h-12 flex-wrap gap-2">
            {selectedBands.length === 0 ? (
              <p className="text-sm text-zinc-600">
                No bands selected yet.
              </p>
            ) : (
              selectedBands.map((band) => (
                <button
                  key={band}
                  type="button"
                  onClick={() => onToggleBand(band)}
                  className="flex items-center gap-2 rounded-full border border-white bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-black"
                >
                  {band}
                  <X size={14} />
                </button>
              ))
            )}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBands.map((band, index) => {
              const isSelected = selectedBands.includes(band);
              const limitReached = selectedBands.length >= 5 && !isSelected;

              return (
                <motion.button
                  key={band}
                  type="button"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.025 }}
                  whileHover={limitReached ? undefined : { y: -3 }}
                  onClick={() => {
                    if (!limitReached) {
                      onToggleBand(band);
                    }
                  }}
                  disabled={limitReached}
                  className={`flex min-h-20 items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
                    isSelected
                      ? "border-white bg-white text-black"
                      : limitReached
                        ? "cursor-not-allowed border-white/5 bg-white/[0.01] text-zinc-700"
                        : "border-white/10 bg-white/[0.025] text-white hover:border-white/35 hover:bg-white/[0.055]"
                  }`}
                >
                  <span className="font-black uppercase tracking-wide">
                    {band}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                      isSelected
                        ? "border-black/15 bg-black/5"
                        : "border-white/10"
                    }`}
                  >
                    {isSelected && <Check size={16} />}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {filteredBands.length === 0 && (
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-10 text-center">
              <p className="font-black uppercase tracking-wider text-white">
                No matching bands
              </p>

              <p className="mt-3 text-zinc-500">
                We’ll add custom artist entry and Spotify integration later.
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-between text-xs font-black uppercase tracking-[0.22em] text-zinc-600">
            <span>{selectedBands.length} selected</span>
            <span>Maximum 5</span>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col-reverse justify-between gap-4 sm:flex-row">
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
            disabled={selectedBands.length === 0}
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