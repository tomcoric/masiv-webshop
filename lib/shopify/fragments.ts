/**
 * Shopify GraphQL fragmenti — zajednički dijelovi upita
 * Kopiraj u: lib/shopify/fragments.ts
 */

export const IMAGE_FRAGMENT = `
  fragment ImageFragment on Image {
    url
    altText
    width
    height
  }
`

export const MONEY_FRAGMENT = `
  fragment MoneyFragment on MoneyV2 {
    amount
    currencyCode
  }
`

export const PRODUCT_VARIANT_FRAGMENT = `
  fragment ProductVariantFragment on ProductVariant {
    id
    title
    availableForSale
    quantityAvailable
    price {
      ...MoneyFragment
    }
    compareAtPrice {
      ...MoneyFragment
    }
    selectedOptions {
      name
      value
    }
    image {
      ...ImageFragment
    }
  }
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
`

export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    tags
    productType
    vendor
    createdAt
    updatedAt
    featuredImage {
      ...ImageFragment
    }
    images(first: 10) {
      edges {
        node {
          ...ImageFragment
        }
      }
    }
    priceRange {
      minVariantPrice { ...MoneyFragment }
      maxVariantPrice { ...MoneyFragment }
    }
    compareAtPriceRange {
      minVariantPrice { ...MoneyFragment }
      maxVariantPrice { ...MoneyFragment }
    }
    variants(first: 50) {
      edges {
        node {
          ...ProductVariantFragment
        }
      }
    }
    options {
      id
      name
      values
    }
    seo {
      title
      description
    }
    metafields(identifiers: [
      { namespace: "custom", key: "rok_isporuke" },
      { namespace: "custom", key: "materijal" },
      { namespace: "custom", key: "odrzavanje" }
    ]) {
      key
      value
      namespace
    }
  }
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`

export const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                id
                title
                handle
                featuredImage {
                  ...ImageFragment
                }
              }
              price {
                ...MoneyFragment
              }
              selectedOptions {
                name
                value
              }
            }
          }
          cost {
            totalAmount { ...MoneyFragment }
            subtotalAmount { ...MoneyFragment }
          }
        }
      }
    }
    cost {
      subtotalAmount { ...MoneyFragment }
      totalAmount { ...MoneyFragment }
      totalTaxAmount { ...MoneyFragment }
    }
    discountCodes {
      code
      applicable
    }
  }
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
`
