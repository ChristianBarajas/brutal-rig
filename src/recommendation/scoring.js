import { getArtistProfile } from "../data/artists.js";

function formatLabel(value) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function findMatchingBands(item, selectedBands) {
  if (!item.tones?.length) {
    return [];
  }

  return selectedBands.filter((bandName) => {
    const profile = getArtistProfile(bandName);

    return profile?.tones.some((tone) => item.tones.includes(tone));
  });
}

export function evaluateItem(item, builderData) {
  const breakdown = {
    tone: 0,
    artists: 0,
    brand: 0,
  };

  const reasons = [];

  if (item.tones?.includes(builderData.tone)) {
    breakdown.tone = 30;

    reasons.push(
      `Matches your ${formatLabel(builderData.tone)} tone direction.`,
    );
  }

  const matchingBands = findMatchingBands(
    item,
    builderData.bands ?? [],
  );

  if (matchingBands.length > 0) {
    breakdown.artists = Math.min(
      36 + (matchingBands.length - 1) * 6,
      60,
    );

    const displayedBands = matchingBands.slice(0, 2).join(" and ");

    reasons.push(
      `Its sound profile aligns with your ${displayedBands} influence${
        matchingBands.length > 1 ? "s" : ""
      }.`,
    );
  }

  if (
    item.brand &&
    (builderData.brands ?? []).includes(item.brand)
  ) {
    breakdown.brand = 10;

    reasons.push("Matches one of your preferred brands.");
  }

  return {
    total:
      breakdown.tone +
      breakdown.artists +
      breakdown.brand,

    breakdown,
    matchingBands,
    reasons,
  };
}

export function scoreItem(item, builderData) {
  return evaluateItem(item, builderData).total;
}

export function rankItems(items, builderData) {
  return [...items].sort((firstItem, secondItem) => {
    const scoreDifference =
      scoreItem(secondItem, builderData) -
      scoreItem(firstItem, builderData);

    if (scoreDifference !== 0) {
      return scoreDifference;
    }

    return firstItem.price - secondItem.price;
  });
}
