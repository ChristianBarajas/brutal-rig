"use client";

import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import Link from "next/link";
import GearVisual from "./GearVisual.jsx";
import { GEAR_CATALOG } from "../lib/queries.js";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function GearCatalog() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filter = {
    ...(search.trim() && { search: search.trim() }),
    ...(brand && { brand }),
    ...(minPrice !== "" && { minPrice: Number(minPrice) }),
    ...(maxPrice !== "" && { maxPrice: Number(maxPrice) }),
  };
  const invalidRange = (minPrice !== "" && Number(minPrice) < 0) ||
    (maxPrice !== "" && Number(maxPrice) < 0) ||
    (minPrice !== "" && maxPrice !== "" && Number(minPrice) > Number(maxPrice));
  function resetFilters() {
    setSearch("");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");
  }
  const { data, loading, error, refetch } = useQuery(GEAR_CATALOG, {
    variables: { filter },
    skip: invalidRange,
  });
  const products = data?.products ?? [];

  return (
    <section className="catalog-shell" aria-labelledby="catalog-heading">
      <div className="filters" aria-label="Filter gear">
        <label className="search-filter">
          <span className="search-prompt">Search the gear catalog</span>
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try Ibanez, distortion, bass amp…" autoComplete="off" />
        </label>
        <label>
          Brand
          <select value={brand} onChange={(event) => setBrand(event.target.value)}>
            <option value="">All brands</option>
            {(data?.brands ?? []).map((option) => (
              <option key={option} value={option}>{option.replaceAll("-", " ")}</option>
            ))}
          </select>
        </label>
        <label>
          Min price ($)
          <input type="number" min="0" step="0.01" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="Any" />
        </label>
        <label>
          Max price ($)
          <input type="number" min="0" step="0.01" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Any" />
        </label>
        <button type="button" className="reset-button" onClick={resetFilters}>
          Reset filters
        </button>
      </div>

      <div className="catalog-meta">
        <p className="demo-notice" role="note">Prices are estimates · Retailer stock is not tracked</p>
        <div className="featured-stories" aria-label="Featured gear notes">
          <span>Go deeper:</span>
          <Link href="/gear/boss-sd1">BOSS SD-1 ↗</Link>
          <Link href="/gear/boss-katana-100-gen-3">Katana Gen 3 ↗</Link>
        </div>
      </div>
      <div className="section-heading">
        <h2 id="catalog-heading">Explore the gear</h2>
        <p className="result-count" aria-live="polite">
          {loading ? "Loading…" : `${products.length} ${products.length === 1 ? "item" : "items"}`}
        </p>
      </div>

      {invalidRange && <p className="state-card" role="alert">Enter prices of $0 or more, with the minimum no higher than the maximum.</p>}
      {!invalidRange && loading && <p className="state-card" role="status">Loading gear from the GraphQL catalog…</p>}
      {!invalidRange && error && (
        <div className="state-card" role="alert">
          <p>Could not load the catalog. {error.message}</p>
          <button type="button" onClick={() => refetch()}>Try again</button>
        </div>
      )}
      {!invalidRange && !loading && !error && products.length === 0 && (
        <div className="state-card">
          <p>No gear matches that search and those filters.</p>
          <button type="button" onClick={resetFilters}>Clear search and filters</button>
        </div>
      )}
      {!invalidRange && !loading && !error && products.length > 0 && (
        <ul className="product-grid">
          {products.map((product) => (
            <li key={product.id} className="product-card">
              <GearVisual name={product.name} imageUrl={product.imageUrl} imageKind={product.imageKind} category={product.category} instrument={product.instrument} />
              <div className="product-info">
                <p className="product-category">{product.instrument.toLowerCase()} / {product.category}</p>
                {product.learningNote && <p className="story-badge">{product.learningNote.era} · Learn more</p>}
                <h3><Link className="product-link" href={`/gear/${encodeURIComponent(product.id)}`}>{product.name}</Link></h3>
                <p className="product-description">{product.description}</p>
                <div className="product-bottom">
                  <span className="product-brand">{product.brand?.replaceAll("-", " ") ?? "Brand not listed"}</span>
                  <strong>{formatPrice(product.estimatedPrice)}</strong>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
