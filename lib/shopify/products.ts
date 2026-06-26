/**
 * Shopify funkcije za dohvat proizvoda
 * Kopiraj u: lib/shopify/products.ts
 */

import { shopifyFetch } from './client'
import { PRODUCT_FRAGMENT } from './fragments'
import type { ShopifyProduct, ShopifyCollection, Product } from './types'

// Helper: pretvori edges/node u niz
function normalizeProduct(product: ShopifyProduct): Product {
  return {
    ...product,
    images: product.images.edges.map((e) => e.node),
    variants: product.variants.edges.map((e) => e.node),
  }
}

// ─── Svi proizvodi ───────────────────────────────────────────────────────────

export async function getAllProducts({
  first = 20,
  after,
  sortKey = 'CREATED_AT',
  reverse = true,
  query,
}: {
  first?: number
  after?: string
  sortKey?: 'CREATED_AT' | 'PRICE' | 'BEST_SELLING' | 'TITLE' | 'RELEVANCE'
  reverse?: boolean
  query?: string
} = {}): Promise<{ products: Product[]; hasNextPage: boolean; endCursor: string | null }> {
  const data = await shopifyFetch<{
    products: {
      edges: { node: ShopifyProduct; cursor: string }[]
      pageInfo: { hasNextPage: boolean; endCursor: string | null }
    }
  }>({
    query: `
      query GetProducts($first: Int!, $after: String, $sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
        products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, query: $query) {
          edges {
            cursor
            node {
              ...ProductFragment
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { first, after, sortKey, reverse, query },
    tags: ['products'],
  })

  return {
    products: data.products.edges.map((e) => normalizeProduct(e.node)),
    hasNextPage: data.products.pageInfo.hasNextPage,
    endCursor: data.products.pageInfo.endCursor,
  }
}

// ─── Jedan proizvod po handle-u ──────────────────────────────────────────────

export async function getProduct(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: `
      query GetProduct($handle: String!) {
        product(handle: $handle) {
          ...ProductFragment
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { handle },
    tags: [`product-${handle}`],
  })

  if (!data.product) return null
  return normalizeProduct(data.product)
}

// ─── Proizvodi po kolekciji ───────────────────────────────────────────────────

export async function getProductsByCollection({
  collectionHandle,
  first = 20,
  after,
  sortKey = 'CREATED_AT',
  reverse = true,
}: {
  collectionHandle: string
  first?: number
  after?: string
  sortKey?: 'CREATED_AT' | 'PRICE' | 'BEST_SELLING' | 'TITLE' | 'MANUAL'
  reverse?: boolean
}): Promise<{ products: Product[]; hasNextPage: boolean; endCursor: string | null }> {
  const data = await shopifyFetch<{
    collection: {
      products: {
        edges: { node: ShopifyProduct; cursor: string }[]
        pageInfo: { hasNextPage: boolean; endCursor: string | null }
      }
    } | null
  }>({
    query: `
      query GetCollectionProducts($handle: String!, $first: Int!, $after: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
        collection(handle: $handle) {
          products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
            edges {
              cursor
              node {
                ...ProductFragment
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { handle: collectionHandle, first, after, sortKey, reverse },
    tags: [`collection-${collectionHandle}`],
  })

  if (!data.collection) return { products: [], hasNextPage: false, endCursor: null }

  return {
    products: data.collection.products.edges.map((e) => normalizeProduct(e.node)),
    hasNextPage: data.collection.products.pageInfo.hasNextPage,
    endCursor: data.collection.products.pageInfo.endCursor,
  }
}

// ─── Pretraga proizvoda ───────────────────────────────────────────────────────

export async function searchProducts(searchQuery: string, first = 20): Promise<Product[]> {
  const { products } = await getAllProducts({
    first,
    query: searchQuery,
    sortKey: 'RELEVANCE',
    reverse: false,
  })
  return products
}

// ─── Preporučeni / slični proizvodi ─────────────────────────────────────────

export async function getRecommendedProducts(productId: string): Promise<Product[]> {
  const data = await shopifyFetch<{
    productRecommendations: ShopifyProduct[]
  }>({
    query: `
      query GetRecommendedProducts($productId: ID!) {
        productRecommendations(productId: $productId) {
          ...ProductFragment
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { productId },
    cache: 'no-store',
  })

  return data.productRecommendations.map(normalizeProduct)
}

// ─── Kolekcije ────────────────────────────────────────────────────────────────

export async function getCollections(): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<{
    collections: { edges: { node: ShopifyCollection }[] }
  }>({
    query: `
      query GetCollections {
        collections(first: 20) {
          edges {
            node {
              id
              handle
              title
              description
              image {
                url
                altText
                width
                height
              }
              seo {
                title
                description
              }
            }
          }
        }
      }
    `,
    tags: ['collections'],
  })

  return data.collections.edges.map((e) => e.node)
}

export async function getCollection(handle: string): Promise<ShopifyCollection | null> {
  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>({
    query: `
      query GetCollection($handle: String!) {
        collection(handle: $handle) {
          id
          handle
          title
          description
          image {
            url
            altText
            width
            height
          }
          seo {
            title
            description
          }
        }
      }
    `,
    variables: { handle },
    tags: [`collection-${handle}`],
  })

  return data.collection
}
