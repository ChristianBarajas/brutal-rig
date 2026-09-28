import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import AuthModal from "../components/auth/AuthModal";
import BandsStep from "../components/builder/BandsStep";
import BrandsStep from "../components/builder/BrandsStep";
import BudgetStep from "../components/builder/BudgetStep";
import BuilderProgress from "../components/builder/BuilderProgress";
import InstrumentStep from "../components/builder/InstrumentStep";
import ReviewStep from "../components/builder/ReviewStep";
import ToneStep from "../components/builder/ToneStep";
import Navbar from "../components/layout/Navbar";
import RigResults from "../components/results/RigResults";
import { saveRig } from "../services/savedRigs";
import {
  clearBuilderDraft,
  createInitialBuilderData,
  getBuilderPreset,
  readBuilderDraft,
  writeBuilderDraft,
} from "../utils/builderDraft";
import { generateRig } from "../utils/generateRig";

function getInitialBuilderState(location) {
  if (location.state?.builderData) {
    return {
      builderData: createInitialBuilderData(location.state.builderData),
      currentStep: 1,
      generatedRig: null,
    };
  }

  const preset = getBuilderPreset(new URLSearchParams(location.search));

  if (preset) {
    return {
      builderData: preset,
      currentStep: preset.tone ? 4 : 2,
      generatedRig: null,
    };
  }

  return (
    readBuilderDraft() ?? {
      builderData: createInitialBuilderData(),
      currentStep: 1,
      generatedRig: null,
    }
  );
}

function getMinimumBudget(instrument, shoppingPreference) {
  if (instrument === "guitar") {
    return shoppingPreference === "new-only" ? 600 : 400;
  }

  if (instrument !== "bass") {
    return 400;
  }

  return shoppingPreference === "new-only" ? 800 : 500;
}

