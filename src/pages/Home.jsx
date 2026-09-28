import ExploreByTone from "../components/home/ExploreByTone";
import FeaturedBuilds from "../components/home/FeaturedBuilds";
import FeaturedBrands from "../components/home/FeaturedBrands";
import Features from "../components/home/Features";
import Hero from "../components/home/Hero";
import Navbar from "../components/layout/Navbar";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />
      <Hero />
      <Features />
      <ExploreByTone />
      <FeaturedBuilds />
      <FeaturedBrands />

      <section className="relative px-5 py-28 md:px-6 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.16),_transparent_34%)]" />
        <div className="relative z-10 mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-white/[0.025] px-6 py-16 text-center md:px-14 md:py-24">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-red-400">Your next rig starts here</p>
          <h2 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
            Build heavy.
            <span className="block text-zinc-600">Buy smart.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Six focused steps. One complete, budget-checked rig. No tab-hopping required.
          </p>
          <Link
            to="/builder"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-red-500 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-red-400"
          >
            Start Building <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <img src="/brutal-rig-mark.svg" alt="" className="h-9 w-9 rounded-lg" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em]">Brutal Rig</p>
              <p className="mt-1 text-xs text-zinc-600">Built by Christian Barajas</p>
            </div>
          </div>
          <a
            href="https://github.com/ChristianBarajas/brutal-rig"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-500 transition hover:text-white"
          >
            <ArrowUpRight size={17} /> View Source
          </a>
        </div>
      </footer>
    </main>
  );
}
