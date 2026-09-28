import assert from "node:assert/strict";
import { generateRig } from "../src/utils/generateRig.js";

const toneBands = {
  hardcore: "Knocked Loose",
  metalcore: "Architects",
  "death-metal": "Dying Fetus",
  thrash: "Metallica",
  "doom-sludge": "Deftones",
  "nu-metal": "Slipknot",
};

const toneIds = Object.keys(toneBands);
const shoppingPreferences = ["best-value", "new-only", "used-only"];

function roundCurrency(amount) {
  return Math.round(amount * 100) / 100;
}

function findItem(rig, category) {
  return rig.items.find((item) => item.category === category);
}

function verifyRig(rig, expected) {
  const instrumentCategory = expected.instrument === "bass" ? "Bass" : "Guitar";
  const instrument = findItem(rig, instrumentCategory);
  const amplifier = findItem(rig, "Amplifier");
  const head = findItem(rig, "Amplifier Head");
  const cabinet = findItem(rig, "Cabinet");

  assert.equal(rig.builderData.instrument, expected.instrument);
  assert.equal(rig.builderData.tone, expected.tone);
  assert.equal(rig.builderData.budget, expected.budget);
  assert.equal(rig.builderData.shoppingPreference, expected.shoppingPreference);
  assert.deepEqual(rig.builderData.bands, [expected.band]);
  assert.equal(rig.isOverBudget, false);
  assert.ok(rig.totalPrice <= expected.budget);
  assert.ok(instrument);
  assert.ok(amplifier || (head && cabinet));
  assert.ok(findItem(rig, "Tuner"));
  assert.ok(
    rig.items.some((item) => item.category === "Cable" && item.type === "cable"),
  );
  assert.equal(
    rig.totalPrice,
    roundCurrency(rig.items.reduce((total, item) => total + item.price, 0)),
  );
  assert.equal(new Set(rig.items.map((item) => item.id)).size, rig.items.length);
  assert.ok(
    rig.items.some((item) => item.recommendation?.breakdown?.tone > 0),
    `${expected.instrument} ${expected.tone} at $${expected.budget} did not include a tone-aligned item`,
  );
  assert.ok(
    rig.items.some((item) => item.recommendation?.breakdown?.artists > 0),
    `${expected.instrument} ${expected.tone} at $${expected.budget} did not reflect ${expected.band}`,
  );

  if (head) {
    assert.ok(cabinet);
    assert.ok(cabinet.watts >= head.watts);
    assert.ok(
      !cabinet.compatibleAmpIds?.length || cabinet.compatibleAmpIds.includes(head.id),
    );
    assert.ok(
      rig.items.some(
        (item) => item.category === "Cable" && item.type === "speaker-cable",
      ),
    );
  } else {
    assert.ok(amplifier);
    assert.equal(cabinet, undefined);
  }

  if (expected.shoppingPreference === "new-only") {
    assert.ok(
      rig.items.every((item) => item.pricing?.selectedCondition === "new"),
    );
  }

  if (expected.shoppingPreference === "used-only") {
    assert.ok(
      rig.items
        .filter((item) => item.type !== "cable" && item.type !== "speaker-cable")
        .every((item) => item.pricing?.selectedCondition === "used"),
    );
  }
}

let scenarioCount = 0;

for (const instrument of ["guitar", "bass"]) {
  for (const shoppingPreference of shoppingPreferences) {
    const minimumBudget =
      instrument === "bass"
        ? shoppingPreference === "new-only"
          ? 800
          : 500
        : shoppingPreference === "new-only"
          ? 600
          : 400;
    const budgets = [...new Set([minimumBudget, 1000, 1500, 3000])];

    for (const tone of toneIds) {
      for (const budget of budgets) {
        const band = toneBands[tone];
        const expected = {
          instrument,
          shoppingPreference,
          tone,
          budget,
          band,
        };
        const rig = generateRig({
          instrument,
          shoppingPreference,
          tone,
          budget,
          bands: [band],
          brands: [],
        });

        verifyRig(rig, expected);
        scenarioCount += 1;
      }
    }
  }
}

for (const instrument of ["guitar", "bass"]) {
  const signatures = new Set();

  for (const tone of toneIds) {
    const rig = generateRig({
      instrument,
      shoppingPreference: "best-value",
      tone,
      budget: 1500,
      bands: [toneBands[tone]],
      brands: [],
    });

    signatures.add(rig.items.map((item) => item.id).join("|"));
  }

  const minimumDistinctProfiles = instrument === "guitar" ? 3 : 2;

  assert.ok(
    signatures.size >= minimumDistinctProfiles,
    `${instrument} tone choices produced only ${signatures.size} distinct rig profiles`,
  );
}

console.log(`All ${scenarioCount} preference-matrix scenarios passed.`);
