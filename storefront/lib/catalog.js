import { readdirSync } from "node:fs";
import path from "node:path";
import { gear } from "../../src/data/gear.js";

const imageIds = new Set(
  readdirSync(path.join(process.cwd(), "public", "gear"))
    .filter((file) => file.endsWith(".webp"))
    .map((file) => file.slice(0, -5)),
);
const sharedImages = {
  "boss-tu-02-bass": "boss-tu-02",
  "boss-tu-3-bass": "boss-tu-3",
  "bass-instrument-cable": "guitar-instrument-cable",
  "bass-speaker-cable": "speaker-cable",
};

const categories = {
  instruments: "Instrument",
  amps: "Amplifier",
  cabinets: "Cabinet",
  tuners: "Tuner",
  pedals: "Pedal",
  accessories: "Accessory",
};

// The existing rig builder owns this catalog. The storefront only projects
// its fields into a read-only product view for the GraphQL API.
const products = Object.entries(gear).flatMap(([instrument, sections]) =>
  Object.entries(categories).flatMap(([section, category]) =>
    (sections[section] ?? []).map((item) => ({
      id: item.id,
      name: item.name,
      brand: item.brand,
      category,
      instrument: instrument.toUpperCase(),
      description: item.description,
      estimatedPrice: item.price,
      imageUrl: imageIds.has(sharedImages[item.id] ?? item.id)
        ? `/gear/${sharedImages[item.id] ?? item.id}.webp`
        : null,
      imageKind: imageIds.has(sharedImages[item.id] ?? item.id)
        ? (item.id === "boss-sd1" ? "PHOTO" : "ILLUSTRATION")
        : null,
    })),
  ),
);

export function listBrands() {
  return [...new Set(products.map((product) => product.brand).filter(Boolean))].sort();
}

export function getProduct(id) {
  return products.find((product) => product.id === id) ?? null;
}

export function listProducts(filter = {}) {
  const { search, brand, minPrice, maxPrice } = filter;
  if (
    (minPrice != null && (!Number.isFinite(minPrice) || minPrice < 0)) ||
    (maxPrice != null && (!Number.isFinite(maxPrice) || maxPrice < 0)) ||
    (minPrice != null && maxPrice != null && minPrice > maxPrice)
  ) {
    throw new Error("Choose a valid minimum and maximum price.");
  }

  const term = search?.trim().toLowerCase();

  return products
    .filter((product) =>
      (!term || [product.name, product.brand?.replaceAll("-", " "), product.category, product.instrument, product.description]
        .some((value) => value?.toLowerCase().includes(term))) &&
      (!brand || product.brand === brand) &&
      (minPrice == null || product.estimatedPrice >= minPrice) &&
      (maxPrice == null || product.estimatedPrice <= maxPrice),
    )
    .sort((a, b) => a.estimatedPrice - b.estimatedPrice || a.name.localeCompare(b.name));
}
