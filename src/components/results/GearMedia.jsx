import { useState } from "react";
import { Guitar, Speaker, Cable, SlidersHorizontal } from "lucide-react";

const sharedVisuals = {
  "boss-tu-02-bass": "boss-tu-02",
  "boss-tu-3-bass": "boss-tu-3",
  "bass-instrument-cable": "guitar-instrument-cable",
  "bass-speaker-cable": "speaker-cable",
};

export default function GearMedia({ item }) {
  const [failed, setFailed] = useState(false);
  const visualId = sharedVisuals[item.id] || item.id;
  const isPhoto = visualId === "boss-sd1";
  const Icon = /Guitar|Bass/.test(item.category) ? Guitar
    : /Amplifier|Cabinet/.test(item.category) ? Speaker
      : item.category === "Cable" ? Cable : SlidersHorizontal;
  return (
    <figure className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,_#242424,_#080808_72%)]">
      {visualId && !failed ? (
        <>
          <img src={`/gear/${visualId}.webp`} alt={`${item.name} ${isPhoto ? "photo" : "illustration"}`} loading="lazy" decoding="async"
            width="512" height="512" onError={() => setFailed(true)}
            className="h-56 w-full object-contain p-5 drop-shadow-[0_14px_16px_rgba(0,0,0,0.5)]" />
          {isPhoto ? (
            <figcaption className="px-4 pb-3 text-xs text-zinc-400">
              Photo adapted from <a href="https://commons.wikimedia.org/wiki/File:Boss_SD-1_Super_Overdrive.jpg" target="_blank" rel="noopener noreferrer" className="underline">Johan Rosén / Kuriosatempel</a>
              {" · "}<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY-SA 4.0</a>
            </figcaption>
          ) : (
            <figcaption className="px-4 pb-3 text-xs text-zinc-400">
              Gear illustration · Check the exact model and finish in store listings.
            </figcaption>
          )}
        </>
      ) : (
        <div className="flex h-24 items-center justify-center gap-4 text-zinc-500">
          <Icon size={36} aria-hidden="true" />
          <span className="text-xs uppercase tracking-widest">{item.category}</span>
        </div>
      )}
    </figure>
  );
}
