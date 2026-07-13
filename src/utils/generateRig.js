import { gear } from "../data/gear";

function formatTone(tone) {
  return tone
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function scoreItem(item, builderData) {
  let score = 0;

  if (item.tones?.includes(builderData.tone)) {
    score += 10;
  }

  if (item.brand && builderData.brands.includes(item.brand)) {
    score += 8;
  }

  return score;
}

function sortByMatch(items, builderData) {
  return [...items].sort((firstItem, secondItem) => {
    const scoreDifference =
      scoreItem(secondItem, builderData) -
      scoreItem(firstItem, builderData);

    if (scoreDifference !== 0) {
      return scoreDifference;
    }

    // When two items match equally well, prefer the cheaper one.
    return firstItem.price - secondItem.price;
  });
}

function findBestCoreCombination(instrumentData, builderData) {
  const instruments = sortByMatch(
    instrumentData.instruments,
    builderData,
  );

  const amps = sortByMatch(instrumentData.amps, builderData);

  const cabinets =
    instrumentData.cabinets.length > 0
      ? sortByMatch(instrumentData.cabinets, builderData)
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
            category: cabinet ? "Amplifier Head" : "Amplifier",
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

        const matchScore =
          scoreItem(instrument, builderData) +
          scoreItem(amp, builderData) +
          (cabinet ? scoreItem(cabinet, builderData) : 0);

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

        // Among equally strong matches, use more of the budget.
        return (
          secondCombination.totalPrice -
          firstCombination.totalPrice
        );
      },
    )[0];
  }

  // Only used when even the cheapest possible core rig exceeds the budget.
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

  const rankedItems = sortByMatch(optionalItems, builderData);

  let addedCount = 0;

  for (const item of rankedItems) {
    if (addedCount >= maximumItems) {
      break;
    }

    if (currentTotal + item.price <= builderData.budget) {
      selectedItems.push(item);
      currentTotal += item.price;
      addedCount += 1;
    }
  }

  return selectedItems;
}

export function generateRig(builderData) {
  const instrumentData = gear[builderData.instrument];

  if (!instrumentData) {
    throw new Error("Unsupported instrument selection.");
  }

  const coreRig = findBestCoreCombination(
    instrumentData,
    builderData,
  );

  const matchingPedals = instrumentData.pedals
    .filter((pedal) => pedal.tones?.includes(builderData.tone))
    .map((pedal) => ({
      category: "Pedal",
      ...pedal,
    }));

  const accessories = instrumentData.accessories.map(
    (accessory) => ({
      category: "Accessory",
      ...accessory,
    }),
  );

  // Add essential accessories first while staying under budget.
  let selectedItems = addOptionalItems(
    coreRig.items,
    accessories,
    builderData,
  );

  // Then add up to two matching pedals if money remains.
  selectedItems = addOptionalItems(
    selectedItems,
    matchingPedals,
    builderData,
    builderData.budget >= 1800 ? 2 : 1,
  );

  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price,
    0,
  );

  return {
    id: `rig-${Date.now()}`,
    name: `${formatTone(builderData.tone)} ${
      builderData.instrument === "guitar" ? "Guitar" : "Bass"
    } Rig`,
    items: selectedItems,
    totalPrice,
    remainingBudget: builderData.budget - totalPrice,
    isOverBudget: totalPrice > builderData.budget,
    builderData: {
      ...builderData,
      bands: [...builderData.bands],
      brands: [...builderData.brands],
    },
  };
}