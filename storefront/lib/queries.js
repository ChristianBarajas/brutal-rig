import { gql } from "@apollo/client";

export const GEAR_CATALOG = gql`
  query GearCatalog($filter: ProductFilter) {
    brands
    products(filter: $filter) {
      id
      name
      brand
      category
      instrument
      description
      estimatedPrice
      imageUrl
      imageKind
      learningNote { era }
    }
  }
`;

export const GEAR_DETAIL = gql`
  query GearDetail($id: ID!) {
    product(id: $id) {
      id
      name
      brand
      category
      instrument
      description
      estimatedPrice
      imageUrl
      imageKind
      learningNote {
        era
        whyItMatters
        tryThis
        sourceName
        sourceUrl
      }
    }
  }
`;

export const GEAR_OFFERS = gql`
  query GearOffers($productId: ID!, $condition: OfferCondition!) {
    offers(productId: $productId, condition: $condition) {
      status
      condition
      checkedAt
      offers { id title condition price shipping knownSubtotal url }
    }
  }
`;
