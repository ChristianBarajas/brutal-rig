import assert from "node:assert/strict";
import test from "node:test";
import { createSavedRigPayload } from "./savedRigs.js";

test("creates a safe saved-rig snapshot", () => {
  const rig = {
    id: "rig-test",
    name: "Hardcore Guitar Rig",
    items: [{ id: "guitar-1", name: "Test Guitar", price: 500, optional: undefined }],
    totalPrice: 500,
    builderData: {
      instrument: "guitar",
      tone: "hardcore",
      budget: 800,
      bands: ["Knocked Loose"],
      brands: [],
      shoppingPreference: "best-value",
    },
  };

  const payload = createSavedRigPayload({ rig, advice: null });

  assert.equal(payload.name, "Hardcore Guitar Rig");
  assert.equal(payload.instrument, "guitar");
  assert.equal(payload.itemCount, 1);
  assert.equal("optional" in payload.rig.items[0], false);
});

test("rejects an incomplete rig", () => {
  assert.throws(
    () => createSavedRigPayload({ rig: { items: [] } }),
    /complete rig/i,
  );
});

