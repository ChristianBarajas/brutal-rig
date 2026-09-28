import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookMarked,
  LoaderCircle,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import AuthModal from "../components/auth/AuthModal";
import Navbar from "../components/layout/Navbar";
import {
  deleteSavedRig,
  renameSavedRig,
  subscribeToSavedRigs,
} from "../services/savedRigs";

function formatDate(timestamp) {
  if (!timestamp) {
    return "Saved just now";
  }

  const date = typeof timestamp.toDate === "function" ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatLabel(value = "") {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function MyRigs() {
  const { user, db, status } = useAuth();
  const [rigs, setRigs] = useState([]);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [loadedUserId, setLoadedUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [editingRigId, setEditingRigId] = useState(null);
  const [nextName, setNextName] = useState("");
  const [deletingRig, setDeletingRig] = useState(null);

  useEffect(() => {
    if (!user || !db) {
      return undefined;
    }

    const unsubscribe = subscribeToSavedRigs({
      db,
      userId: user.uid,
      onChange: (nextRigs) => {
        setRigs(nextRigs);
        setLoadedUserId(user.uid);
        setLoadStatus("success");
      },
      onError: (error) => {
        setErrorMessage(error.message);
        setLoadStatus("error");
      },
    });

    return unsubscribe;
  }, [db, user]);

  async function handleRename(event, rigId) {
    event.preventDefault();
    setErrorMessage("");

    try {
      await renameSavedRig({ db, userId: user.uid, rigId, name: nextName });
      setEditingRigId(null);
      setNextName("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleDelete() {
    if (!deletingRig) {
      return;
    }

    setErrorMessage("");

    try {
      await deleteSavedRig({ db, userId: user.uid, rigId: deletingRig.id });
      setDeletingRig(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <section className="relative min-h-screen overflow-hidden px-5 pb-24 pt-32 md:px-6 md:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_0%,_rgba(239,68,68,0.14),_transparent_28%),linear-gradient(to_bottom,_#050505,_#090909_55%,_#050505)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-red-400">
                Your collection
              </p>
              <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
                My saved
                <span className="block text-zinc-600">rigs.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                Revisit every verified gear list and AI tone plan you decided to keep.
              </p>
            </div>

            {user && (
              <Link
                to="/builder"
                className="flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-red-500 hover:text-white"
              >
                <Plus size={18} /> New Rig
              </Link>
            )}
          </div>

          {status === "loading" ||
          (user && (loadStatus === "loading" || loadedUserId !== user.uid)) ? (
            <div className="flex min-h-80 items-center justify-center">
              <LoaderCircle className="animate-spin text-zinc-500" size={30} />
            </div>
          ) : !user ? (
            <div className="mt-14 rounded-[2rem] border border-white/10 bg-white/[0.025] p-8 md:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/10 text-red-400">
                <BookMarked size={25} />
              </div>
              <h2 className="mt-7 text-3xl font-black uppercase">Sign in to see your rigs.</h2>
              <p className="mt-4 max-w-xl leading-7 text-zinc-400">
                Building a rig stays free and open. An account is only needed to save results across devices.
              </p>
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="mt-8 rounded-full bg-red-500 px-7 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:bg-red-400"
              >
                Sign In or Create Account
              </button>
            </div>
          ) : rigs.length === 0 ? (
            <div className="mt-14 rounded-[2rem] border border-dashed border-white/15 bg-white/[0.02] p-10 text-center md:p-16">
              <BookMarked className="mx-auto text-zinc-700" size={34} />
              <h2 className="mt-6 text-2xl font-black uppercase">No saved rigs yet.</h2>
              <p className="mx-auto mt-3 max-w-md leading-7 text-zinc-500">
                Complete the six-step builder, then save the result from the rig summary.
              </p>
              <Link
                to="/builder"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-red-500 hover:text-white"
              >
                Build My First Rig <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {rigs.map((savedRig, index) => (
                <motion.article
                  key={savedRig.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-6 transition hover:border-red-500/35"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-500">
                        {formatLabel(savedRig.instrument)}
                      </span>
                      <span className="rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-red-300">
                        {formatLabel(savedRig.tone)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingRigId(savedRig.id);
                          setNextName(savedRig.name);
                        }}
                        aria-label={`Rename ${savedRig.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingRig(savedRig)}
                        aria-label={`Delete ${savedRig.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {editingRigId === savedRig.id ? (
                    <form onSubmit={(event) => handleRename(event, savedRig.id)} className="mt-8">
                      <input
                        autoFocus
                        value={nextName}
                        maxLength={80}
                        onChange={(event) => setNextName(event.target.value)}
                        className="w-full rounded-xl border border-red-500/40 bg-black/40 px-4 py-3 font-black uppercase text-white outline-none"
                      />
                      <div className="mt-3 flex gap-2">
                        <button type="submit" className="rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-wider text-black">
                          Save Name
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingRigId(null)}
                          className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-zinc-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <h2 className="mt-8 text-3xl font-black uppercase leading-tight">{savedRig.name}</h2>
                  )}

                  <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Total</p>
                      <p className="mt-2 text-xl font-black">${Number(savedRig.totalPrice).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Saved</p>
                      <p className="mt-2 text-sm font-bold text-zinc-300">{formatDate(savedRig.createdAt)}</p>
                    </div>
                  </div>

                  <Link
                    to={`/my-rigs/${savedRig.id}`}
                    className="mt-7 flex items-center justify-between rounded-full border border-white/10 px-5 py-3.5 text-xs font-black uppercase tracking-wider text-zinc-300 transition hover:border-white hover:bg-white hover:text-black"
                  >
                    Open Rig <ArrowRight size={16} />
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {errorMessage && (
            <p className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
      </section>

      {deletingRig && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl">
          <div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-8">
            <button
              type="button"
              onClick={() => setDeletingRig(null)}
              aria-label="Cancel delete"
              className="absolute right-5 top-5 text-zinc-600 hover:text-white"
            >
              <X size={20} />
            </button>
            <Trash2 className="text-red-400" size={26} />
            <h2 className="mt-6 text-2xl font-black uppercase">Delete this rig?</h2>
            <p className="mt-3 leading-7 text-zinc-400">
              {deletingRig.name} and its saved tone plan will be permanently removed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-full bg-red-500 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-red-400"
              >
                Delete Rig
              </button>
              <button
                type="button"
                onClick={() => setDeletingRig(null)}
                className="rounded-full border border-white/15 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white"
              >
                Keep It
              </button>
            </div>
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </main>
  );
}
