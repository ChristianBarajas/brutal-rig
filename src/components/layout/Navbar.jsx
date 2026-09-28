import { useState } from "react";
import { BookMarked, ChevronDown, LogOut, Menu, UserRound, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import AuthModal from "../auth/AuthModal";

const links = [
  { name: "How it works", href: "/#how-it-works" },
  { name: "Tones", href: "/#tones" },
  { name: "Builds", href: "/#builds" },
];

export default function Navbar() {
  const { user, status, signOut } = useAuth();
  const location = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const isBuilder = location.pathname === "/builder";
  const userLabel = user?.displayName || user?.email?.split("@")[0] || "Account";

  function closeMenus() {
    setIsMobileOpen(false);
    setIsAccountOpen(false);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-6">
          <Link
            to="/"
            onClick={closeMenus}
            className="group flex select-none items-center gap-3 text-white"
            aria-label="Brutal Rig home"
          >
            <img
              src="/brutal-rig-mark.svg"
              alt=""
              className="h-10 w-10 rounded-lg ring-1 ring-white/10 transition group-hover:ring-red-500/60"
            />
            <span className="hidden text-sm font-black tracking-[0.27em] transition group-hover:text-zinc-300 sm:inline">
              BRUTAL RIG
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 transition hover:text-white"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-red-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setIsAccountOpen((current) => !current)}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] py-2 pl-2 pr-4 text-sm font-bold text-zinc-200 transition hover:border-white/25"
                  aria-expanded={isAccountOpen}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white">
                    {userLabel.charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-28 truncate">{userLabel}</span>
                  <ChevronDown size={15} className="text-zinc-500" />
                </button>

                {isAccountOpen && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-2 shadow-2xl">
                    <Link
                      to="/my-rigs"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <BookMarked size={17} />
                      My Rigs
                    </Link>
                    <button
                      type="button"
                      onClick={async () => {
                        closeMenus();
                        await signOut();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-zinc-500 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <LogOut size={17} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                disabled={status === "loading"}
                className="hidden rounded-full px-4 py-2.5 text-xs font-black uppercase tracking-wider text-zinc-400 transition hover:text-white disabled:opacity-40 md:block"
              >
                Sign In
              </button>
            )}

            <Link
              to={isBuilder ? "/my-rigs" : "/builder"}
              onClick={closeMenus}
              className="rounded-full bg-white px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black transition hover:bg-red-500 hover:text-white sm:px-6"
            >
              {isBuilder ? "My Rigs" : "Build a Rig"}
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileOpen((current) => !current)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {isMobileOpen && (
          <nav className="border-t border-white/10 bg-[#080808] px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-7xl gap-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenus}
                  className="rounded-xl px-4 py-3 text-sm font-black uppercase tracking-wider text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              {user ? (
                <>
                  <Link
                    to="/my-rigs"
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-black uppercase tracking-wider text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                  >
                    <BookMarked size={17} /> My Rigs
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      closeMenus();
                      await signOut();
                    }}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-black uppercase tracking-wider text-zinc-500 hover:bg-white/[0.04] hover:text-white"
                  >
                    <LogOut size={17} /> Sign Out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-black uppercase tracking-wider text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                >
                  <UserRound size={17} /> Sign In
                </button>
              )}
            </div>
          </nav>
        )}
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
