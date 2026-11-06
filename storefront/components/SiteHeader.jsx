import Link from "next/link";
import { mainSiteUrl } from "../lib/mainSite.js";

const sections = [
  { label: "How It Works", href: `${mainSiteUrl}/#how-it-works` },
  { label: "Tones", href: `${mainSiteUrl}/#tones` },
  { label: "Builds", href: `${mainSiteUrl}/#builds` },
];

export default function SiteHeader() {
  return (
    <header className="site-nav">
      <div className="site-header">
        <a className="brand" href={mainSiteUrl} aria-label="Brutal Rig home">
          <img src="/brutal-rig-mark.svg" alt="" width="40" height="40" />
          <span>Brutal Rig</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link className="nav-active" href="/" aria-current="page">Search Gear</Link>
          {sections.map(({ label, href }) => <a key={label} href={href}>{label}</a>)}
        </nav>

        <div className="header-actions">
          <a className="account-link" href={`${mainSiteUrl}/?signIn=1`}>Sign In</a>
          <a className="header-cta" href={`${mainSiteUrl}/builder`}>Build a Rig</a>
          <details className="mobile-navigation">
            <summary aria-label="Toggle navigation">Menu</summary>
            <nav aria-label="Mobile navigation">
              <Link className="nav-active" href="/" aria-current="page">Search Gear</Link>
              {sections.map(({ label, href }) => <a key={label} href={href}>{label}</a>)}
              <a href={`${mainSiteUrl}/?signIn=1`}>Sign In</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
