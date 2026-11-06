"use client";

import { useEffect, useState } from "react";
import ApolloWrapper from "../app/ApolloWrapper.jsx";
import GearCatalog from "./GearCatalog.jsx";

export default function CatalogClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // This first catalog slice fetches in the browser. Product-page SSR is the
  // next milestone and will use a server-side Apollo client.
  if (!mounted) {
    return <section className="catalog-shell" role="status">Preparing gear catalog…</section>;
  }

  return (
    <ApolloWrapper>
      <GearCatalog />
    </ApolloWrapper>
  );
}
