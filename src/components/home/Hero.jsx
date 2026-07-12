import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="build"
      className="relative flex min-h-screen items-center justify-center px-6 pt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_34%),linear-gradient(to_bottom,_rgba(255,255,255,0.04),_#050505_72%)]" />

      <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 blur-sm" />

      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 blur-md" />

      <motion.div
        initial={{ opacity: 0, y: 42 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <Sparkles size={16} />
          Premium rigs for heavy music
        </div>

        <h1 className="text-6xl font-black uppercase leading-none tracking-tight md:text-8xl lg:text-9xl">
          Build Your

          <span className="block bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
            Brutal Rig
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
          Find real guitar and bass gear based on your budget, favorite bands,
          pickups, brands, and the heavy tone you’re chasing.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black shadow-[0_0_55px_rgba(255,255,255,0.18)] transition hover:scale-[1.02] hover:bg-zinc-200"
          >
            Build My Rig

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </button>

          <button
            type="button"
            className="rounded-full border border-white/15 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:border-white/45 hover:bg-white/[0.06]"
          >
            Explore Builds
          </button>
        </div>
      </motion.div>
    </section>
  );
}