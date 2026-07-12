import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function BuildCard({
  title,
  subtitle,
  budget,
  instrument,
  gear,
  featured = false,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-8 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_34%)] opacity-40 transition duration-500 group-hover:opacity-100" />

      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10 transition duration-700 group-hover:scale-125" />

      <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600">
                {instrument}
              </p>

              <h3 className="mt-5 text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
                {title}
              </h3>

              <p className="mt-4 max-w-xl leading-7 text-zinc-400">
                {subtitle}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition group-hover:border-white group-hover:bg-white group-hover:text-black">
              <ArrowUpRight size={18} />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {gear.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-end justify-between border-t border-white/10 pt-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-600">
              Estimated Budget
            </p>

            <p className="mt-2 text-3xl font-black text-white">{budget}</p>
          </div>

          <button
            type="button"
            className="rounded-full border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:border-white hover:bg-white hover:text-black"
          >
            View Build
          </button>
        </div>
      </div>
    </motion.article>
  );
}