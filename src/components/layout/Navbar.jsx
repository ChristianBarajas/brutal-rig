import { Link } from "react-router-dom";

export default function Navbar() {
    const links = [
      { name: "Build", href: "#build" },
      { name: "Features", href: "#gear" },
      { name: "Tones", href: "#tones" },
      { name: "Builds", href: "#builds" },
      { name: "Brands", href: "#brands" },
    ];
  
    return (
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
  
          {/* Logo */}
          <Link
            to="/"
            className="select-none text-xl font-black tracking-[0.35em] text-white transition duration-300 hover:text-zinc-300"
          >
            BRUTAL RIG
          </Link>
  
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 lg:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={`/${link.href}`}
                className="group relative text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 transition duration-300 hover:text-white"
              >
                {link.name}
  
                <span className="absolute -bottom-2 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
  
          {/* Right Side */}
          <div className="flex items-center gap-3">
  
            <Link
              to="/builder"
              className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-zinc-300 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Build a Rig
            </Link>
  
          </div>
        </div>
      </header>
    );
  }
