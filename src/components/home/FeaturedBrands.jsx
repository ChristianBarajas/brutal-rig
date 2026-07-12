import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const brands = [
  {
    name: "ESP / LTD",
    category: "Guitars",
    description:
      "Modern metal guitars built around fast necks, aggressive shapes, and high-output pickups.",
  },
  {
    name: "Ibanez",
    category: "Guitars",
    description:
      "Extended-range instruments, thin necks, and versatile platforms for technical heavy music.",
  },
  {
    name: "Jackson",
    category: "Guitars",
    description:
      "Sharp designs, fast playability, and a long history across thrash, death metal, and modern metal.",
  },
  {
    name: "Schecter",
    category: "Guitars",
    description:
      "Feature-packed heavy guitars with extended scale lengths, powerful pickups, and strong value.",
  },
  {
    name: "Peavey",
    category: "Amplification",
    description:
      "Aggressive high-gain amplification known for tight low end and punishing rhythm tones.",
  },
  {
    name: "Mesa / Boogie",
    category: "Amplification",
    description:
      "Premium high-gain amps and cabinets used across metal, hardcore, and heavy touring rigs.",
  },
  {
    name: "Orange",
    category: "Amplification",
    description:
      "Thick British gain, heavy low mids, and powerful tones for doom, sludge, and aggressive rock.",
  },
  {
    name: "Darkglass",
    category: "Bass",
    description:
      "Modern bass amplification and drive built for clarity, weight, and aggressive distortion.",
  },
];

export default function FeaturedBrands() {
  return (
    <section id="brands" className="relative px-6 py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#050505,_#080808_50%,_#050505)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-zinc-500">
              Featured brands
            </p>

            <h2 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
              Build around the gear
              <span className="block text-zinc-600">you already trust.</span>
            </h2>
          </div>

          <p className="max-w-md leading-7 text-zinc-400">
            Start with your preferred guitar, bass, amp, or pickup brand and
            Brutal Rig will shape the rest of the setup around it.
          </p>
        </div>

        <div className="grid border-l border-t border-white/10 md:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand, index) => (
            <motion.article
              key={brand.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: index * 0.04,
              }}
              className="group relative min-h-80 overflow-hidden border-b border-r border-white/10 bg-white/[0.02] p-7 transition duration-500 hover:bg-white/[0.06]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.11),_transparent_36%)] opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-black uppercase tracking-[0.28em] text-zinc-600">
                    {brand.category}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition group-hover:border-white group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight size={17} />
                  </div>
                </div>

                <div className="mt-20">
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white">
                    {brand.name}
                  </h3>

                  <p className="mt-5 leading-7 text-zinc-400">
                    {brand.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}