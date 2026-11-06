import { ExternalLink } from "lucide-react";

export default function GearShopping({ item }) {
  const query = item.pricingSearch?.query || item.name;
  const links = [
    { label: "Compare prices", href: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}` },
    { label: "Find used listings", href: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}&LH_ItemCondition=3000` },
  ];
  return (
    <div className="mt-6 border-t border-white/10 pt-5">
      <div className="flex flex-wrap gap-3">
        {links.map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            aria-label={`${label} for ${item.name} (opens a new tab)`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-3 text-xs font-bold text-zinc-200 transition hover:border-red-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-400">
            {label}<ExternalLink size={14} aria-hidden="true" />
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-zinc-500">Check the exact model, condition, shipping, and taxes. Search results may include other variants; prices here are estimates.</p>
    </div>
  );
}
