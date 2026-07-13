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
    };
  }

export default function RigBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [builderData, setBuilderData] = useState(createInitialBuilderData);
  const [generatedRig, setGeneratedRig] = useState(null);

  function handleInstrumentSelect(instrument) {
    setBuilderData((previousData) => ({
      ...previousData,
      instrument,
    }));

    setCurrentStep(2);
  }

  function handleBudgetChange(budget) {
    setBuilderData((previousData) => ({
      ...previousData,
      budget,
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
    const rig = generateRig(builderData);

    setGeneratedRig(rig);
    setCurrentStep(7);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleStartOver() {
    setBuilderData(createInitialBuilderData());
    setGeneratedRig(null);
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
          onBudgetChange={handleBudgetChange}
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