import { gear } from "../data/gear";
import {
  evaluateItem,
  rankItems,
  scoreItem,
} from "../recommendation/scoring";

function formatTone(tone) {
  return tone
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

function findBestCoreCombination(
  instrumentData,
  builderData,
) {
  const instruments = rankItems(
    instrumentData.instruments,
    builderData,
  );

  const amps = rankItems(
    instrumentData.amps,
    builderData,
  );

  const cabinets =
    instrumentData.cabinets.length > 0
      ? rankItems(
          instrumentData.cabinets,
          builderData,
        )
      : [null];

  const combinations = [];

  for (const instrument of instruments) {
    for (const amp of amps) {
      for (const cabinet of cabinets) {
        const items = [
          {
            category:
              builderData.instrument === "guitar"
                ? "Guitar"
                : "Bass",
            ...instrument,
          },
          {
            category: cabinet
              ? "Amplifier Head"
              : "Amplifier",
            ...amp,
          },
          ...(cabinet
            ? [
                {
                  category: "Cabinet",
                  ...cabinet,
                },
              ]
            : []),
        ];

        const totalPrice = items.reduce(
          (total, item) => total + item.price,
          0,
        );

        const coreItems = [
          instrument,
          amp,
          ...(cabinet ? [cabinet] : []),
        ];

        const matchScore =
          coreItems.reduce(
            (total, item) =>
              total + scoreItem(item, builderData),
            0,
          ) / coreItems.length;

        combinations.push({
          items,
          totalPrice,
          matchScore,
        });
      }
    }
  }

  const affordableCombinations = combinations.filter(
    (combination) =>
      combination.totalPrice <= builderData.budget,
  );

  if (affordableCombinations.length > 0) {
    return affordableCombinations.sort(
      (firstCombination, secondCombination) => {
        const scoreDifference =
          secondCombination.matchScore -
          firstCombination.matchScore;

        if (scoreDifference !== 0) {
          return scoreDifference;
        }

        return (
          secondCombination.totalPrice -
          firstCombination.totalPrice
        );
      },
    )[0];
  }

  return combinations.sort(
    (firstCombination, secondCombination) =>
      firstCombination.totalPrice -
      secondCombination.totalPrice,
  )[0];
}

function addOptionalItems(
  currentItems,
  optionalItems,
  builderData,
  maximumItems = Infinity,
) {
  const selectedItems = [...currentItems];

  let currentTotal = selectedItems.reduce(
    (total, item) => total + item.price,
    0,
  );

  const rankedItems = rankItems(
    optionalItems,
    builderData,
  );

  let addedCount = 0;

  for (const item of rankedItems) {
    if (addedCount >= maximumItems) {
      break;
    }

    if (
      currentTotal + item.price <=
      builderData.budget
    ) {
      selectedItems.push(item);
      currentTotal += item.price;
      addedCount += 1;
    }
  }

  return selectedItems;
}

export function generateRig(builderData) {
  const instrumentData =
    gear[builderData.instrument];

  if (!instrumentData) {
    throw new Error(
      "Unsupported instrument selection.",
    );
  }

  const coreRig = findBestCoreCombination(
    instrumentData,
    builderData,
  );

  if (!coreRig) {
    throw new Error(
      "No complete rig could be generated.",
    );
  }

  const matchingPedals = instrumentData.pedals
    .filter((pedal) =>
      pedal.tones?.includes(builderData.tone),
    )
    .map((pedal) => ({
      category: "Pedal",
      ...pedal,
    }));

  const accessories =
    instrumentData.accessories.map((accessory) => ({
      category: "Accessory",
      ...accessory,
    }));

  // Prioritize tone-shaping gear.
  let selectedItems = addOptionalItems(
    coreRig.items,
    matchingPedals,
    builderData,
    builderData.budget >= 1800 ? 2 : 1,
  );

  // Spend any remaining budget on accessories.
  selectedItems = addOptionalItems(
    selectedItems,
    accessories,
    builderData,
  );

  const evaluatedItems = selectedItems.map(
    (item) => {
      const recommendation = evaluateItem(
        item,
        builderData,
      );

      const reasons =
        recommendation.reasons.length > 0
          ? recommendation.reasons
          : item.category === "Accessory"
            ? [
                "Included as a practical essential while keeping the complete rig within budget.",
              ]
            : [
                "Selected as the strongest available option within your budget.",
              ];

      return {
        ...item,
        recommendation: {
          ...recommendation,
          reasons,
        },
      };
    },
  );

  const totalPrice = evaluatedItems.reduce(
    (total, item) => total + item.price,
    0,
  );

  return {
    id: `rig-${Date.now()}`,
    name: `${formatTone(builderData.tone)} ${
      builderData.instrument === "guitar"
        ? "Guitar"
        : "Bass"
    } Rig`,
    items: evaluatedItems,
    totalPrice,
    remainingBudget:
      builderData.budget - totalPrice,
    isOverBudget:
      totalPrice > builderData.budget,
    builderData: {
      ...builderData,
      bands: [...builderData.bands],
      brands: [...builderData.brands],
    },
  };
}