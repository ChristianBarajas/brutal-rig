const ALLOWED_INSTRUMENTS = new Set(["guitar", "bass"]);
const MAX_ITEMS = 14;
const DEFAULT_RATE_LIMIT = 5;
const DEFAULT_RATE_WINDOW_MS = 10 * 60 * 1000;

class RigValidationError extends Error {}

export function createRequestRateLimiter({
  limit = DEFAULT_RATE_LIMIT,
  windowMs = DEFAULT_RATE_WINDOW_MS,
  now = Date.now,
} = {}) {
  const requestsByClient = new Map();

  return function checkRateLimit(clientId) {
    const currentTime = now();
    const previousRequests = requestsByClient.get(clientId) ?? [];
    const activeRequests = previousRequests.filter(
      (timestamp) => currentTime - timestamp < windowMs,
    );

    if (activeRequests.length >= limit) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil(
            (windowMs - (currentTime - activeRequests[0])) / 1000,
          ),
        ),
      };
    }

    activeRequests.push(currentTime);
    requestsByClient.set(clientId, activeRequests);

    if (requestsByClient.size > 1000) {
      for (const [key, timestamps] of requestsByClient) {
        if (
          timestamps.every(
            (timestamp) => currentTime - timestamp >= windowMs,
          )
        ) {
          requestsByClient.delete(key);
        }
      }
    }

    return { allowed: true, retryAfterSeconds: 0 };
  };
}

const upgradePriorities = [
  "No immediate upgrade",
  "Noise gate",
  "Overdrive pedal",
  "Cabinet",
  "Amplifier",
  "Pickups",
  "Instrument",
  "Professional setup",
  "Power supply",
];

export const rigTechSchema = {
  type: "object",
  properties: {
    toneSummary: { type: "string" },
    signalChain: {
      type: "array",
      items: { type: "string" },
    },
    startingSettings: {
      type: "array",
      items: {
        type: "object",
        properties: {
          gear: { type: "string" },
          control: { type: "string" },
          value: { type: "string" },
          reason: { type: "string" },
        },
        required: ["gear", "control", "value", "reason"],
        additionalProperties: false,
      },
    },
    setupNotes: {
      type: "array",
      items: { type: "string" },
    },
    upgradePath: {
      type: "object",
      properties: {
        priority: {
          type: "string",
          enum: upgradePriorities,
        },
        reason: { type: "string" },
        budgetGuidance: { type: "string" },
      },
      required: ["priority", "reason", "budgetGuidance"],
      additionalProperties: false,
    },
    startingPointNote: { type: "string" },
  },
  required: [
    "toneSummary",
    "signalChain",
    "startingSettings",
    "setupNotes",
    "upgradePath",
    "startingPointNote",
  ],
  additionalProperties: false,
};

function cleanString(value, maximumLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maximumLength);
}

function cleanStringArray(value, maximumItems, maximumLength) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .slice(0, maximumItems)
    .map((item) => cleanString(item, maximumLength))
    .filter(Boolean);
}

function cleanPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price) || price < 0 || price > 100000) {
    return null;
  }

  return Math.round(price * 100) / 100;
}

export function sanitizeRigPayload(payload) {
  const rig = payload?.rig;

  if (!rig || typeof rig !== "object" || Array.isArray(rig)) {
    throw new RigValidationError("A generated rig is required.");
  }

  const instrument = cleanString(
    rig.builderData?.instrument,
    20,
  );

  if (!ALLOWED_INSTRUMENTS.has(instrument)) {
    throw new RigValidationError("The rig has an unsupported instrument.");
  }

  const budget = cleanPrice(rig.builderData?.budget);
  const totalPrice = cleanPrice(rig.totalPrice);

  if (budget === null || totalPrice === null) {
    throw new RigValidationError("The rig has invalid pricing data.");
  }

  if (!Array.isArray(rig.items) || rig.items.length === 0) {
    throw new RigValidationError(
      "The rig must contain at least one gear item.",
    );
  }

  const items = rig.items.slice(0, MAX_ITEMS).map((item) => {
    const name = cleanString(item?.name, 120);
    const category = cleanString(item?.category, 60);
    const price = cleanPrice(item?.price);

    if (!name || !category || price === null) {
      throw new RigValidationError(
        "The rig contains an invalid gear item.",
      );
    }

    return {
      name,
      category,
      brand: cleanString(item.brand, 80),
      description: cleanString(item.description, 500),
      price,
      format: cleanString(item.format, 40),
      watts:
        Number.isFinite(Number(item.watts)) && Number(item.watts) > 0
          ? Number(item.watts)
          : null,
    };
  });

  return {
    name: cleanString(rig.name, 120) || "Custom Heavy Rig",
    instrument,
    budget,
    totalPrice,
    remainingBudget: Math.round((budget - totalPrice) * 100) / 100,
    tone: cleanString(rig.builderData?.tone, 60),
    bands: cleanStringArray(rig.builderData?.bands, 6, 80),
    preferredBrands: cleanStringArray(
      rig.builderData?.brands,
      6,
      80,
    ),
    rigFormat: cleanString(rig.rigFormat, 40),
    items,
  };
}

