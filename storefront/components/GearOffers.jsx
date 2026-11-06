"use client";

import { useLazyQuery } from "@apollo/client/react";
import { useState } from "react";
import { GEAR_OFFERS } from "../lib/queries.js";

const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function GearOffers({ productId, productName }) {
  const [condition, setCondition] = useState("NEW");
  const [requestedCondition, setRequestedCondition] = useState(null);
  const [loadOffers, { data, loading, error }] = useLazyQuery(GEAR_OFFERS, { fetchPolicy: "network-only" });
  const result = requestedCondition === condition ? data?.offers : null;
  const query = encodeURIComponent(`${productName} amplifier`);

  return (
    <section className="offer-finder" aria-labelledby="offer-heading">
      <p className="eyebrow">Price scout / eBay</p>
      <h2 id="offer-heading">Check current listings</h2>
      <p className="offer-intro">See potential matches for this exact model before buying. Brutal Rig does not sell gear or handle payment.</p>

      <div className="offer-controls">
        <label htmlFor="offer-condition">Condition</label>
        <select id="offer-condition" value={condition} onChange={(event) => setCondition(event.target.value)}>
          <option value="NEW">New</option>
          <option value="USED">Used</option>
        </select>
        <button type="button" disabled={loading} onClick={() => {
          setRequestedCondition(condition);
          loadOffers({ variables: { productId, condition } });
        }}>
          {loading ? "Checking…" : "Find listings"}
        </button>
      </div>

      {error && <p className="offer-status" role="status">Live listings could not load. Use the direct searches below.</p>}
      {result?.status === "NOT_CONFIGURED" && <p className="offer-status" role="status">Live listing lookup is not connected yet. Use the direct searches below.</p>}
      {result?.status === "UNAVAILABLE" && <p className="offer-status" role="status">eBay listings are unavailable right now. Use the direct searches below.</p>}
      {result?.status === "NO_MATCH" && <p className="offer-status" role="status">No confident {condition.toLowerCase()} matches found. Try the direct searches and verify the exact model.</p>}
      {result?.status === "READY" && (
        <>
          <p className="offer-timestamp">eBay matches, checked {new Date(result.checkedAt).toLocaleString()}. Listings may change. eBay order is preserved.</p>
          <ul className="offer-list">
            {result.offers.map((offer) => (
              <li key={offer.id}>
                <div>
                  <p className="offer-title">{offer.title}</p>
                  <p className="offer-detail">{offer.condition === "NEW" ? "New" : "Used"} · Item {money(offer.price)} · {offer.shipping === null ? "Check shipping on eBay" : `Shipping ${money(offer.shipping)}`}</p>
                  <p className="offer-detail">{offer.knownSubtotal === null ? "Total depends on shipping and tax" : `Known item + shipping: ${money(offer.knownSubtotal)} before tax`}</p>
                </div>
                <a href={offer.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${offer.title} on eBay (opens a new tab)`}>View on eBay ↗</a>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="offer-links">
        <a href={`https://www.google.com/search?tbm=shop&q=${query}`} target="_blank" rel="noopener noreferrer">Compare on Google Shopping ↗</a>
        <a href={`https://www.ebay.com/sch/i.html?_nkw=${query}`} target="_blank" rel="noopener noreferrer">Search eBay directly ↗</a>
      </div>
      <p className="offer-footnote">Verify model, condition, shipping, seller details, and final tax on the retailer site. These are listings from one source, not a guaranteed lowest price.</p>
    </section>
  );
}
