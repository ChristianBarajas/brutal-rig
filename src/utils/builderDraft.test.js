import assert from "node:assert/strict";
import test from "node:test";
import {
  BUILDER_DRAFT_KEY,
  createInitialBuilderData,
  getBuilderPreset,
  readBuilderDraft,
  writeBuilderDraft,
} from "./builderDraft.js";

function createMemoryStorage() {
  const values = new Map();

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

test("round trips a valid builder draft", () => {
  const storage = createMemoryStorage();
  const builderData = createInitialBuilderData({
    instrument: "guitar",
    tone: "hardcore",
    bands: ["Knocked Loose"],
  });

  writeBuilderDraft({ builderData, currentStep: 4, generatedRig: null }, storage);

  assert.deepEqual(readBuilderDraft(storage), {
    builderData,
    currentStep: 4,
    generatedRig: null,
  });
  assert.ok(storage.getItem(BUILDER_DRAFT_KEY));
});

test("rejects a malformed local draft", () => {
  const storage = createMemoryStorage();
  storage.setItem(BUILDER_DRAFT_KEY, JSON.stringify({ builderData: { budget: "nope" } }));

  assert.equal(readBuilderDraft(storage), null);
});

test("creates a builder preset from homepage query parameters", () => {
  const preset = getBuilderPreset(
    new URLSearchParams(
      "instrument=bass&budget=2400&tone=death-metal&bands=Meshuggah%7CGojira&brands=darkglass",
    ),
  );

  assert.equal(preset.instrument, "bass");
  assert.equal(preset.budget, 2400);
  assert.equal(preset.tone, "death-metal");
  assert.deepEqual(preset.bands, ["Meshuggah", "Gojira"]);
  assert.deepEqual(preset.brands, ["darkglass"]);
});

test("does not create a preset for a normal builder visit", () => {
  assert.equal(getBuilderPreset(new URLSearchParams()), null);
});
