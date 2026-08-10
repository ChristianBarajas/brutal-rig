import { useState } from "react";
import BandsStep from "../components/builder/BandsStep";
import BrandsStep from "../components/builder/BrandsStep";
import BudgetStep from "../components/builder/BudgetStep";
import InstrumentStep from "../components/builder/InstrumentStep";
import ReviewStep from "../components/builder/ReviewStep";
import ToneStep from "../components/builder/ToneStep";
import Navbar from "../components/layout/Navbar";
import RigResults from "../components/results/RigResults";
import { generateRig } from "../utils/generateRig";

function createInitialBuilderData() {
    return {
      instrument: "",
      budget: 1500,
      tone: "",
      bands: [],
      brands: [],
      shoppingPreference: "best-value",
    };
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
  const [currentStep, setCurrentStep] = useState(1);
  const [builderData, setBuilderData] = useState(createInitialBuilderData);
  const [generatedRig, setGeneratedRig] = useState(null);
  const [generationError, setGenerationError] = useState("");

  function handleInstrumentSelect(instrument) {
    setBuilderData((previousData) => ({
      ...previousData,
      instrument,
      budget: Math.max(
        previousData.budget,
        getMinimumBudget(
          instrument,
          previousData.shoppingPreference,
        ),
      ),
    }));

    setCurrentStep(2);
  }

  function handleBudgetChange(budget) {
    setBuilderData((previousData) => ({
      ...previousData,
      budget: Math.max(
        budget,
        getMinimumBudget(
          previousData.instrument,
          previousData.shoppingPreference,
        ),
      ),
    }));
  }

  function handleShoppingPreferenceChange(shoppingPreference) {
    setBuilderData((previousData) => ({
      ...previousData,
      shoppingPreference,
      budget: Math.max(
        previousData.budget,
        getMinimumBudget(
          previousData.instrument,
          shoppingPreference,
        ),
      ),
    }));
  }

  function handleToneSelect(tone) {
    setBuilderData((previousData) => ({
      ...previousData,
      tone,
    }));
  }

  function handleToggleBand(band) {
    setBuilderData((previousData) => {
      const bandAlreadySelected = previousData.bands.includes(band);

      return {
        ...previousData,
        bands: bandAlreadySelected
          ? previousData.bands.filter(
              (selectedBand) => selectedBand !== band,
            )
          : [...previousData.bands, band],
      };
    });
  }

  function handleToggleBrand(brand) {
    setBuilderData((previousData) => {
      const brandAlreadySelected = previousData.brands.includes(brand);

      return {
        ...previousData,
        brands: brandAlreadySelected
          ? previousData.brands.filter(
              (selectedBrand) => selectedBrand !== brand,
            )
          : [...previousData.brands, brand],
      };
    });
  }

  function handleGenerateRig() {
    setGenerationError("");

    try {
      const rig = generateRig(builderData);

      setGeneratedRig(rig);
      setCurrentStep(7);
    } catch (error) {
      setGenerationError(
        error.message ??
          "A complete rig could not be generated with these preferences.",
      );
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleStartOver() {
    setBuilderData(createInitialBuilderData());
    setGeneratedRig(null);
    setGenerationError("");
    setCurrentStep(1);
  
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {currentStep === 1 && (
        <InstrumentStep
          selectedInstrument={builderData.instrument}
          onSelect={handleInstrumentSelect}
        />
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
          onEditPreferences={() => setCurrentStep(6)}
          onStartOver={handleStartOver}
        />
      )}
    </main>
  );
}
