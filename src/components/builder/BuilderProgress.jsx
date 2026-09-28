import { Check } from "lucide-react";

const labels = ["Instrument", "Budget", "Tone", "Bands", "Brands", "Review"];

export default function BuilderProgress({ currentStep }) {
  const progressStep = Math.min(currentStep, 6);
  const progress = currentStep === 7 ? 100 : ((progressStep - 1) / 5) * 100;

  return (
    <div className="fixed inset-x-0 top-20 z-40 border-b border-white/10 bg-[#080808]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 py-3 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-red-400">
              {currentStep === 7 ? "Complete" : `Step ${String(currentStep).padStart(2, "0")} of 06`}
            </span>
            <span className="hidden text-xs font-bold text-zinc-500 sm:inline">
              {currentStep === 7 ? "Your rig is ready" : labels[progressStep - 1]}
            </span>
          </div>
          <span className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600 md:flex">
            <Check size={13} /> Draft saved on this device
          </span>
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-orange-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

