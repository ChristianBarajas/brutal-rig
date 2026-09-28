import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookMarked,
  Guitar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const rigItems = [
  { type: "Guitar", name: "ESP LTD EC-1000", price: "$849" },
  { type: "Amplifier", name: "Boss Katana-100 Gen 3", price: "$399" },
  { type: "Essential", name: "Tuner + cables", price: "$127" },
];

export default function Hero() {
  return (
    <section id="build" className="relative overflow-hidden px-5 pb-20 pt-32 md:px-6 md:pb-28 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,_rgba(239,68,68,0.20),_transparent_28%),radial-gradient(circle_at_20%_0%,_rgba(255,255,255,0.08),_transparent_25%),linear-gradient(to_bottom,_#050505,_#080808_72%,_#050505)]" />
      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-300">
            <Sparkles size={15} /> Built for heavy music
          </div>

          <h1 className="mt-7 text-6xl font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-7xl md:text-8xl xl:text-[7.4rem]">
            Stop guessing.
            <span className="block bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
              Build the rig.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
            Turn your budget, instrument, favorite bands, and tone into a complete
            guitar or bass setup—verified first, personalized by AI second.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/builder"
              className="group flex items-center justify-center gap-3 rounded-full bg-red-500 px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_55px_rgba(239,68,68,0.22)] transition hover:scale-[1.02] hover:bg-red-400"
            >
              Build My Rig
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>

            <a
              href="#how-it-works"
              className="flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:border-white/40 hover:bg-white/[0.05]"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-500">
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-red-400" /> Budget checked</span>
            <span className="flex items-center gap-2"><BadgeCheck size={16} className="text-red-400" /> Real gear only</span>
            <span className="flex items-center gap-2"><BookMarked size={16} className="text-red-400" /> Save every build</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-full bg-red-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d]/90 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-red-400">Generated build</p>
                <h2 className="mt-2 text-2xl font-black uppercase">Modern Hardcore</h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <Guitar size={20} />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {rigItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + index * 0.1 }}
                  className="flex items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">{item.type}</p>
                    <p className="mt-1.5 font-bold text-zinc-200">{item.name}</p>
                  </div>
                  <span className="font-black">{item.price}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Total</p>
                <p className="mt-2 text-2xl font-black">$1,375</p>
              </div>
              <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.07] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-300/70">Under budget</p>
                <p className="mt-2 text-2xl font-black text-red-300">$125</p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <Sparkles size={18} className="shrink-0 text-red-400" />
              <p className="text-sm leading-6 text-zinc-400">
                AI Rig Tech turns this verified build into a signal chain, starting settings, and upgrade plan.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-14 grid max-w-7xl grid-cols-2 border-y border-white/10 md:grid-cols-4">
        {[
          ["02", "Instruments"],
          ["06", "Tone profiles"],
          ["$400–$5K", "Budget range"],
          ["01", "Complete rig"],
        ].map(([value, label]) => (
          <div key={label} className="border-white/10 px-4 py-6 text-center even:border-l md:border-l md:first:border-l-0">
            <p className="text-2xl font-black text-white">{value}</p>
            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.22em] text-zinc-600">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
