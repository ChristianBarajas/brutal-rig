import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeDollarSign,
  Check,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export default function RigResults({
  rig,
  onStartOver,
  onEditPreferences,
}) {
  return (
    <section className="relative min-h-screen px-6 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1),_transparent_32%),linear-gradient(to_bottom,_#050505,_#090909,_#050505)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <p className="text-xs font-black uppercase tracking-[0.35em] text-zinc-500">
            Your completed setup
          </p>

          <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
            Your brutal
            <span className="block text-zinc-600">
              rig is ready.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            Built around your instrument, budget, tone,
            favorite bands, and preferred brands.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {rig.builderData.bands.map((band) => (
              <span
                key={band}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-400"
              >
                {band}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mt-16 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            {rig.items.map((item, index) => {
              const recommendation =
                item.recommendation;

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="group rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition hover:border-white/30 hover:bg-white/[0.05]"
                >
                  <div className="flex flex-col justify-between gap-6 md:flex-row">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600">
                          {item.category}
                        </p>

                        {recommendation?.total > 0 && (
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                            Match score{" "}
                            {recommendation.total}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-3 text-2xl font-black uppercase text-white md:text-3xl">
                        {item.name}
                      </h2>

                      <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
                        {item.description}
                      </p>

                      {recommendation?.reasons?.length >
                        0 && (
                        <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
                          <div className="flex items-center gap-2">
                            <Sparkles
                              size={16}
                              className="text-white"
                            />

                            <p className="text-xs font-black uppercase tracking-[0.25em] text-white">
                              Why this fits
                            </p>
                          </div>

                          <ul className="mt-4 space-y-3">
                            {recommendation.reasons.map(
                              (reason) => (
                                <li
                                  key={reason}
                                  className="flex gap-3 text-sm leading-6 text-zinc-400"
                                >
                                  <Check
                                    size={15}
                                    className="mt-1 shrink-0 text-zinc-500"
                                  />

                                  <span>{reason}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 md:text-right">
                      <p className="text-2xl font-black text-white">
                        ${item.price.toLocaleString()}
                      </p>

                      <p className="mt-2 text-xs font-bold uppercase tracking-wider text-zinc-600">
                        Estimated price
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
            className="h-fit rounded-3xl border border-white/10 bg-white/[0.035] p-7 lg:sticky lg:top-28"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white">
              <BadgeDollarSign size={22} />
            </div>

            <p className="mt-7 text-xs font-black uppercase tracking-[0.3em] text-zinc-600">
              Estimated Total
            </p>

            <p className="mt-3 text-5xl font-black text-white">
              ${rig.totalPrice.toLocaleString()}
            </p>

            <div className="mt-7 border-t border-white/10 pt-6">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-500">
                  Target budget
                </span>

                <span className="font-bold text-white">
                  $
                  {rig.builderData.budget.toLocaleString()}
                </span>
              </div>

              <div className="mt-4 flex justify-between gap-4 text-sm">
                <span className="text-zinc-500">
                  {rig.remainingBudget >= 0
                    ? "Remaining"
                    : "Over budget"}
                </span>

                <span
                  className={`font-bold ${
                    rig.remainingBudget >= 0
                      ? "text-white"
                      : "text-zinc-400"
                  }`}
                >
                  $
                  {Math.abs(
                    rig.remainingBudget,
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            {rig.isOverBudget && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm leading-6 text-zinc-400">
                  The least expensive complete core rig
                  exceeds your selected budget. Used pricing
                  support will improve this recommendation
                  later.
                </p>
              </div>
            )}

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={onEditPreferences}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-zinc-200"
              >
                <ArrowLeft size={17} />
                Edit Preferences
              </button>

              <button
                type="button"
                onClick={onStartOver}
                className="flex w-full items-center justify-center gap-3 rounded-full border border-white/15 px-6 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:border-white/40 hover:bg-white/[0.05]"
              >
                <RefreshCw size={17} />
                Start Over
              </button>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}