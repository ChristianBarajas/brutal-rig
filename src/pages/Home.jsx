import ExploreByTone from "../components/home/ExploreByTone";
import FeaturedBuilds from "../components/home/FeaturedBuilds";
import Features from "../components/home/Features";
import Hero from "../components/home/Hero";
import Navbar from "../components/layout/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />
      <Hero />
      <Features />
      <ExploreByTone />
      <FeaturedBuilds />
    </main>
  );
}