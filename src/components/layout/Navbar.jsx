export default function Navbar() {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logo */}
          <a
            href="/"
            className="text-xl font-black tracking-[0.28em] text-white transition hover:text-zinc-300"
          >
            BRUTAL RIG
          </a>
  
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
            <a href="#build" className="transition hover:text-white">
              Build
            </a>
  
            <a href="#tones" className="transition hover:text-white">
              Tones
            </a>
  
            <a href="#gear" className="transition hover:text-white">
              Gear
            </a>
  
            <a href="#builds" className="transition hover:text-white">
              Builds
            </a>
  
            <a href="#prices" className="transition hover:text-white">
              Prices
            </a>
          </div>
  
          {/* Login Button */}
          <button
            type="button"
            className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Login
          </button>
        </div>
      </nav>
    );
  }