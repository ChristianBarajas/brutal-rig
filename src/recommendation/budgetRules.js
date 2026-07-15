export function getBudgetPlan(budget) {
    const amount = Number(budget);
  
    if (amount < 700) {
      return {
        id: "starter",
        label: "Starter",
        instrumentTarget: 0.58,
        amplificationTarget: 0.32,
        essentialsTarget: 0.1,
  
        preferredAmpFormats: ["combo"],
        preferredCabinetSizes: [],
        minimumHeadWatts: null,
        tunerType: "clip-on",
  
        requiredCategories: [
          "instrument",
          "amplification",
          "tuner",
          "cable",
        ],
      };
    }
  
    if (amount < 1400) {
      return {
        id: "serious",
        label: "Serious",
        instrumentTarget: 0.5,
        amplificationTarget: 0.4,
        essentialsTarget: 0.1,
  
        preferredAmpFormats: ["combo", "head-cab"],
        preferredCabinetSizes: ["2x12"],
        minimumHeadWatts: 100,
        tunerType: "clip-on",
  
        requiredCategories: [
          "instrument",
          "amplification",
          "tuner",
          "cable",
        ],
      };
    }
  
    if (amount < 2500) {
      return {
        id: "stage-ready",
        label: "Stage Ready",
        instrumentTarget: 0.45,
        amplificationTarget: 0.47,
        essentialsTarget: 0.08,
  
        preferredAmpFormats: ["head-cab", "combo"],
        preferredCabinetSizes: ["4x12", "2x12"],
        minimumHeadWatts: 100,
        tunerType: "pedal",
  
        requiredCategories: [
          "instrument",
          "amplification",
          "tuner",
          "cable",
        ],
      };
    }
  
    return {
      id: "professional",
      label: "Professional",
      instrumentTarget: 0.4,
      amplificationTarget: 0.52,
      essentialsTarget: 0.08,
  
      preferredAmpFormats: ["head-cab"],
      preferredCabinetSizes: ["4x12"],
      minimumHeadWatts: 100,
      tunerType: "pedal",
  
      requiredCategories: [
        "instrument",
        "amplification",
        "tuner",
        "cable",
      ],
    };
  }
  
  export function getCategoryPriority(category) {
    const priorities = {
      instrument: 1,
      amplification: 2,
      tuner: 3,
      cable: 4,
      pedal: 5,
      accessory: 6,
    };
  
    return priorities[category] ?? 99;
  }