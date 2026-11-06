# Search Gear integration

Brutal Rig's existing Vite/Firebase site remains the main product. Search Gear is a companion Next.js app in the same repository, reading the existing `src/data/gear.js` file. The main app's navbar links to Search Gear; Search Gear links back to the builder. Each app runs on its own host and keeps its own routing. Saved rigs, sign-in, recommendations, and AI tone plans stay in the original app.

## Try both apps locally

Open two terminals at the repository root (`~/Downloads/brutal-rig`):

```bash
# Terminal 1: existing rig builder
npm run dev
```

```bash
# Terminal 2: Search Gear
npm run dev --prefix storefront
```

Open `http://localhost:5173` and choose **Search Gear** in the desktop or mobile navigation. Search for `Ibanez`, open a product, then choose **Build a Rig** to return to `http://localhost:5173/builder`. The Search Gear app and GraphQL endpoint run at `http://localhost:3000` and `http://localhost:3000/api/graphql`.

Run both checks separately from the repository root:

```bash
npm run check
npm test --prefix storefront
npm run build --prefix storefront
```

The root ESLint config excludes `storefront/` because it uses Next.js server files and generated output rather than the root Vite lint rules.

## Publish without changing the builder's runtime

Firebase's classic Hosting config here serves a static Vite `dist/` and routes two AI API paths to Cloud Functions. Search Gear needs a running Next.js server for `/api/graphql` and image optimization, so it cannot be uploaded as static `dist/` files. Firebase App Hosting supports Next.js and a `storefront` root directory in this repository; create a **separate App Hosting backend** for Search Gear in the same Firebase project. Use its assigned URL to connect the two apps. The App Hosting backend may require the Blaze plan and incurs usage charges. Confirm its build can access the shared `src/data/gear.js` above the app root before publishing a link.

1. Commit the `storefront/` directory and the integration files to your GitHub repository. Do not deploy the root Vite site yet.
2. In Firebase Console → App Hosting, create a backend connected to that repository, with root directory `storefront` and the branch containing the code. Wait for the rollout, then visit its assigned URL, `/api/graphql`, one product page, and an optimized image.
3. On your Mac, create or edit the **root** `.env.production.local` with the verified URL (replace the example):

   ```dotenv
   VITE_SEARCH_GEAR_URL=https://YOUR-REAL-APP-HOSTING-URL
   ```

4. Run `npm run check`, then `firebase deploy --only hosting` from the repository root. This builds the Vite site first only if you ran `npm run check` or `npm run build`; `firebase deploy` does not rebuild it automatically. Verify the live navbar link, a catalog search, a product page, and the return link to `/builder`.

Until `VITE_SEARCH_GEAR_URL` is set for a production build, the Search Gear link is hidden on the deployed main site. In local Vite development it defaults to `http://localhost:3000`. Search Gear's return links default to `https://brutal-rig.web.app/builder` in production and `http://localhost:5173/builder` in development. If the main site gets a custom domain, set `NEXT_PUBLIC_BRUTAL_RIG_URL` for the Next.js build and roll out Search Gear again.

## How to explain the request path

1. The visitor clicks **Search Gear** on the existing site and opens the companion Next.js app.
2. The React search inputs set Apollo Client query variables. Apollo POSTs `GearCatalog` to the Next.js `/api/graphql` route.
3. GraphQL Yoga validates the query; the resolver filters the existing gear catalog and sends only requested fields.
4. Apollo caches the result by product ID and renders cards. A product link opens a Next.js route that executes the same schema server-side and generates page metadata.
5. **Build a Rig** returns to the existing Vite/Firebase builder; its recommendation and saved-rig behavior is unchanged.

There is no live inventory or checkout. Prices are estimates from the existing catalog.
