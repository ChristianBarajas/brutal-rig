const productId = "boss-katana-100-gen-3";
const searchTerm = "Boss Katana-100 Gen 3 amplifier";
const tokenUrl = "https://api.ebay.com/identity/v1/oauth2/token";
const searchUrl = "https://api.ebay.com/buy/browse/v1/item_summary/search";
const scope = "https://api.ebay.com/oauth/api_scope";

let cachedToken = null;
let cachedSearch = new Map();

export const liveOffersProductId = productId;

function validListing(title) {
  const text = title.toLowerCase();
  return /\bboss\b/.test(text) && /\bkatana[\s-]*100\b/.test(text) &&
    /\b(?:gen(?:eration)?[\s-]*3|mk[\s-]*(?:3|iii))\b/.test(text) &&
    !/\b(?:artist|head|mk[\s-]*(?:2|ii)|gen[\s-]*2)\b/.test(text);
}

function asMoney(amount) {
  if (amount?.currency !== "USD") return null;
  const value = Number(amount.value);
  return Number.isFinite(value) && value >= 0 ? value : null;
}

function normalizeListing(item, condition) {
  if (!item?.itemId || !item?.title || !validListing(item.title)) return null;
  if (!Array.isArray(item.buyingOptions) || !item.buyingOptions.includes("FIXED_PRICE")) return null;

  const conditionId = Number(item.conditionId);
  const actualCondition = conditionId === 1000 || /^new\b/i.test(item.condition)
    ? "NEW" : /^used\b/i.test(item.condition) || (conditionId >= 3000 && conditionId < 7000)
      ? "USED" : null;
  if (actualCondition !== condition) return null;

  const price = asMoney(item.price);
  const shipping = asMoney(item.shippingOptions?.[0]?.shippingCost);
  let url;
  try {
    url = new URL(item.itemWebUrl);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || !["ebay.com", "www.ebay.com"].includes(url.hostname) || price === null) return null;

  return {
    id: item.itemId,
    title: item.title,
    condition: actualCondition,
    price,
    shipping,
    knownSubtotal: shipping === null ? null : Math.round((price + shipping) * 100) / 100,
    url: url.toString(),
  };
}

async function getToken(fetchImpl, clientId, clientSecret) {
  if (cachedToken?.clientId === clientId && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  const response = await fetchImpl(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials", scope }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("eBay token request failed");
  const data = await response.json();
  if (!data.access_token || !Number.isFinite(data.expires_in)) throw new Error("Invalid eBay token response");
  cachedToken = { clientId, value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cachedToken.value;
}

export async function findEbayOffers({ id, condition }, {
  fetchImpl = fetch,
  clientId = process.env.EBAY_CLIENT_ID,
  clientSecret = process.env.EBAY_CLIENT_SECRET,
} = {}) {
  if (id !== productId || !["NEW", "USED"].includes(condition)) {
    throw new Error("This offer search is not available for that product or condition.");
  }
  const empty = (status) => ({ status, condition, checkedAt: null, offers: [] });
  if (!clientId || !clientSecret) return empty("NOT_CONFIGURED");

  const cacheKey = `${clientId}:${condition}`;
  const cached = cachedSearch.get(cacheKey);
  if (cached?.expiresAt > Date.now()) return cached.result;

  try {
    const token = await getToken(fetchImpl, clientId, clientSecret);
    const url = new URL(searchUrl);
    url.searchParams.set("q", searchTerm);
    url.searchParams.set("limit", "30");
    url.searchParams.set("filter", `buyingOptions:{FIXED_PRICE},conditions:{${condition}},deliveryCountry:US`);
    const response = await fetchImpl(url, {
      headers: { Authorization: `Bearer ${token}`, "X-EBAY-C-MARKETPLACE-ID": "EBAY_US" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("eBay listing request failed");
    const data = await response.json();
    const summaries = data.total === 0 && data.itemSummaries === undefined ? [] : data.itemSummaries;
    if (!Array.isArray(summaries)) throw new Error("Invalid eBay listing response");

    const offers = summaries.map((item) => normalizeListing(item, condition)).filter(Boolean).slice(0, 4);
    const result = { status: offers.length ? "READY" : "NO_MATCH", condition, checkedAt: new Date().toISOString(), offers };
    cachedSearch.set(cacheKey, { expiresAt: Date.now() + 60_000, result });
    return result;
  } catch {
    return empty("UNAVAILABLE");
  }
}
