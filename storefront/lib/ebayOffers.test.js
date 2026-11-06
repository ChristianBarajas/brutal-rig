import assert from "node:assert/strict";
import test from "node:test";
import { graphql } from "graphql";
import { findEbayOffers, liveOffersProductId } from "./ebayOffers.js";
import { schema } from "./schema.js";

const product = { id: liveOffersProductId, condition: "NEW" };
const offer = (overrides = {}) => ({
  itemId: "offer-1",
  title: "Boss Katana-100 Gen 3 100W Guitar Combo Amplifier",
  condition: "New",
  conditionId: "1000",
  buyingOptions: ["FIXED_PRICE"],
  price: { value: "399.00", currency: "USD" },
  shippingOptions: [{ shippingCost: { value: "20.00", currency: "USD" } }],
  itemWebUrl: "https://www.ebay.com/itm/123456",
  ...overrides,
});

test("requires server-side credentials and rejects unsupported products before calling eBay", async () => {
  const fetchImpl = () => { throw new Error("should not fetch"); };
  assert.equal((await findEbayOffers(product, { clientId: "", clientSecret: "", fetchImpl })).status, "NOT_CONFIGURED");
  await assert.rejects(findEbayOffers({ id: "boss-sd1", condition: "NEW" }, { clientId: "x", clientSecret: "y", fetchImpl }));
  const result = await graphql({
    schema,
    source: 'query { offers(productId: "boss-sd1", condition: NEW) { status } }',
  });
  assert.equal(result.errors?.length, 1);
});

test("fetches matching fixed-price eBay listings in eBay order without inventing shipping", async () => {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url: String(url), options });
    return calls.length === 1
      ? { ok: true, json: async () => ({ access_token: "token", expires_in: 7200 }) }
      : { ok: true, json: async () => ({ itemSummaries: [
        offer(),
        offer({ itemId: "offer-2", price: { value: "370", currency: "USD" }, shippingOptions: [] }),
        offer({ itemId: "wrong-model", title: "Boss Katana-50 Gen 3 amplifier" }),
        offer({ itemId: "wrong-variant", title: "Boss Katana-100 Gen 3 Artist amplifier" }),
        offer({ itemId: "wrong-url", itemWebUrl: "https://other.example/item" }),
        offer({ itemId: "auction", buyingOptions: ["AUCTION"] }),
        offer({ itemId: "parts", condition: "For parts or not working", conditionId: "7000" }),
      ] }) };
  };
  const result = await findEbayOffers(product, { clientId: "test-client-a", clientSecret: "secret", fetchImpl });
  assert.equal(result.status, "READY");
  assert.deepEqual(result.offers.map((item) => item.id), ["offer-1", "offer-2"]);
  assert.equal(result.offers[0].knownSubtotal, 419);
  assert.equal(result.offers[1].shipping, null);
  assert.equal(result.offers[1].knownSubtotal, null);
  assert.match(calls[0].options.headers.Authorization, /^Basic /);
  assert.equal(calls[1].options.headers.Authorization, "Bearer token");
  assert.equal(new URL(calls[1].url).searchParams.get("filter"), "buyingOptions:{FIXED_PRICE},conditions:{NEW},deliveryCountry:US");
  assert.ok(result.checkedAt);
});

test("an empty provider response is a no-match result", async () => {
  let calls = 0;
  const fetchImpl = async () => {
    calls += 1;
    return calls === 1
      ? { ok: true, json: async () => ({ access_token: "token", expires_in: 7200 }) }
      : { ok: true, json: async () => ({ total: 0 }) };
  };
  const result = await findEbayOffers(product, { clientId: "test-client-empty", clientSecret: "secret", fetchImpl });
  assert.equal(result.status, "NO_MATCH");
  assert.deepEqual(result.offers, []);
});

test("returns a clear unavailable state for upstream errors and never exposes secrets", async () => {
  const fetchImpl = async () => ({ ok: false, status: 503 });
  const result = await findEbayOffers({ ...product, condition: "USED" }, { clientId: "test-client-b", clientSecret: "secret", fetchImpl });
  assert.deepEqual(result, { status: "UNAVAILABLE", condition: "USED", checkedAt: null, offers: [] });
  assert.equal(JSON.stringify(result).includes("secret"), false);
});
