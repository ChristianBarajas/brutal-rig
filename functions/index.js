import OpenAI from "openai";
import { defineSecret } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";
import {
  buildRigTechRequest,
  createRigTechHandler,
  parseRigTechAdvice,
} from "./src/rigTechCore.js";
import {
  buildRefineRigRequest,
  createRefineRigHandler,
  parseRefineRigProposal,
} from "./src/refineRigCore.js";

const openaiApiKey = defineSecret("OPENAI_API_KEY");

async function generateRigTechAdvice(rig) {
  const openai = new OpenAI({
    apiKey: openaiApiKey.value(),
  });

  const modelResponse = await openai.responses.create(
    buildRigTechRequest(rig),
  );

  if (!modelResponse.output_text) {
    throw new Error("Rig Tech returned no output.");
  }

  return parseRigTechAdvice(modelResponse.output_text);
}

export const rigTech = onRequest(
  {
    region: "us-west1",
    secrets: [openaiApiKey],
    timeoutSeconds: 60,
    maxInstances: 1,
    concurrency: 2,
  },
  createRigTechHandler(generateRigTechAdvice),
);

async function generateRefineRigProposal(input) {
  const openai = new OpenAI({ apiKey: openaiApiKey.value() });
  const modelResponse = await openai.responses.create(buildRefineRigRequest(input));
  if (!modelResponse.output_text) {
    throw new Error("Refine My Rig returned no output.");
  }
  return parseRefineRigProposal(modelResponse.output_text, input.builderData, input.request);
}

export const refineRig = onRequest(
  {
    region: "us-west1",
    secrets: [openaiApiKey],
    timeoutSeconds: 60,
    maxInstances: 1,
    concurrency: 2,
  },
  createRefineRigHandler(generateRefineRigProposal),
);