export default function RigBuilder() {
  const location = useLocation();
  const [initialState] = useState(() => getInitialBuilderState(location));
  const { user, db } = useAuth();
  const [currentStep, setCurrentStep] = useState(initialState.currentStep);
  const [builderData, setBuilderData] = useState(initialState.builderData);
  const [generatedRig, setGeneratedRig] = useState(initialState.generatedRig);
  const [generationError, setGenerationError] = useState("");
  const [advice, setAdvice] = useState(null);
  const [savedRigId, setSavedRigId] = useState(null);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const saveCurrentRig = useCallback(async (authenticatedUser = user) => {
    if (!authenticatedUser || !db || !generatedRig) {
      return;
    }

    setSaveStatus("saving");
    setSaveMessage("");

    try {
      const nextSavedRigId = await saveRig({
        db,
        userId: authenticatedUser.uid,
        rig: generatedRig,
        advice,
        savedRigId,
      });
      setSavedRigId(nextSavedRigId);
      setSaveStatus("saved");
      setSaveMessage(savedRigId ? "Saved rig updated." : "Rig saved to My Rigs.");
    } catch (error) {
      setSaveStatus("error");
      setSaveMessage(error.message);
    }
  }, [advice, db, generatedRig, savedRigId, user]);

  useEffect(() => {
    writeBuilderDraft({ builderData, currentStep, generatedRig });
  }, [builderData, currentStep, generatedRig]);

  function handleInstrumentSelect(instrument) {
    setBuilderData((previousData) => ({
      ...previousData,
      instrument,
      budget: Math.max(
        previousData.budget,
        getMinimumBudget(instrument, previousData.shoppingPreference),
      ),
    }));
    setCurrentStep(2);
  }

  function handleBudgetChange(budget) {
    setBuilderData((previousData) => ({
      ...previousData,
      budget: Math.max(
        budget,
        getMinimumBudget(previousData.instrument, previousData.shoppingPreference),
      ),
    }));
  }

  function handleShoppingPreferenceChange(shoppingPreference) {
    setBuilderData((previousData) => ({
      ...previousData,
      shoppingPreference,
      budget: Math.max(
        previousData.budget,
        getMinimumBudget(previousData.instrument, shoppingPreference),
      ),
    }));
  }

  function handleToneSelect(tone) {
    setBuilderData((previousData) => ({ ...previousData, tone }));
  }

  function handleToggleBand(band) {
    setBuilderData((previousData) => ({
      ...previousData,
      bands: previousData.bands.includes(band)
        ? previousData.bands.filter((selectedBand) => selectedBand !== band)
        : [...previousData.bands, band],
    }));
  }

  function handleToggleBrand(brand) {
    setBuilderData((previousData) => ({
      ...previousData,
      brands: previousData.brands.includes(brand)
        ? previousData.brands.filter((selectedBrand) => selectedBrand !== brand)
        : [...previousData.brands, brand],
    }));
  }

  function handleGenerateRig() {
    setGenerationError("");

    try {
      const rig = generateRig(builderData);
      setGeneratedRig(rig);
      setAdvice(null);
      setSavedRigId(null);
      setSaveStatus("idle");
      setCurrentStep(7);
    } catch (error) {
      setGenerationError(
        error.message ?? "A complete rig could not be generated with these preferences.",
      );
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSaveRig() {
    if (!user || !db) {
      setIsAuthOpen(true);
      return;
    }

    saveCurrentRig();
  }

  function handleStartOver() {
    clearBuilderDraft();
    setBuilderData(createInitialBuilderData());
    setGeneratedRig(null);
    setGenerationError("");
    setAdvice(null);
    setSavedRigId(null);
    setSaveStatus("idle");
    setSaveMessage("");
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <BuilderProgress currentStep={currentStep} />

      {currentStep === 1 && (
        <InstrumentStep selectedInstrument={builderData.instrument} onSelect={handleInstrumentSelect} />
      )}
      {currentStep === 2 && (
        <BudgetStep
          budget={builderData.budget}
          instrument={builderData.instrument}
          shoppingPreference={builderData.shoppingPreference}
          onBudgetChange={handleBudgetChange}
          onShoppingPreferenceChange={handleShoppingPreferenceChange}
          onBack={() => setCurrentStep(1)}
          onContinue={() => setCurrentStep(3)}
        />
      )}
      {currentStep === 3 && (
        <ToneStep
          selectedTone={builderData.tone}
          onSelect={handleToneSelect}
          onBack={() => setCurrentStep(2)}
          onContinue={() => setCurrentStep(4)}
        />
      )}
      {currentStep === 4 && (
        <BandsStep
          selectedBands={builderData.bands}
          onToggleBand={handleToggleBand}
          onBack={() => setCurrentStep(3)}
          onContinue={() => setCurrentStep(5)}
        />
      )}
      {currentStep === 5 && (
        <BrandsStep
          selectedBrands={builderData.brands}
          onToggleBrand={handleToggleBrand}
          onBack={() => setCurrentStep(4)}
          onContinue={() => setCurrentStep(6)}
        />
      )}
      {currentStep === 6 && (
        <ReviewStep
          builderData={builderData}
          errorMessage={generationError}
          onBack={() => setCurrentStep(5)}
          onGenerate={handleGenerateRig}
        />
      )}
      {currentStep === 7 && generatedRig && (
        <RigResults
          rig={generatedRig}
          initialAdvice={advice}
          onAdviceChange={(nextAdvice) => {
            setAdvice(nextAdvice);
            if (savedRigId) {
              setSaveStatus("unsaved");
            }
          }}
          onSave={handleSaveRig}
          saveStatus={saveStatus}
          onEditPreferences={() => setCurrentStep(6)}
          onStartOver={handleStartOver}
        />
      )}

      {saveMessage && (
        <div
          className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border px-5 py-3 text-sm shadow-2xl ${
            saveStatus === "error"
              ? "border-red-500/25 bg-[#1a0d0d] text-red-200"
              : "border-white/10 bg-[#151515] text-zinc-200"
          }`}
          role="status"
        >
          {saveMessage}
        </div>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onAuthenticated={saveCurrentRig}
        onClose={() => setIsAuthOpen(false)}
      />
    </main>
  );
}
