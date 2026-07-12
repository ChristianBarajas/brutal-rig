export default function Navbar() {
    return (
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-xl font-black tracking-[0.28em] text-white"
          >
            BRUTAL RIG
          </a>
  
          <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#build" className="transition hover:text-white">
              Build
            </a>
  
            <a href="#gear" className="transition hover:text-white">
              Gear
            </a>
  
            <a href="#artists" className="transition hover:text-white">
              Artist Rigs
            </a>
  
            <a href="#prices" className="transition hover:text-white">
              Prices
            </a>
          </div>
  
          <button
            type="button"
            className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-zinc-200 transition hover:border-white/50 hover:bg-white hover:text-black"
          >
            Login
          </button>
        </div>
      </nav>
    );
  }