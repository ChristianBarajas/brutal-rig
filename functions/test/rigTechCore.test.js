import assert from "node:assert/strict";
import test from "node:test";
import {
  buildRigTechRequest,
  createRigTechHandler,
  parseRigTechAdvice,
  sanitizeRigPayload,
} from "../src/rigTechCore.js";

const validPayload = {
  rig: {
    name: "Hardcore Guitar Rig",
    totalPrice: 1488.99,
    rigFormat: "combo",
    builderData: {
      instrument: "guitar",
      budget: 1500,
      tone: "hardcore",
      bands: ["Knocked Loose", "Jesus Piece"],
      brands: ["esp-ltd"],
    },
    items: [
      {
        name: "ESP LTD EC-1000",
        category: "Guitar",
        brand: "esp-ltd",
        description: "A high-output guitar for heavy music.",
        price: 1099,
      },
      {
        name: "Orange Super Crush 100",
        category: "Amplifier",
        format: "combo",
        watts: 100,
        description: "A 100-watt solid-state combo.",
        price: 299.99,
      },
    ],
  },
};

const validAdvice = {
  toneSummary: "A tight, mid-forward hardcore starting point.",
  signalChain: [
    "ESP LTD EC-1000 into the Orange Super Crush 100",
  ],
  startingSettings: [
    {
      gear: "Orange Super Crush 100",
      control: "Gain",
      value: "5/10",
      reason: "Leaves room for pick attack.",
    },
  ],
  setupNotes: ["Start with fresh strings and accurate intonation."],
  upgradePath: {
    priority: "Professional setup",
    reason: "Setup consistency improves tracking and tuning stability.",
    budgetGuidance: "Reserve a small maintenance budget.",
  },
  startingPointNote: "These settings are starting points; adjust for the room.",
};

test("sanitizes the generated rig before model use", () => {
  const rig = sanitizeRigPayload(validPayload);

  assert.equal(rig.instrument, "guitar");
  assert.equal(rig.remainingBudget, 11.01);
  assert.equal(rig.items.length, 2);
  assert.equal(rig.items[0].name, "ESP LTD EC-1000");
});

test("rejects malformed rigs", () => {
  assert.throws(
    () =>
      sanitizeRigPayload({
        rig: {
          builderData: { instrument: "keyboard", budget: 1000 },
          totalPrice: 900,
          items: [],
        },
      }),
    /unsupported instrument/,
  );
});

test("builds a strict, cost-conscious Responses API request", () => {
  const request = buildRigTechRequest(
    sanitizeRigPayload(validPayload),
  );

  assert.equal(request.model, "gpt-5.6-luna");
  assert.equal(request.text.format.strict, true);
  assert.equal(
    request.text.format.schema.additionalProperties,
    false,
  );
  assert.match(request.input[0].content, /Do not replace products/);
  assert.match(request.input[0].content, /amp sims/);
});

test("parses a complete structured tone plan", () => {
  assert.deepEqual(
    parseRigTechAdvice(JSON.stringify(validAdvice)),
    validAdvice,
  );
});

test("rejects incomplete model output", () => {
  assert.throws(
    () => parseRigTechAdvice('{"toneSummary":"Missing sections"}'),
    /incomplete tone plan/,
  );
});

function createResponseRecorder() {
  const record = {
    headers: {},
    statusCode: null,
    body: null,
  };

  return {
    record,
    response: {
      set(name, value) {
        record.headers[name] = value;
        return this;
      },
      status(statusCode) {
        record.statusCode = statusCode;
        return this;
      },
      json(body) {
        record.body = body;
        return this;
      },
    },
  };
}

test("accepts a valid POST and returns generated advice", async () => {
  const { record, response } = createResponseRecorder();
  const handler = createRigTechHandler(async () => validAdvice);

  await handler(
    { method: "POST", body: validPayload },
    response,
  );

  assert.equal(record.statusCode, 200);
  assert.deepEqual(record.body, { advice: validAdvice });
  assert.equal(record.headers["Cache-Control"], "no-store");
});

test("rejects non-POST requests before calling the model", async () => {
  const { record, response } = createResponseRecorder();
  let called = false;
  const handler = createRigTechHandler(async () => {
    called = true;
    return validAdvice;
  });

  await handler({ method: "GET" }, response);

  assert.equal(record.statusCode, 405);
  assert.equal(record.headers.Allow, "POST");
  assert.equal(called, false);
});
