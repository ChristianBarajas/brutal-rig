import { useState } from "react";
import BandsStep from "../components/builder/BandsStep";
import BudgetStep from "../components/builder/BudgetStep";
import InstrumentStep from "../components/builder/InstrumentStep";
import ToneStep from "../components/builder/ToneStep";
import Navbar from "../components/layout/Navbar";

export default function RigBuilder() {
  const [currentStep, setCurrentStep] = useState(1);

  const [builderData, setBuilderData] = useState({
    instrument: "",
    budget: 1500,
    tone: "",
    bands: [],
  });

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

  function handleBandsContinue() {
    console.log("Current builder data:", builderData);

    // Step 5 will be preferred brands.
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
          onContinue={handleBandsContinue}
        />
      )}
    </main>
  );
}