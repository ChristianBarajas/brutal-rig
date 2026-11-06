import { createSchema } from "graphql-yoga";
import { getProduct, listBrands, listProducts } from "./catalog.js";
import { getGearStory } from "./gearStories.js";
import { findEbayOffers } from "./ebayOffers.js";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    enum Instrument {
      GUITAR
      BASS
    }

    enum ImageKind {
      PHOTO
      ILLUSTRATION
    }

    type Product {
      id: ID!
      name: String!
      brand: String
      category: String!
      instrument: Instrument!
      description: String!
      estimatedPrice: Float!
      imageUrl: String
      imageKind: ImageKind
      learningNote: GearNote
    }

    type GearNote {
      era: String!
      whyItMatters: String!
      tryThis: String!
      sourceName: String!
      sourceUrl: String!
    }

    input ProductFilter {
      search: String
      brand: String
      minPrice: Float
      maxPrice: Float
    }

    enum OfferCondition { NEW USED }
    enum OfferStatus { READY NO_MATCH NOT_CONFIGURED UNAVAILABLE }

    type Offer {
      id: ID!
      title: String!
      condition: OfferCondition!
      price: Float!
      shipping: Float
      knownSubtotal: Float
      url: String!
    }

    type OfferSearch {
      status: OfferStatus!
      condition: OfferCondition!
      checkedAt: String
      offers: [Offer!]!
    }

    type Query {
      products(filter: ProductFilter): [Product!]!
      product(id: ID!): Product
      brands: [String!]!
      offers(productId: ID!, condition: OfferCondition!): OfferSearch!
    }
  `,
  resolvers: {
    Product: {
      learningNote: (product) => getGearStory(product.id),
    },
    Query: {
      products: (_, { filter }) => listProducts(filter ?? {}),
      product: (_, { id }) => getProduct(id),
      brands: () => listBrands(),
      offers: (_, { productId, condition }) => findEbayOffers({ id: productId, condition }),
    },
  },
});
