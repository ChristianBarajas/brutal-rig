const DEFAULT_TIMEOUT_MS = 25000;

export async function requestRigTechAdvice(
  rig,
  { timeoutMs = DEFAULT_TIMEOUT_MS } = {},
) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    timeoutMs,
  );

  try {
    const response = await fetch("/api/rig-tech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rig }),
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        payload.error ??
          "Rig Tech could not analyze this build right now.",
      );
    }

    if (!payload.advice) {
      throw new Error(
        "Rig Tech returned an incomplete response.",
      );
    }

    return payload.advice;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "Rig Tech took too long to respond. Please try again.",
        { cause: error },
      );
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
