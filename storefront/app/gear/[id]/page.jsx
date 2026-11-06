import Link from "next/link";
import { notFound } from "next/navigation";
import { listProducts } from "../../../lib/catalog.js";
import { loadProduct } from "../../../lib/product.js";
import GearVisual from "../../../components/GearVisual.jsx";
import SiteHeader from "../../../components/SiteHeader.jsx";
import GearOffers from "../../../components/GearOffers.jsx";
import ApolloWrapper from "../../ApolloWrapper.jsx";
import { liveOffersProductId } from "../../../lib/ebayOffers.js";
import { mainSiteUrl } from "../../../lib/mainSite.js";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export function generateStaticParams() {
  return listProducts().map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await loadProduct(id);
  if (!product) return { title: "Gear not found | Brutal Rig", robots: { index: false } };
  return {
    title: `${product.name} | Brutal Rig Search Gear`,
    description: `${product.description} Explore this ${product.category.toLowerCase()} in Brutal Rig's gear catalog. Prices are estimates.`,
  };
}

export default async function GearDetailPage({ params }) {
  const { id } = await params;
  const product = await loadProduct(id);
  if (!product) notFound();

  return (
    <main>
      <SiteHeader />
      <article className="detail-shell">
        <Link className="back-link" href="/">← Back to Search Gear</Link>
        <div className="detail-layout">
          <GearVisual name={product.name} imageUrl={product.imageUrl} imageKind={product.imageKind} category={product.category} instrument={product.instrument} large />
          <div className="detail-copy">
            <p className="eyebrow">{product.instrument.toLowerCase()} / {product.category}</p>
            <h1>{product.name}</h1>
            <p className="detail-brand">{product.brand?.replaceAll("-", " ") ?? "Brand not listed"}</p>
            <p className="detail-description">{product.description}</p>
            <div className="detail-price">
              <span>Estimated demo price</span>
              <strong>{formatPrice(product.estimatedPrice)}</strong>
            </div>
            <p className="detail-note">Price is an estimate from Brutal Rig's catalog. Availability and retailer stock are not tracked.</p>
            {product.id === liveOffersProductId && (
              <ApolloWrapper>
                <GearOffers productId={product.id} productName={product.name} />
              </ApolloWrapper>
            )}
            <a className="detail-builder-link" href={`${mainSiteUrl}/builder`}>Build a complete rig ↗</a>
            {product.learningNote && (
              <section className="learning-note" aria-labelledby="learning-heading">
                <p className="eyebrow">{product.learningNote.era} / Gear notes</p>
                <h2 id="learning-heading">Why it matters</h2>
                <p>{product.learningNote.whyItMatters}</p>
                <h3>Hear it for yourself</h3>
                <p>{product.learningNote.tryThis}</p>
                <a href={product.learningNote.sourceUrl} target="_blank" rel="noopener noreferrer">
                  Read the manufacturer source: {product.learningNote.sourceName}
                </a>
              </section>
            )}
          </div>
        </div>
      </article>
      <footer>Brutal Rig · Search Gear</footer>
    </main>
  );
}
