const configuredUrl = process.env.NEXT_PUBLIC_BRUTAL_RIG_URL?.trim();
export const mainSiteUrl = (configuredUrl ||
  (process.env.NODE_ENV === "production" ? "https://brutal-rig.web.app" : "http://localhost:5173"))
  .replace(/\/$/, "");
