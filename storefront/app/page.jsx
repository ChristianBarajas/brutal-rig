import CatalogClient from "../components/CatalogClient.jsx";
import SiteHeader from "../components/SiteHeader.jsx";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />

      <section className="hero">
        <p className="hero-label">Search Gear / Brutal Rig</p>
        <h1>Curious about gear?<span>Explore the sound.</span></h1>
        <p className="hero-description">
          Find and research guitars, basses, amps, and pedals. See what makes each one different,
          then take what you learn into your next build.
        </p>
      </section>

      <CatalogClient />
      <footer>Brutal Rig · Explore the gear. Build the rig.</footer>
    </main>
  );
}
