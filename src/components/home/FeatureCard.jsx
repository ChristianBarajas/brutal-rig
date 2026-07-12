import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, text }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className="group rounded-3xl border border-white/10 bg-white/[0.025] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition hover:border-white/35 hover:bg-white/[0.055] hover:shadow-[0_0_60px_rgba(255,255,255,0.08)]"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-200 transition group-hover:border-white/30 group-hover:bg-white/[0.08]">
        {icon}
      </div>

      <h3 className="text-xl font-black uppercase tracking-wide text-white">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-zinc-400">{text}</p>
    </motion.article>
  );
}