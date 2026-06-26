/**
 * Shopify Storefront API klijent
 * Kopiraj u: lib/shopify/client.ts
 */

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!
const SHOPIFY_API_VERSION = '2024-01'

export const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`

export async function shopifyFetch<T>({
  query,
  variables,
  tags,
  cache = 'force-cache',
}: {
  query: string
  variables?: Record<string, unknown>
  tags?: string[]
  cache?: RequestCache
}): Promise<T> {
  const res = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: tags ? { tags } : undefined,
  })

  if (!res.ok) {
    throw new Error(`Shopify API greška: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors) {
    throw new Error(`Shopify GraphQL greška: ${JSON.stringify(json.errors)}`)
  }

  return json.data as T
}
