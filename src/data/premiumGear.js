import { gear } from "../data/gear";
import { premiumGear } from "../data/premiumGear";
import {
  evaluateItem,
  scoreItem,
} from "../recommendation/scoring";
import { getBudgetPlan } from "../recommendation/budgetRules";

function formatTone(tone) {
  return tone
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

function roundCurrency(amount) {
  return Math.round(amount * 100) / 100;
}

function getTotalPrice(items) {
  return roundCurrency(
    items.reduce(
      (total, item) => total + item.price,
      0,
    ),
  );
}

function mergeCatalog(
  instrumentType,
  baseCatalog,
) {
  const premiumCatalog =
    premiumGear[instrumentType] ?? {};

  return {
    ...baseCatalog,

    instruments: [
      ...baseCatalog.instruments,
      ...(premiumCatalog.instruments ?? []),
    ],

    cabinets: [
      ...baseCatalog.cabinets,
      ...(premiumCatalog.cabinets ?? []),
    ],
  };
}

function getInstrumentPricePlan(budget) {
  if (budget >= 3000) {
    return {
      minimum: 795,
      target: 950,
      maximum: 1150,
    };
  }

  if (budget >= 2000) {
    return {
      minimum: 600,
      target: 800,
      maximum: 1100,
    };
  }

  if (budget >= 1400) {
    return {
      minimum: 500,
      target: 650,
      maximum: 900,
    };
  }

  if (budget >= 700) {
    return {
      minimum: 400,
      target: Math.min(
        budget * 0.5,
        650,
      ),
      maximum: Math.min(
        budget * 0.65,
        900,
      ),
    };
  }

  return {
    minimum: budget * 0.45,
    target: budget * 0.58,
    maximum: budget * 0.65,
  };
}

function getEligibleInstruments(
  instruments,
  budget,
) {
  const pricePlan =
    getInstrumentPricePlan(budget);

  const eligibleInstruments =
    instruments.filter(
      (instrument) =>
        instrument.price >=
          pricePlan.minimum &&
        instrument.price <=
          pricePlan.maximum,
    );

  if (eligibleInstruments.length > 0) {
    return eligibleInstruments;
  }

  const closestInstrument = [
    ...instruments,
  ].sort((firstItem, secondItem) => {
    const firstDifference = Math.abs(
      firstItem.price - pricePlan.target,
    );

    const secondDifference = Math.abs(
      secondItem.price - pricePlan.target,
    );

    return (
      firstDifference - secondDifference
    );
  })[0];

  return closestInstrument
    ? [closestInstrument]
    : [];
}

function getAllocationScore(
  actualPrice,
  targetPrice,
  maximumScore,
) {
  if (targetPrice <= 0) {
    return 0;
  }

  const difference =
    Math.abs(actualPrice - targetPrice) /
    targetPrice;

  return Math.max(
    0,
    maximumScore * (1 - difference),
  );
}

function getItemBrandValues(item) {
  return [
    item.brand,
    ...(item.brandAliases ?? []),
  ].filter(Boolean);
}

function matchesPreferredBrand(
  item,
  builderData,
) {
  const itemBrands =
    getItemBrandValues(item);

  return (builderData.brands ?? []).some(
    (selectedBrand) =>
      itemBrands.includes(selectedBrand),
  );
}

function isHeadAndCabCompatible(
  head,
  cabinet,
) {
  if (head.format !== "head") {
    return false;
  }

  if (
    cabinet.compatibleAmpIds?.length &&
    !cabinet.compatibleAmpIds.includes(
      head.id,
    )
  ) {
    return false;
  }

  if (
    head.watts &&
    cabinet.watts &&
    cabinet.watts < head.watts
  ) {
    return false;
  }

  return true;
}

function createAmplificationOptions(
  instrumentData,
) {
  const options = [];

  const combos = instrumentData.amps.filter(
    (amp) => amp.format === "combo",
  );

  const heads = instrumentData.amps.filter(
    (amp) => amp.format === "head",
  );

  for (const combo of combos) {
    options.push({
      format: "combo",
      amp: combo,
      cabinet: null,
      price: combo.price,
      items: [
        {
          category: "Amplifier",
          ...combo,
        },
      ],
    });
  }

  for (const head of heads) {
    for (const cabinet of instrumentData.cabinets) {
      if (
        !isHeadAndCabCompatible(
          head,
          cabinet,
        )
      ) {
        continue;
      }

      options.push({
        format: "head-cab",
        amp: head,
        cabinet,
        price: roundCurrency(
          head.price + cabinet.price,
        ),
        items: [
          {
            category: "Amplifier Head",
            ...head,
          },
          {
            category: "Cabinet",
            ...cabinet,
          },
        ],
      });
    }
  }

  return options;
}

function getFormatScore(
  amplification,
  budgetPlan,
) {
  const index =
    budgetPlan.preferredAmpFormats.indexOf(
      amplification.format,
    );

  if (index === 0) {
    return 40;
  }

  if (index === 1) {
    return 18;
  }

  return 0;
}

function getCabinetScore(
  amplification,
  budgetPlan,
  builderData,
) {
  if (!amplification.cabinet) {
    return 0;
  }

  let score = 0;

  const index =
    budgetPlan.preferredCabinetSizes.indexOf(
      amplification.cabinet.size,
    );

  if (index === 0) {
    score += 25;
  } else if (index === 1) {
    score += 12;
  }

  if (
    matchesPreferredBrand(
      amplification.cabinet,
      builderData,
    )
  ) {
    score += 30;
  }

  return score;
}

function getTierScore(
  instrument,
  amplification,
  budgetPlan,
) {
  let score = 0;

  if (
    instrument.useCases?.includes(
      budgetPlan.id,
    )
  ) {
    score += 15;
  }

  if (
    amplification.amp.useCases?.includes(
      budgetPlan.id,
    )
  ) {
    score += 15;
  }

  if (
    amplification.cabinet?.useCases?.includes(
      budgetPlan.id,
    )
  ) {
    score += 10;
  }

  return score;
}

function calculateCoreScore(
  candidate,
  builderData,
  budgetPlan,
) {
  const instrumentPricePlan =
    getInstrumentPricePlan(
      builderData.budget,
    );

  const instrumentAllocationScore =
    getAllocationScore(
      candidate.instrument.price,
      instrumentPricePlan.target,
      100,
    );

  const essentialPrice =
    candidate.items
      .filter(
        (item) =>
          item.category === "Tuner" ||
          item.category === "Cable",
      )
      .reduce(
        (total, item) =>
          total + item.price,
        0,
      );

  const amplificationTarget = Math.max(
    1,
    builderData.budget -
      candidate.instrument.price -
      essentialPrice,
  );

  const amplificationAllocationScore =
    getAllocationScore(
      candidate.amplification.price,
      amplificationTarget,
      70,
    );

  const instrumentMatchScore = scoreItem(
    candidate.instrument,
    builderData,
  );

  const amplificationProducts = [
    candidate.amplification.amp,
    ...(candidate.amplification.cabinet
      ? [
          candidate.amplification.cabinet,
        ]
      : []),
  ];

  const amplificationMatchScore =
    amplificationProducts.reduce(
      (total, item) =>
        total +
        scoreItem(item, builderData),
      0,
    ) /
    amplificationProducts.length;

  const preferredBrandBonus =
    matchesPreferredBrand(
      candidate.instrument,
      builderData,
    )
      ? 20
      : 0;

  const tunerScore =
    candidate.tuner.type ===
    budgetPlan.tunerType
      ? 15
      : 0;

  const formatScore = getFormatScore(
    candidate.amplification,
    budgetPlan,
  );

  const cabinetScore = getCabinetScore(
    candidate.amplification,
    budgetPlan,
    builderData,
  );

  const tierScore = getTierScore(
    candidate.instrument,
    candidate.amplification,
    budgetPlan,
  );

  const budgetUsageScore =
    candidate.totalPrice <=
    builderData.budget
      ? (candidate.totalPrice /
          builderData.budget) *
        25
      : -(
          (candidate.totalPrice -
            builderData.budget) /
          builderData.budget
        ) * 150;

  return (
    instrumentAllocationScore +
    amplificationAllocationScore +
    instrumentMatchScore +
    amplificationMatchScore +
    preferredBrandBonus +
    tunerScore +
    formatScore +
    cabinetScore +
    tierScore +
    budgetUsageScore
  );
}

function findBestCoreRig(
  instrumentData,
  builderData,
  budgetPlan,
) {
  const eligibleInstruments =
    getEligibleInstruments(
      instrumentData.instruments,
      builderData.budget,
    );

  const amplificationOptions =
    createAmplificationOptions(
      instrumentData,
    );

  const preferredTuners =
    instrumentData.tuners.filter(
      (tuner) =>
        tuner.type ===
        budgetPlan.tunerType,
    );

  const tunerOptions =
    preferredTuners.length > 0
      ? preferredTuners
      : instrumentData.tuners;

  const instrumentCable =
    instrumentData.accessories.find(
      (item) =>
        item.type === "cable" &&
        item.required === true,
    );

  const speakerCable =
    instrumentData.accessories.find(
      (item) =>
        item.type === "speaker-cable",
    );

  if (eligibleInstruments.length === 0) {
    throw new Error(
      "No suitable instrument is available.",
    );
  }

  if (!instrumentCable) {
    throw new Error(
      "The catalog is missing an instrument cable.",
    );
  }

  if (tunerOptions.length === 0) {
    throw new Error(
      "The catalog is missing a tuner.",
    );
  }

  if (amplificationOptions.length === 0) {
    throw new Error(
      "No valid amplification options are available.",
    );
  }

  const candidates = [];

  for (const instrument of eligibleInstruments) {
    for (const amplification of amplificationOptions) {
      for (const tuner of tunerOptions) {
        const items = [
          {
            category:
              builderData.instrument ===
              "guitar"
                ? "Guitar"
                : "Bass",
            ...instrument,
          },
          ...amplification.items,
          {
            category: "Tuner",
            ...tuner,
          },
          {
            category: "Cable",
            ...instrumentCable,
          },
        ];

        if (
          amplification.format ===
            "head-cab" &&
          speakerCable
        ) {
          items.push({
            category: "Cable",
            ...speakerCable,
          });
        }

        const candidate = {
          instrument,
          amplification,
          tuner,
          items,
          totalPrice:
            getTotalPrice(items),
        };

        candidate.score =
          calculateCoreScore(
            candidate,
            builderData,
            budgetPlan,
          );

        candidates.push(candidate);
      }
    }
  }

  const affordableCandidates =
    candidates.filter(
      (candidate) =>
        candidate.totalPrice <=
        builderData.budget,
    );

  if (
    affordableCandidates.length > 0
  ) {
    return affordableCandidates.sort(
      (
        firstCandidate,
        secondCandidate,
      ) => {
        const scoreDifference =
          secondCandidate.score -
          firstCandidate.score;

        if (scoreDifference !== 0) {
          return scoreDifference;
        }

        return (
          secondCandidate.totalPrice -
          firstCandidate.totalPrice
        );
      },
    )[0];
  }

  return candidates.sort(
    (
      firstCandidate,
      secondCandidate,
    ) =>
      firstCandidate.totalPrice -
      secondCandidate.totalPrice,
  )[0];
}

function addOptionalItems(
  currentItems,
  optionalItems,
  builderData,
  maximumItems = Infinity,
) {
  const selectedItems = [
    ...currentItems,
  ];

  let currentTotal =
    getTotalPrice(selectedItems);

  let addedCount = 0;

  const rankedItems = [
    ...optionalItems,
  ].sort(
    (firstItem, secondItem) => {
      const scoreDifference =
        scoreItem(
          secondItem,
          builderData,
        ) -
        scoreItem(
          firstItem,
          builderData,
        );

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return (
        firstItem.price -
        secondItem.price
      );
    },
  );

  for (const item of rankedItems) {
    if (
      addedCount >= maximumItems
    ) {
      break;
    }

    if (
      currentTotal + item.price <=
      builderData.budget
    ) {
      selectedItems.push(item);

      currentTotal = roundCurrency(
        currentTotal + item.price,
      );

      addedCount += 1;
    }
  }

  return selectedItems;
}

function getPedalLimit(
  budgetPlan,
  amplifier,
) {
  if (budgetPlan.id === "starter") {
    return 0;
  }

  if (
    budgetPlan.id === "serious" &&
    amplifier.builtInEffects
  ) {
    return 0;
  }

  if (
    budgetPlan.id === "professional"
  ) {
    return 2;
  }

  return 1;
}

function getCategoryReasons(
  item,
  builderData,
  coreRig,
) {
  const reasons = [];

  if (
    item.category === "Guitar" ||
    item.category === "Bass"
  ) {
    const percentage = Math.round(
      (item.price /
        builderData.budget) *
        100,
    );

    reasons.push(
      `The instrument is the foundation of this build and receives ${percentage}% of the total budget.`,
    );

    if (
      item.pickupType === "humbucker"
    ) {
      reasons.push(
        "Its humbucker pickups are suited to high-gain rhythm tones and unwanted-noise control.",
      );
    }

    if (
      item.electronics === "active"
    ) {
      reasons.push(
        "Its active electronics provide strong output and definition for heavy tones.",
      );
    }
  }

  if (
    item.category === "Amplifier" &&
    item.format === "combo"
  ) {
    reasons.push(
      "A combo keeps the rig practical while preserving more of the budget for the instrument.",
    );

    if (item.builtInEffects) {
      reasons.push(
        "Built-in effects reduce the need to immediately purchase additional pedals.",
      );
    }
  }

  if (
    item.category ===
    "Amplifier Head"
  ) {
    reasons.push(
      `${item.watts} watts of output provides a serious foundation for rehearsals and live performance.`,
    );
  }

  if (
    item.category === "Cabinet"
  ) {
    reasons.push(
      `The ${item.size} format matches the ${coreRig.budgetPlan.label.toLowerCase()} direction of this rig.`,
    );

    if (item.speakerModel) {
      reasons.push(
        `${item.speakerModel} speakers shape the projection and response of the amplifier setup.`,
      );
    }
  }

  if (
    item.category === "Tuner"
  ) {
    reasons.push(
      item.type === "pedal"
        ? "A pedal tuner provides dependable tuning control for rehearsals and live performance."
        : "A clip-on tuner handles an essential job without taking money from the instrument and amplifier.",
    );
  }

  if (
    item.category === "Cable" &&
    item.type === "cable"
  ) {
    reasons.push(
      "An instrument cable is required to make the complete rig usable immediately.",
    );
  }

  if (
    item.category === "Cable" &&
    item.type === "speaker-cable"
  ) {
    reasons.push(
      "A proper speaker cable is required to safely connect the amplifier head and cabinet.",
    );
  }

  if (
    matchesPreferredBrand(
      item,
      builderData,
    )
  ) {
    reasons.push(
      "Matches one of your preferred brands.",
    );
  }

  return reasons;
}

function attachRecommendations(
  items,
  builderData,
  coreRig,
) {
  return items.map((item) => {
    const evaluation =
      evaluateItem(
        item,
        builderData,
      );

    const categoryReasons =
      getCategoryReasons(
        item,
        builderData,
        coreRig,
      );

    const reasons = [
      ...new Set([
        ...evaluation.reasons,
        ...categoryReasons,
      ]),
    ];

    if (reasons.length === 0) {
      reasons.push(
        item.category ===
          "Accessory"
          ? "Included after the instrument, amplification, tuner, and required cables were secured."
          : "Selected as the strongest available fit for this complete rig.",
      );
    }

    return {
      ...item,

      recommendation: {
        ...evaluation,
        reasons,
      },
    };
  });
}

export function generateRig(
  builderData,
) {
  const baseCatalog =
    gear[builderData.instrument];

  if (!baseCatalog) {
    throw new Error(
      "Unsupported instrument selection.",
    );
  }

  const instrumentData =
    mergeCatalog(
      builderData.instrument,
      baseCatalog,
    );

  const budgetPlan = getBudgetPlan(
    builderData.budget,
  );

  const coreRig = findBestCoreRig(
    instrumentData,
    builderData,
    budgetPlan,
  );

  coreRig.budgetPlan = budgetPlan;

  const matchingPedals =
    instrumentData.pedals
      .filter((pedal) =>
        pedal.tones?.includes(
          builderData.tone,
        ),
      )
      .map((pedal) => ({
        category: "Pedal",
        ...pedal,
      }));

  const optionalAccessories =
    instrumentData.accessories
      .filter(
        (accessory) =>
          accessory.required !== true &&
          !accessory.requiredFor,
      )
      .map((accessory) => ({
        category: "Accessory",
        ...accessory,
      }));

  const pedalLimit = getPedalLimit(
    budgetPlan,
    coreRig.amplification.amp,
  );

  let selectedItems =
    addOptionalItems(
      coreRig.items,
      matchingPedals,
      builderData,
      pedalLimit,
    );

  selectedItems = addOptionalItems(
    selectedItems,
    optionalAccessories,
    builderData,
  );

  const evaluatedItems =
    attachRecommendations(
      selectedItems,
      builderData,
      coreRig,
    );

  const totalPrice =
    getTotalPrice(evaluatedItems);

  return {
    id: `rig-${Date.now()}`,

    name: `${formatTone(
      builderData.tone,
    )} ${
      builderData.instrument ===
      "guitar"
        ? "Guitar"
        : "Bass"
    } Rig`,

    items: evaluatedItems,
    totalPrice,

    remainingBudget: roundCurrency(
      builderData.budget -
        totalPrice,
    ),

    isOverBudget:
      totalPrice >
      builderData.budget,

    rigFormat:
      coreRig.amplification.format,

    budgetPlan,

    builderData: {
      ...builderData,
      bands: [
        ...builderData.bands,
      ],
      brands: [
        ...builderData.brands,
      ],
    },
  };
}