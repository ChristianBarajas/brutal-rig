const tierRank = {
  starter: 1,
  serious: 2,
  "stage-ready": 3,
  professional: 4,
};

export function getBudgetPlan(budget, instrument = "guitar") {
  const amount = Number(budget);
  let plan;

  if (amount < 700) {
    plan = {
      id: "starter",
      label: "Starter",
      instrumentTarget: 0.5,
      amplificationTarget: 0.4,
      essentialsTarget: 0.1,
      minimumInstrumentPrice: 0,
      maximumInstrumentPrice: amount * 0.6,
      minimumInstrumentTier: "starter",
      preferredAmpFormats: ["combo"],
      allowedAmpFormats: ["combo"],
      preferredCabinetSizes: [],
      minimumHeadWatts: null,
      tunerType: "clip-on",
    };
  } else if (amount < 1500) {
    plan = {
      id: "serious",
      label: "Serious",
      instrumentTarget: 0.5,
      amplificationTarget: 0.4,
      essentialsTarget: 0.1,
      minimumInstrumentPrice: 250,
      maximumInstrumentPrice: Math.min(800, amount * 0.65),
      minimumInstrumentTier: "serious",
      preferredAmpFormats: ["combo"],
      allowedAmpFormats: ["combo"],
      preferredCabinetSizes: ["2x12"],
      minimumHeadWatts: 100,
      tunerType: "clip-on",
    };
  } else if (amount < 2500) {
    plan = {
      id: "stage-ready",
      label: "Stage Ready",
      instrumentTarget: 0.42,
      amplificationTarget: 0.5,
      essentialsTarget: 0.08,
      minimumInstrumentPrice: 400,
      maximumInstrumentPrice: Math.min(1000, amount * 0.55),
      minimumInstrumentTier: "serious",
      preferredAmpFormats: ["head-cab", "combo"],
      allowedAmpFormats: ["head-cab", "combo"],
      preferredCabinetSizes: ["4x12", "2x12"],
      minimumHeadWatts: 100,
      tunerType: "pedal",
    };
  } else {
    plan = {
      id: "professional",
      label: "Professional",
      instrumentTarget: amount >= 3000 ? 0.3 : 0.34,
      amplificationTarget: amount >= 3000 ? 0.58 : 0.56,
      essentialsTarget: amount >= 3000 ? 0.12 : 0.1,
      minimumInstrumentPrice: amount >= 3000 ? 750 : 500,
      maximumInstrumentPrice: amount >= 4000 ? 1600 : 1200,
      minimumInstrumentTier: "professional",
      preferredAmpFormats: ["head-cab"],
      allowedAmpFormats: ["head-cab"],
      preferredCabinetSizes: ["4x12"],
      requiredCabinetSizes: ["4x12"],
      minimumHeadWatts: 100,
      tunerType: "pedal",
    };
  }

  if (instrument !== "bass") {
    return plan;
  }

  if (plan.id === "stage-ready") {
    return {
      ...plan,
      preferredCabinetSizes: ["1x12", "2x10", "4x10"],
      minimumHeadWatts: 300,
    };
  }

  if (plan.id === "professional") {
    return {
      ...plan,
      instrumentTarget: 0.38,
      amplificationTarget: 0.52,
      essentialsTarget: 0.1,
      minimumInstrumentPrice: 400,
      maximumInstrumentPrice: 1200,
      preferredCabinetSizes: ["1x12", "2x10", "4x10"],
      requiredCabinetSizes: ["1x12"],
      minimumHeadWatts: 300,
    };
  }

  return plan;
}

export function isInstrumentEligible(instrument, budgetPlan) {
  const itemTier = tierRank[instrument.qualityTier] ?? 1;
  const minimumTier = tierRank[budgetPlan.minimumInstrumentTier] ?? 1;

  return (
    itemTier >= minimumTier &&
    instrument.price >= budgetPlan.minimumInstrumentPrice &&
    instrument.price <= budgetPlan.maximumInstrumentPrice
  );
}

export function getCategoryPriority(category) {
  const priorities = {
    instrument: 1,
    amplification: 2,
    tuner: 3,
    cable: 4,
    accessory: 5,
    pedal: 6,
  };

  return priorities[category] ?? 99;
}
