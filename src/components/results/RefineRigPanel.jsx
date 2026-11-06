import { useState } from "react";
import { ArrowRight, LoaderCircle, Sparkles, WandSparkles } from "lucide-react";
import { requestRigRefinement } from "../../services/refineRig";
import { generateRig } from "../../utils/generateRig";

const examples = [
  "Make it more hardcore and keep the complete rig under $1,200.",
  "Prioritize used gear and make it feel closer to Knocked Loose.",
];

const labels = {
  instrument: "Instrument",
  budget: "Budget cap",
  tone: "Tone",
  bands: "Bands",
  brands: "Brands",
  shoppingPreference: "Shopping",
};

function display(key, value) {
  if (key === "budget") return `$${value.toLocaleString()}`;
  if (Array.isArray(value)) return value.length ? value.join(", ") : "None selected";
  return value.replaceAll("-", " ");
}

export default function RefineRigPanel({ rig, onApply }) {
  const [request, setRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setPreview(null);

    try {
      const proposal = await requestRigRefinement(rig.builderData, request.trim());
      const changes = Object.keys(labels).filter((key) =>
        JSON.stringify(proposal.preferences[key]) !== JSON.stringify(rig.builderData[key]),
      );
      const nextRig = changes.length ? generateRig(proposal.preferences) : null;
      if (nextRig?.isOverBudget) {
        throw new Error("No complete rig fits that budget and preference mix. Try a higher cap or used gear.");
      }
      setPreview({ proposal, changes, nextRig });
    } catch (caughtError) {
      setError(caughtError.message ?? "Could not preview this refinement.");
    } finally {
      setLoading(false);
    }
  }

  const removed = preview?.nextRig
    ? rig.items.filter((item) => !preview.nextRig.items.some((next) => next.id === item.id))
    : [];
  const added = preview?.nextRig
    ? preview.nextRig.items.filter((item) => !rig.items.some((old) => old.id === item.id))
    : [];

  return (
    <section className="mt-14 overflow-hidden rounded-3xl border border-white/15 bg-[radial-gradient(circle_at_top_right,_#252525,_#101010_62%)] p-6 md:p-9" aria-labelledby="refine-title">
      <div className="flex items-center gap-3 text-zinc-300">
        <WandSparkles size={20} aria-hidden="true" />
        <span className="text-xs font-black uppercase tracking-[0.26em]">AI + verified builder</span>
      </div>
      <h2 id="refine-title" className="mt-5 text-3xl font-black uppercase text-white md:text-4xl">Refine my rig.</h2>
      <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
        Tell us what you want to change. Preview the exact builder choices and gear before you apply them.
      </p>

      <form onSubmit={handleSubmit} className="mt-7">
        <label htmlFor="refine-request" className="text-xs font-black uppercase tracking-widest text-zinc-300">Your request</label>
        <textarea
          id="refine-request"
          value={request}
          maxLength={500}
          minLength={8}
          required
          rows={3}
          onChange={(event) => { setRequest(event.target.value); setPreview(null); setError(""); }}
          placeholder="I want a tighter hardcore sound and a complete rig under $1,200…"
          className="mt-3 w-full resize-y rounded-2xl border border-white/15 bg-black/40 p-5 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/50"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {examples.map((example) => (
            <button key={example} type="button" onClick={() => { setRequest(example); setPreview(null); setError(""); }} className="rounded-full border border-white/10 px-4 py-2 text-left text-xs text-zinc-400 transition hover:border-white/30 hover:text-white">
              {example}
            </button>
          ))}
        </div>
        <button type="submit" disabled={loading || request.trim().length < 8} className="mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? <LoaderCircle className="animate-spin" size={17} /> : <Sparkles size={17} />}
          {loading ? "Interpreting" : "Preview Changes"}
        </button>
      </form>

      {error && <p className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-200" role="alert">{error}</p>}

      {preview && (
        <div className="mt-8 border-t border-white/10 pt-7" aria-live="polite">
          <h3 className="text-sm font-black uppercase tracking-widest text-white">Proposed changes</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{preview.proposal.explanation}</p>
          {preview.changes.length ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {preview.changes.map((key) => (
                <div key={key} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-500">{labels[key]}</p>
                  <p className="mt-2 text-sm text-zinc-400">{display(key, rig.builderData[key])} <ArrowRight className="mx-1 inline" size={14} aria-hidden="true" /> <span className="font-bold text-white">{display(key, preview.proposal.preferences[key])}</span></p>
                </div>
              ))}
            </div>
          ) : <p className="mt-4 text-sm text-zinc-400">No supported builder choices changed.</p>}

          {preview.proposal.unhandled.length > 0 && (
            <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 text-sm text-amber-100">
              <p className="font-black uppercase tracking-wider">Not verified by this builder</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {preview.proposal.unhandled.map((note, index) => <li key={`${index}-${note}`}>{note}</li>)}
              </ul>
            </div>
          )}

          {preview.nextRig && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Verified catalog preview</p>
              <p className="mt-2 text-2xl font-black text-white">${preview.nextRig.totalPrice.toLocaleString()} <span className="text-sm font-normal text-zinc-400">of ${preview.nextRig.builderData.budget.toLocaleString()} max</span></p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {added.length ? `Added: ${added.map((item) => item.name).join(", ")}. ` : ""}
                {removed.length ? `Replaced: ${removed.map((item) => item.name).join(", ")}.` : ""}
                {!added.length && !removed.length ? "The gear list stays the same with these preferences." : ""}
              </p>
              <button type="button" onClick={() => onApply(preview.proposal.preferences, preview.nextRig)} className="mt-5 inline-flex items-center gap-3 rounded-full bg-red-500 px-7 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:bg-red-400">
                Apply This Rig <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
