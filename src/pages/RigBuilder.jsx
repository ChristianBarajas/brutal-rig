import { useState } from "react";
import BudgetStep from "../components/builder/BudgetStep";
import InstrumentStep from "../components/builder/InstrumentStep";
import Navbar from "../components/layout/Navbar";

export default function RigBuilder() {
  const [currentStep, setCurrentStep] = useState(1);

  const [builderData, setBuilderData] = useState({
    instrument: "",
    budget: 1500,
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

  function handleBudgetContinue() {
    console.log("Current builder data:", builderData);

    // Step 3 will be added next.
    alert(
      `${builderData.instrument} rig selected with a $${builderData.budget.toLocaleString()} budget.`,
    );
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
          onContinue={handleBudgetContinue}
        />
      )}
    </main>
  );
}