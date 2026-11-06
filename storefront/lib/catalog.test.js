import assert from "node:assert/strict";
import test from "node:test";
import { graphql, print } from "graphql";
import { getProduct, listBrands, listProducts } from "./catalog.js";
import { GEAR_DETAIL } from "./queries.js";
import { schema } from "./schema.js";

test("projects existing guitar and bass items without changing the source data", () => {
  const products = listProducts();
  assert.ok(products.length >= 40);
  assert.ok(products.some((item) => item.instrument === "GUITAR"));
  assert.ok(products.some((item) => item.instrument === "BASS"));
  assert.equal(new Set(products.map((item) => item.id)).size, products.length);
  assert.ok(listBrands().includes("ibanez"));
  assert.ok(listBrands().every((brand) => typeof brand === "string"));
  assert.ok(products.every((item) => item.imageUrl?.startsWith("/gear/")));
  assert.equal(products.filter((item) => item.imageKind === "PHOTO").length, 1);
  assert.equal(products.find((item) => item.id === "boss-tu-3-bass").imageUrl, "/gear/boss-tu-3.webp");
});

test("the page's combined query returns all products, including unbranded accessories", async () => {
  const result = await graphql({
    schema,
    source: `query GearCatalog($filter: ProductFilter) {
      brands
      products(filter: $filter) {
        id name brand category instrument description estimatedPrice
      }
    }`,
    variableValues: { filter: {} },
  });
  assert.equal(result.errors, undefined);
  assert.equal(result.data.products.length, listProducts().length);
  assert.ok(result.data.products.some((item) => item.brand === null));
  assert.ok(result.data.brands.every((brand) => typeof brand === "string"));
});

test("GraphQL filters brand and inclusive price range", async () => {
  const result = await graphql({
    schema,
    source: `query($filter: ProductFilter) {
      products(filter: $filter) { id brand estimatedPrice }
    }`,
    variableValues: { filter: { brand: "ibanez", minPrice: 300, maxPrice: 600 } },
  });
  assert.equal(result.errors, undefined);
  assert.ok(result.data.products.length > 0);
  assert.ok(result.data.products.every((item) =>
    item.brand === "ibanez" && item.estimatedPrice >= 300 && item.estimatedPrice <= 600,
  ));
});

test("GraphQL searches gear text and combines search with price and brand filters", async () => {
  const result = await graphql({
    schema,
    source: "query($filter: ProductFilter) { products(filter: $filter) { id name brand estimatedPrice } }",
    variableValues: { filter: { search: "  ibanez  ", brand: "ibanez", minPrice: 300, maxPrice: 500 } },
  });
  assert.equal(result.errors, undefined);
  assert.equal(result.data.products.length, 2);
  assert.ok(result.data.products.every((item) =>
    item.name.toLowerCase().includes("ibanez") && item.estimatedPrice >= 300 && item.estimatedPrice <= 500,
  ));

  const description = await graphql({
    schema,
    source: "{ products(filter: { search: \"dual-humbucker\" }) { id } }",
  });
  assert.equal(description.errors, undefined);
  assert.ok(description.data.products.some((item) => item.id === "ibanez-grg121sp"));
});

test("GraphQL returns an empty list for a valid filter and an error for an invalid range", async () => {
  const empty = await graphql({
    schema,
    source: "{ products(filter: { brand: \"no-such-brand\" }) { id } }",
  });
  assert.deepEqual(empty.data.products, []);
  const invalid = await graphql({
    schema,
    source: "{ products(filter: { minPrice: 900, maxPrice: 100 }) { id } }",
  });
  assert.match(invalid.errors[0].message, /valid minimum and maximum/);
});

test("looks up a detail product by ID and returns null for an unknown ID", async () => {
  const id = "ibanez-rga42fm";
  const found = await graphql({
    schema,
    source: "query($id: ID!) { product(id: $id) { id name estimatedPrice } }",
    variableValues: { id },
  });
  assert.equal(found.errors, undefined);
  assert.equal(found.data.product.id, id);
  assert.equal(found.data.product.name, getProduct(id).name);

  const missing = await graphql({
    schema,
    source: "query($id: ID!) { product(id: $id) { id } }",
    variableValues: { id: "missing-product" },
  });
  assert.equal(missing.errors, undefined);
  assert.equal(missing.data.product, null);
});

test("detail query includes sourced learning notes for two curated items only", async () => {
  for (const [id, era] of [["boss-sd1", "Classic design"], ["boss-katana-100-gen-3", "Modern model"]]) {
    const result = await graphql({ schema, source: print(GEAR_DETAIL), variableValues: { id } });
    assert.equal(result.errors, undefined);
    assert.equal(result.data.product.learningNote.era, era);
    assert.match(result.data.product.learningNote.sourceUrl, /^https:\/\/www\.boss\.info\//);
  }
  const ordinary = await graphql({ schema, source: print(GEAR_DETAIL), variableValues: { id: "ibanez-grg121sp" } });
  assert.equal(ordinary.errors, undefined);
  assert.equal(ordinary.data.product.learningNote, null);
});
