import Link from "next/link";

export default function GearNotFound() {
  return (
    <main className="not-found-shell">
      <p className="eyebrow">404 / Gear not found</p>
      <h1>That item is not in the catalog.</h1>
      <p>The URL may be old, or the item may have been removed.</p>
      <Link className="back-link" href="/">Back to Search Gear</Link>
    </main>
  );
}
