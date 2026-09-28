import { useEffect, useState } from "react";
import { LoaderCircle, LockKeyhole, Mail, UserRound, X } from "lucide-react";
import { useAuth } from "../../auth/useAuth";

function getFriendlyError(error) {
  const messages = {
    "auth/email-already-in-use": "An account already exists for that email.",
    "auth/invalid-credential": "That email or password is incorrect.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/popup-closed-by-user": "Google sign-in was closed before it finished.",
    "auth/weak-password": "Use a password with at least six characters.",
    "auth/operation-not-allowed":
      "This sign-in method still needs to be enabled in Firebase Authentication.",
  };

  return messages[error?.code] ?? error?.message ?? "Sign-in failed. Try again.";
}

export default function AuthModal({ isOpen, onClose, onAuthenticated }) {
  const {
    status,
    configurationError,
    signInWithGoogle,
    signInWithEmail,
    createAccount,
  } = useAuth();
  const [mode, setMode] = useState("sign-in");
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  async function runAuthentication(action) {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const credential = await action();
      setSubmitStatus("success");
      setErrorMessage("");
      await onAuthenticated?.(credential?.user ?? null);
      onClose();
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(getFriendlyError(error));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (mode === "create") {
      runAuthentication(() => createAccount(formData));
      return;
    }

    runAuthentication(() =>
      signInWithEmail(formData.email.trim(), formData.password),
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-7 shadow-2xl md:p-9">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close sign-in"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition hover:border-white/30 hover:text-white"
        >
          <X size={18} />
        </button>

        <img src="/brutal-rig-mark.svg" alt="" className="h-12 w-12 rounded-xl" />

        <p className="mt-7 text-xs font-black uppercase tracking-[0.28em] text-red-400">
          Brutal Rig account
        </p>
        <h2 id="auth-title" className="mt-3 text-3xl font-black uppercase text-white">
          {mode === "sign-in" ? "Welcome back." : "Save your builds."}
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {mode === "sign-in"
            ? "Sign in to access every rig you have saved."
            : "Create an account to keep your generated rigs and tone plans."}
        </p>

        {status === "unavailable" ? (
          <div className="mt-7 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
            <p className="font-bold text-amber-200">Account setup is not connected locally.</p>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              {configurationError} Add the Firebase web configuration to a local
              .env file. The deployed site reads it automatically from Firebase Hosting.
            </p>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => runAuthentication(signInWithGoogle)}
              disabled={submitStatus === "loading" || status !== "ready"}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white px-5 py-3.5 text-sm font-black uppercase tracking-wider text-black transition hover:bg-zinc-200 disabled:cursor-wait disabled:opacity-50"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-black/20 text-xs font-black">
                G
              </span>
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-600">
                or use email
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "create" && (
                <label className="block">
                  <span className="sr-only">Name</span>
                  <div className="relative">
                    <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={17} />
                    <input
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.displayName}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          displayName: event.target.value,
                        }))
                      }
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.035] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60"
                    />
                  </div>
                </label>
              )}

              <label className="block">
                <span className="sr-only">Email</span>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={17} />
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    placeholder="Email address"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.035] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60"
                  />
                </div>
              </label>

              <label className="block">
                <span className="sr-only">Password</span>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={17} />
                  <input
                    type="password"
                    autoComplete={mode === "create" ? "new-password" : "current-password"}
                    minLength={6}
                    required
                    value={formData.password}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    placeholder="Password"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.035] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60"
                  />
                </div>
              </label>

              {errorMessage && (
                <p className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-200" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={submitStatus === "loading" || status !== "ready"}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-red-500 px-5 py-3.5 text-sm font-black uppercase tracking-wider text-white transition hover:bg-red-400 disabled:cursor-wait disabled:opacity-50"
              >
                {submitStatus === "loading" && <LoaderCircle className="animate-spin" size={18} />}
                {mode === "sign-in" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setMode((current) => (current === "sign-in" ? "create" : "sign-in"));
                setErrorMessage("");
              }}
              className="mt-6 w-full text-center text-sm text-zinc-500 transition hover:text-white"
            >
              {mode === "sign-in"
                ? "New here? Create an account"
                : "Already have an account? Sign in"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
