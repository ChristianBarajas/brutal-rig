import { useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  LoaderCircle,
  Route,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Wrench,
} from "lucide-react";
import { requestRigTechAdvice } from "../../services/rigTech";

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
        <Icon size={17} />
      </div>
      <h3 className="text-xs font-black uppercase tracking-[0.24em] text-zinc-300">
        {children}
      </h3>
    </div>
  );
}

export default function RigTechPanel({ rig }) {
  const [status, setStatus] = useState("idle");
  const [advice, setAdvice] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleAnalyzeRig() {
    setStatus("loading");
    setErrorMessage("");

    try {
      const nextAdvice = await requestRigTechAdvice(rig);
      setAdvice(nextAdvice);
      setStatus("success");
    } catch (error) {
      setAdvice(null);
      setErrorMessage(
        error.message ??
          "Rig Tech could not analyze this build right now.",
      );
      setStatus("error");
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]"
    >
      <div className="grid gap-8 border-b border-white/10 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
        <div>
          <div className="flex items-center gap-3">
            <BrainCircuit size={21} />
            <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
              AI Rig Tech
            </p>
          </div>

          <h2 className="mt-5 text-3xl font-black uppercase text-white md:text-4xl">
            Turn the gear list into a tone plan.
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
            The recommendation engine already handled the real gear,
            compatibility, and budget. Rig Tech adds a personalized signal
            chain, practical starting settings, setup notes, and an upgrade
            path for this exact build.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAnalyzeRig}
          disabled={status === "loading"}
          className="flex min-w-56 items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-zinc-200 disabled:cursor-wait disabled:bg-zinc-300"
        >
          {status === "loading" ? (
            <LoaderCircle className="animate-spin" size={17} />
          ) : status === "success" ? (
            <RotateCcw size={17} />
          ) : (
            <Sparkles size={17} />
          )}

          {status === "loading"
            ? "Analyzing Rig"
            : status === "success"
              ? "Generate Again"
              : "Generate Tone Plan"}
        </button>
      </div>

      {status === "idle" && (
        <div className="p-7 text-sm leading-6 text-zinc-500 md:p-9">
          AI analysis runs only when you request it, keeping the core rig
          builder fast and predictable.
        </div>
      )}

      {status === "loading" && (
        <div
          className="flex items-center gap-4 p-7 text-sm text-zinc-400 md:p-9"
          role="status"
        >
          <LoaderCircle className="animate-spin" size={20} />
          Mapping your signal chain and starting settings…
        </div>
      )}

      {status === "error" && (
        <div className="p-7 md:p-9" role="alert">
          <p className="font-bold text-white">
            Rig Tech is temporarily unavailable.
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
            {errorMessage} Your verified gear recommendation is still complete
            and unchanged.
          </p>
        </div>
      )}

      {status === "success" && advice && (
        <div className="space-y-9 p-7 md:p-9">
          <div>
            <p className="max-w-4xl text-lg leading-8 text-zinc-300">
              {advice.toneSummary}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <SectionTitle icon={Route}>Signal Chain</SectionTitle>
              <ol className="mt-5 space-y-3">
                {advice.signalChain.map((step, index) => (
                  <li
                    key={`${step}-${index}`}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-zinc-400"
                  >
                    <span className="font-black text-zinc-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <SectionTitle icon={SlidersHorizontal}>
                Starting Settings
              </SectionTitle>
              <div className="mt-5 space-y-3">
                {advice.startingSettings.map((setting) => (
                  <div
                    key={`${setting.gear}-${setting.control}`}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <p className="font-bold text-white">
                        {setting.gear} · {setting.control}
                      </p>
                      <p className="text-sm font-black uppercase tracking-wider text-zinc-400">
                        {setting.value}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {setting.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-9 lg:grid-cols-2">
            <div>
              <SectionTitle icon={Wrench}>Setup Notes</SectionTitle>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-400">
                {advice.setupNotes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">
                Next Upgrade Priority
              </p>
              <p className="mt-3 text-xl font-black uppercase text-white">
                {advice.upgradePath.priority}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {advice.upgradePath.reason}
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                {advice.upgradePath.budgetGuidance}
              </p>
            </div>
          </div>

          <p className="border-t border-white/10 pt-6 text-xs leading-5 text-zinc-600">
            {advice.startingPointNote}
          </p>
        </div>
      )}
    </motion.section>
  );
}