export function buildRigTechRequest(rig) {
  return {
    model: "gpt-5.6-luna",
    input: [
      {
        role: "system",
        content: [
          "You are Brutal Rig's AI rig technician for metal and hardcore musicians.",
          "A deterministic recommendation engine already selected the physical gear, checked compatibility, and enforced the user's budget.",
          "Do not replace products, change prices, invent equipment, recommend amp sims, or add digital alternatives.",
          "Analyze only the supplied gear. Include only gear that actually appears in the rig when writing the signal chain or settings.",
          "Treat knob values as practical starting points, not exact or guaranteed artist settings.",
          "The upgrade path may name only one allowed upgrade category from the schema, never a specific unlisted product.",
          "Keep every section concise, practical, and specific to the user's tone and favorite bands.",
        ].join(" "),
      },
      {
        role: "user",
        content: `Create a tone plan for this verified rig:\n${JSON.stringify(rig)}`,
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "brutal_rig_tone_plan",
        schema: rigTechSchema,
        strict: true,
      },
    },
    reasoning: {
      effort: "low",
    },
    max_output_tokens: 1400,
  };
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function parseRigTechAdvice(outputText) {
  let advice;

  try {
    advice = JSON.parse(outputText);
  } catch {
    throw new Error("Rig Tech returned invalid JSON.");
  }

  if (
    !isNonEmptyString(advice?.toneSummary) ||
    !Array.isArray(advice.signalChain) ||
    advice.signalChain.length === 0 ||
    !advice.signalChain.every(isNonEmptyString) ||
    !Array.isArray(advice.startingSettings) ||
    advice.startingSettings.length === 0 ||
    !advice.startingSettings.every(
      (setting) =>
        isNonEmptyString(setting?.gear) &&
        isNonEmptyString(setting?.control) &&
        isNonEmptyString(setting?.value) &&
        isNonEmptyString(setting?.reason),
    ) ||
    !Array.isArray(advice.setupNotes) ||
    advice.setupNotes.length === 0 ||
    !advice.setupNotes.every(isNonEmptyString) ||
    !upgradePriorities.includes(advice.upgradePath?.priority) ||
    !isNonEmptyString(advice.upgradePath?.reason) ||
    !isNonEmptyString(advice.upgradePath?.budgetGuidance) ||
    !isNonEmptyString(advice.startingPointNote)
  ) {
    throw new Error("Rig Tech returned an incomplete tone plan.");
  }

  return advice;
}

function getClientId(request) {
  if (typeof request.ip === "string" && request.ip.trim()) {
    return request.ip.trim();
  }

  const forwardedFor = request.headers?.["x-forwarded-for"];
  const forwardedValue = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor;

  if (typeof forwardedValue === "string" && forwardedValue.trim()) {
    return forwardedValue.split(",")[0].trim();
  }

  return "unknown-client";
}

export function createRigTechHandler(
  generateAdvice,
  { rateLimiter = createRequestRateLimiter() } = {},
) {
  return async function rigTechHandler(request, response) {
    response.set("Cache-Control", "no-store");

    if (request.method !== "POST") {
      response.set("Allow", "POST");
      response.status(405).json({ error: "Method not allowed." });
      return;
    }

    const rateLimit = rateLimiter(getClientId(request));

    if (!rateLimit.allowed) {
      response.set(
        "Retry-After",
        String(rateLimit.retryAfterSeconds),
      );
      response.status(429).json({
        error: "Too many Rig Tech requests. Please wait and try again.",
      });
      return;
    }

    try {
      const body =
        typeof request.body === "string"
          ? JSON.parse(request.body)
          : request.body;
      const rig = sanitizeRigPayload(body);
      const advice = await generateAdvice(rig);

      response.status(200).json({ advice });
    } catch (error) {
      const isValidationError =
        error instanceof SyntaxError ||
        error instanceof RigValidationError;

      if (isValidationError) {
        response.status(400).json({
          error: "This rig could not be analyzed. Generate a new rig and try again.",
        });
        return;
      }

      console.error("Rig Tech request failed", error);
      response.status(500).json({
        error: "Rig Tech is temporarily unavailable.",
      });
    }
  };
}
