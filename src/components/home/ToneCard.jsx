import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ToneCard({
  title,
  description,
  characteristics,
  number,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -8 }}
      className="group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0c0c] p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_34%)] opacity-40 transition duration-500 group-hover:opacity-100" />

      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10 transition duration-700 group-hover:scale-125" />

      <div className="absolute -right-6 top-10 h-32 w-32 rounded-full border border-white/5 transition duration-700 group-hover:scale-110" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <span className="text-xs font-black tracking-[0.3em] text-zinc-600">
              {number}
            </span>

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition group-hover:border-white group-hover:bg-white group-hover:text-black">
              <ArrowUpRight size={18} />
            </div>
          </div>

          <h3 className="mt-20 text-4xl font-black uppercase tracking-tight text-white">
            {title}
          </h3>

          <p className="mt-5 max-w-sm leading-7 text-zinc-400">
            {description}
          </p>
        </div>

        <div className="mt-14 flex flex-wrap gap-2">
          {characteristics.map((characteristic) => (
            <span
              key={characteristic}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400"
            >
              {characteristic}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}