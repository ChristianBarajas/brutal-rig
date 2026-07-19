import assert from "node:assert/strict";
import { generateRig } from "../src/utils/generateRig.js";

const basePreferences = {
  instrument: "guitar",
  tone: "hardcore",
  bands: ["Knocked Loose", "Jesus Piece"],
  brands: ["esp-ltd", "mesa-boogie"],
  shoppingPreference: "best-value",
};

function buildRig(budget, overrides = {}) {
  return generateRig({
    ...basePreferences,
    budget,
    ...overrides,
  });
}

function findItem(rig, category) {
  return rig.items.find((item) => item.category === category);
}

function verifyCompleteRig(rig) {
  assert.equal(rig.isOverBudget, false);
  assert.ok(rig.totalPrice <= rig.builderData.budget);
  assert.ok(findItem(rig, "Guitar"));
  assert.ok(findItem(rig, "Tuner"));
  assert.ok(
    rig.items.some(
      (item) => item.category === "Cable" && item.type === "cable",
    ),
  );
}

for (const budget of [400, 500, 800, 1000, 1400, 1500, 2000, 2500, 3000, 4100]) {
  const rig = buildRig(budget);
  verifyCompleteRig(rig);

  if (budget < 1500) {
    assert.equal(rig.rigFormat, "combo");
  }

  console.log(
    `${budget}: ${findItem(rig, "Guitar").name} | ${
      findItem(rig, "Amplifier")?.name ?? findItem(rig, "Amplifier Head")?.name
    } | $${rig.totalPrice}`,
  );
}

for (const budget of [2500, 3000, 4100]) {
  const rig = buildRig(budget);
  const guitar = findItem(rig, "Guitar");
  const head = findItem(rig, "Amplifier Head");
  const cabinet = findItem(rig, "Cabinet");

  assert.equal(guitar.qualityTier, "professional");
  assert.ok(guitar.price >= rig.budgetPlan.minimumInstrumentPrice);
  assert.equal(rig.rigFormat, "head-cab");
  assert.ok(head.watts >= 100);
  assert.equal(cabinet.size, "4x12");
  assert.ok(
    rig.items.some(
      (item) => item.category === "Cable" && item.type === "speaker-cable",
    ),
  );
}

const constrainedBrandRig = buildRig(500, {
  brands: ["mesa-boogie"],
});

assert.equal(
  constrainedBrandRig.items.some((item) => item.brand === "mesa-boogie"),
  false,
);

const mesaRig = buildRig(3000, {
  brands: ["mesa-boogie"],
});

assert.equal(findItem(mesaRig, "Cabinet").brand, "mesa-boogie");

console.log("All guitar rig scenarios passed.");
