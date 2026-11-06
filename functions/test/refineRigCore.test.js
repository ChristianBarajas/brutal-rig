import assert from "node:assert/strict";
import test from "node:test";
import {
  buildRefineRigRequest,
  createRefineRigHandler,
  parseRefineRigProposal,
  sanitizeRefineInput,
} from "../src/refineRigCore.js";
import { generateRig } from "../../src/utils/generateRig.js";

const current = {
  instrument: "guitar",
  budget: 1500,
  tone: "metalcore",
  bands: ["Trivium"],
  brands: [],
  shoppingPreference: "best-value",
};

function modelOutput(changes = {}, unhandled = []) {
  return JSON.stringify({
    changes: {
      instrument: null,
      budget: null,
      tone: null,
      bands: null,
      brands: null,
      shoppingPreference: null,
      ...changes,
    },
    explanation: "Tighter hardcore tone within the requested cap.",
    unhandled,
  });
}

test("accepts a constrained request and produces strict structured output", () => {
  const input = sanitizeRefineInput({
    builderData: current,
    request: "Hardcore under $1,200, C standard please",
  });
  const modelRequest = buildRefineRigRequest(input);
  assert.equal(modelRequest.model, "gpt-5.6-luna");
  assert.equal(modelRequest.text.format.strict, true);
  assert.equal(modelRequest.text.format.schema.additionalProperties, false);
  assert.match(modelRequest.input[0].content, /unsupported constraint/);
});

test("applies only validated preference changes and preserves the rest", () => {
  const proposal = parseRefineRigProposal(
    modelOutput({ budget: 1200, tone: "hardcore" }, ["C standard setup is not verified by the catalog."]),
    current,
  );
  assert.deepEqual(proposal.preferences, { ...current, budget: 1200, tone: "hardcore" });
  assert.equal(proposal.unhandled.length, 1);
  const rig = generateRig(proposal.preferences);
  assert.equal(rig.isOverBudget, false);
  assert.ok(rig.items.length > 0);
  assert.ok(rig.totalPrice <= 1200);
  const omittedWarning = parseRefineRigProposal(modelOutput({ budget: 1200 }), current, "I play in C standard, keep it under $1,200");
  assert.match(omittedWarning.unhandled[0], /C standard is not a verified builder constraint/);
});

test("rejects unsupported model choices and invalid budgets", () => {
  assert.throws(() => parseRefineRigProposal(modelOutput({ tone: "jazz" }), current), /unsupported preferences/);
  assert.throws(() => parseRefineRigProposal(modelOutput({ brands: ["invented-brand"] }), current), /unsupported preferences/);
  assert.throws(() => parseRefineRigProposal(modelOutput({ budget: 300 }), current), /unsupported preferences/);
  assert.throws(() => parseRefineRigProposal(modelOutput({ shoppingPreference: "new-only", instrument: "bass" }), { ...current, budget: 500 }), /unsupported preferences/);
});

test("rejects malformed client input before a model call", async () => {
  let called = false;
  const responseRecord = { code: 0, body: null };
  const response = {
    set() { return this; },
    status(code) { responseRecord.code = code; return this; },
    json(body) { responseRecord.body = body; return this; },
  };
  const handler = createRefineRigHandler(async () => { called = true; });
  await handler({ method: "POST", body: { builderData: current, request: "short" } }, response);
  assert.equal(responseRecord.code, 400);
  assert.equal(called, false);
});

test("returns a proposed rig profile without applying or saving it", async () => {
  const responseRecord = { code: 0, body: null };
  const response = {
    set() { return this; },
    status(code) { responseRecord.code = code; return this; },
    json(body) { responseRecord.body = body; return this; },
  };
  const handler = createRefineRigHandler(async (input) =>
    parseRefineRigProposal(modelOutput({ budget: 1000 }), input.builderData),
  );
  await handler({ method: "POST", body: { builderData: current, request: "Bring this under $1,000" } }, response);
  assert.equal(responseRecord.code, 200);
  assert.equal(responseRecord.body.proposal.preferences.budget, 1000);
  assert.equal(current.budget, 1500);
});
