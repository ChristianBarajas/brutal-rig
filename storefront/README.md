# Brutal Rig · Search Gear

Search Gear is a companion feature in development for the Brutal Rig rig builder. It reads the existing `src/data/gear.js` catalog without changing the deployed Vite/Firebase application. The product is still about building a complete rig; this feature helps players explore the gear first. The separate Next.js app provides hands-on practice with React, GraphQL, Apollo Client, product pages, and server-rendered metadata.

## Run

From the repository root:

```bash
npm install --prefix storefront
npm run dev --prefix storefront
```

Open [http://localhost:3000](http://localhost:3000). The GraphQL endpoint and its development explorer are at [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql). Run `npm test --prefix storefront` and `npm run build --prefix storefront` to verify the milestone. Use Node.js 20.9+.

## Follow one request

1. `components/GearCatalog.jsx` holds the search, brand, and price inputs. Apollo's `useQuery` sends the `GearCatalog` query from `lib/queries.js` with a `filter` variable.
2. `app/ApolloWrapper.jsx` configures Apollo Client's HTTP link to `/api/graphql` and its normalized in-memory cache.
3. Next.js maps that URL to `app/api/graphql/route.js`. GraphQL Yoga parses and validates the query against `lib/schema.js`.
4. The `products` resolver passes the search and filters to `lib/catalog.js`, which projects the existing `../src/data/gear.js` arrays into products and filters them. The search matches name, brand, category, instrument, and description; brand and price filters narrow those results.
5. The JSON response returns through Apollo to React, which renders product cards or loading, empty, and error states.

## Gear notes

Two product pages currently have short, sourced notes: BOSS SD-1 (classic design) and Katana-100 Gen 3 (modern model). `lib/gearStories.js` keeps these notes separate from the rig builder's scoring data. The GraphQL `Product.learningNote` field resolves by product ID and is nullable, so other gear pages still render normally. The catalog query requests just the era badge; the detail query requests the full note and manufacturer source. These are curated examples, not an automatic historical classification of the entire catalog. Click the featured links near the top of Search Gear to compare the two.

## Gear visuals

Search Gear copies the existing Brutal Rig visuals into `storefront/public/gear/`. `lib/catalog.js` maps product IDs to image URLs, including four shared visuals for tuner and cable variants. GraphQL exposes `imageUrl` and `imageKind` so both the card and detail page use `components/GearVisual.jsx`. Next.js optimizes the local WebP images; the component falls back to the category initial if an image cannot load.

These are AI-generated illustrations, except the adapted BOSS SD-1 photo. Illustrations are visual guides and may differ from the exact model or finish. The SD-1 photo and license are credited in the UI and `public/gear/CREDITS.md`. If the original app receives new images, copy them into this app's public folder and rebuild; there is no automatic synchronization between deployed apps.

## Follow a product page

1. A product name links to `/gear/<product-id>` with Next.js `Link`.
2. `app/gear/[id]/page.jsx` receives that ID as an async route parameter.
3. The server calls `lib/product.js`, which executes the `GearDetail` GraphQL operation against the **same schema** used by `/api/graphql`. This avoids calling our own server over HTTP during rendering. Apollo still owns the browser catalog query.
4. The `product` resolver finds the item in `lib/catalog.js`; an unknown ID returns `null` and the page renders a real 404.
5. `generateMetadata` gives each product its own title and description. `generateStaticParams` generates the catalog's 45 product pages as HTML at build time. If the underlying demo catalog changes, rebuild the storefront to refresh those pages.

Try a product: [http://localhost:3000/gear/ibanez-rga42fm](http://localhost:3000/gear/ibanez-rga42fm). View page source and find its name and `<title>` before JavaScript runs. Then change the ID to `missing-product` and observe the 404. Compare that server path with the browser query above.

Try this in the GraphQL explorer:

```graphql
query {
  products(filter: { search: "Ibanez", brand: "ibanez", maxPrice: 600 }) {
    id
    name
    estimatedPrice
  }
}
```

All prices are **demo estimates** inherited from the existing catalog. This app has no inventory, real checkout, or payments.

## Price scout (one model)

The BOSS Katana-100 Gen 3 product page has an optional, on-demand eBay listing lookup. The player chooses new or used, Apollo calls GraphQL `offers`, and the server gets an eBay application token and searches the Browse API. `lib/ebayOffers.js` keeps the credentials server-side, filters out obvious wrong models and auctions, and preserves eBay's result order. The page displays the listing price, separately identifies known shipping, and links to eBay for purchase. It never calls these offers the lowest price on the internet; shipping and taxes may differ by buyer. Other gear pages continue to use estimated prices only.

To try live listings, create an eBay Developer account and get **Production** App ID (client ID) and Cert ID (client secret). Copy `.env.example` to `storefront/.env.local`, fill the two values, and restart the Next.js dev server. Keep the file local; `.gitignore` excludes it. Without credentials, or if eBay fails, the page shows direct Google Shopping and eBay searches instead. The mock-backed tests run without credentials: `npm test --prefix storefront`. Credentials and an actual eBay response are required to verify live results.

The GraphQL query is restricted to one catalog ID for this milestone. The server asks eBay for US fixed-price listings, then returns up to four potential model matches. This is an offer-discovery experiment, not a checkout or a retailer-stock guarantee. Expand to more products only after verifying real results and the exact model matching for each category.

## Integration path

The existing Firebase-hosted Vite rig builder remains the main product. Both apps now have navigation between Search Gear and Build a Rig. Run both locally to try the full flow; production navigation appears in the main app only after a real Search Gear URL is configured. See [INTEGRATION.md](INTEGRATION.md) for local commands, deployment order, and a clear explanation of the two runtimes. No store, cart, checkout, or payment flow is planned for this feature.
