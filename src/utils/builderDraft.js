const STORAGE_KEY = "brutal-rig-builder-draft-v1";

export function createInitialBuilderData(overrides = {}) {
  return {
    instrument: "",
    budget: 1500,
    tone: "",
    bands: [],
    brands: [],
    shoppingPreference: "best-value",
    ...overrides,
  };
}

function isValidBuilderData(data) {
  return Boolean(
    data &&
      typeof data === "object" &&
      typeof data.instrument === "string" &&
      Number.isFinite(Number(data.budget)) &&
      typeof data.tone === "string" &&
      Array.isArray(data.bands) &&
      Array.isArray(data.brands) &&
      typeof data.shoppingPreference === "string",
  );
}

export function readBuilderDraft(storage = window.localStorage) {
  try {
    const rawDraft = storage.getItem(STORAGE_KEY);
    const draft = rawDraft ? JSON.parse(rawDraft) : null;

    if (!draft || !isValidBuilderData(draft.builderData)) {
      return null;
    }

    return {
      builderData: createInitialBuilderData(draft.builderData),
      currentStep: Math.min(Math.max(Number(draft.currentStep) || 1, 1), 7),
      generatedRig: draft.generatedRig?.items?.length ? draft.generatedRig : null,
    };
  } catch {
    return null;
  }
}

export function writeBuilderDraft(draft, storage = window.localStorage) {
  storage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function clearBuilderDraft(storage = window.localStorage) {
  storage.removeItem(STORAGE_KEY);
}

export function getBuilderPreset(searchParams) {
  const instrument = searchParams.get("instrument");
  const tone = searchParams.get("tone");
  const budgetParam = searchParams.get("budget");
  const budget = budgetParam ? Number(budgetParam) : Number.NaN;
  const bands = searchParams.get("bands")?.split("|").filter(Boolean) ?? [];
  const brands = searchParams.get("brands")?.split("|").filter(Boolean) ?? [];

  const hasPreset = instrument || tone || budgetParam || bands.length || brands.length;

  if (!hasPreset) {
    return null;
  }

  return createInitialBuilderData({
    instrument: instrument === "bass" ? "bass" : "guitar",
    tone: tone ?? "",
    budget: Number.isFinite(budget) && budget >= 400 ? budget : 1500,
    bands,
    brands,
  });
}

export { STORAGE_KEY as BUILDER_DRAFT_KEY };
