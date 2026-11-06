const DEFAULT_TIMEOUT_MS = 25000;

export async function requestRigRefinement(builderData, request) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch("/api/refine-rig", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ builderData, request }),
      signal: controller.signal,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error ?? "Refine My Rig could not process that request.");
    }
    if (!payload.proposal?.preferences) {
      throw new Error("Refine My Rig returned an incomplete proposal.");
    }
    return payload.proposal;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Refine My Rig took too long. Please try again.", { cause: error });
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
