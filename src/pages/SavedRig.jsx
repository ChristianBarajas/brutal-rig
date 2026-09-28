import { useEffect, useState } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import Navbar from "../components/layout/Navbar";
import RigResults from "../components/results/RigResults";
import { getSavedRig, saveRig } from "../services/savedRigs";

export default function SavedRig() {
  const { rigId } = useParams();
  const navigate = useNavigate();
  const { user, db, status } = useAuth();
  const [savedRig, setSavedRig] = useState(null);
  const [loadedUserId, setLoadedUserId] = useState(null);
  const [advice, setAdvice] = useState(null);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [saveStatus, setSaveStatus] = useState("saved");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user || !db) {
      return;
    }

    getSavedRig({ db, userId: user.uid, rigId })
      .then((result) => {
        if (!result) {
          setLoadStatus("missing");
          return;
        }

        setSavedRig(result);
        setAdvice(result.advice ?? null);
        setLoadedUserId(user.uid);
        setLoadStatus("success");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoadStatus("error");
      });
  }, [db, rigId, status, user]);

  async function handleSave() {
    setSaveStatus("saving");
    setErrorMessage("");

    try {
      await saveRig({
        db,
        userId: user.uid,
        rig: savedRig.rig,
        advice,
        savedRigId: rigId,
      });
      setSaveStatus("saved");
    } catch (error) {
      setSaveStatus("error");
      setErrorMessage(error.message);
    }
  }

  const effectiveLoadStatus =
    status === "loading" || (user && loadedUserId !== user.uid)
      ? "loading"
      : !user || !db
        ? "signed-out"
        : loadStatus;

  if (effectiveLoadStatus !== "success") {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <Navbar />
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          {effectiveLoadStatus === "loading" && <LoaderCircle className="animate-spin text-zinc-500" size={32} />}
          {effectiveLoadStatus === "signed-out" && (
            <>
              <h1 className="text-4xl font-black uppercase">Sign in to open this rig.</h1>
              <Link to="/my-rigs" className="mt-7 rounded-full bg-white px-7 py-4 text-xs font-black uppercase tracking-widest text-black">
                Go to My Rigs
              </Link>
            </>
          )}
          {(effectiveLoadStatus === "missing" || effectiveLoadStatus === "error") && (
            <>
              <h1 className="text-4xl font-black uppercase">Rig not found.</h1>
              <p className="mt-4 text-zinc-500">{errorMessage || "It may have been deleted or belongs to another account."}</p>
              <Link to="/my-rigs" className="mt-7 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white">
                <ArrowLeft size={17} /> Back to My Rigs
              </Link>
            </>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <RigResults
        rig={{ ...savedRig.rig, name: savedRig.name }}
        initialAdvice={advice}
        onAdviceChange={(nextAdvice) => {
          setAdvice(nextAdvice);
          setSaveStatus("unsaved");
        }}
        onSave={handleSave}
        saveStatus={saveStatus}
        onEditPreferences={() =>
          navigate("/builder", {
            state: { builderData: savedRig.rig.builderData },
          })
        }
        onStartOver={() => navigate("/builder")}
        savedView
      />
      {errorMessage && (
        <p className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-red-500/20 bg-[#161010] px-5 py-3 text-sm text-red-200 shadow-2xl">
          {errorMessage}
        </p>
      )}
    </main>
  );
}
