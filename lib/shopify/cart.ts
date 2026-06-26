/**
 * Shopify košarica (Cart) — Storefront API
 * Kopiraj u: lib/shopify/cart.ts
 */

import { shopifyFetch } from './client'
import { CART_FRAGMENT } from './fragments'
import type { ShopifyCart, Cart } from './types'

function normalizeCart(cart: ShopifyCart): Cart {
  return {
    ...cart,
    lines: cart.lines.edges.map((e) => e.node),
  }
}

// ─── Kreiraj košaricu ─────────────────────────────────────────────────────────

export async function createCart(): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: `
      mutation CartCreate {
        cartCreate {
          cart {
            ...CartFragment
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    cache: 'no-store',
  })

  return normalizeCart(data.cartCreate.cart)
}

// ─── Dohvati košaricu ─────────────────────────────────────────────────────────

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFragment
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId },
    cache: 'no-store',
  })

  if (!data.cart) return null
  return normalizeCart(data.cart)
}

// ─── Dodaj stavke ─────────────────────────────────────────────────────────────

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: `
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFragment
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, lines },
    cache: 'no-store',
  })

  return normalizeCart(data.cartLinesAdd.cart)
}

// ─── Ažuriraj količinu ────────────────────────────────────────────────────────

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query: `
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFragment
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
    cache: 'no-store',
  })

  return normalizeCart(data.cartLinesUpdate.cart)
}

// ─── Ukloni stavku ────────────────────────────────────────────────────────────

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: `
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...CartFragment
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, lineIds },
    cache: 'no-store',
  })

  return normalizeCart(data.cartLinesRemove.cart)
}

// ─── Promo kod ────────────────────────────────────────────────────────────────

export async function applyDiscountCode(cartId: string, discountCode: string): Promise<Cart> {
  const data = await shopifyFetch<{ cartDiscountCodesUpdate: { cart: ShopifyCart } }>({
    query: `
      mutation CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
        cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
          cart {
            ...CartFragment
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, discountCodes: [discountCode] },
    cache: 'no-store',
  })

  return normalizeCart(data.cartDiscountCodesUpdate.cart)
}

// ─── Postavi buyer identity (za HR dostavu) ───────────────────────────────────

export async function updateCartBuyerIdentity(
  cartId: string,
  buyerIdentity: {
    email?: string
    phone?: string
    countryCode?: string
  }
): Promise<Cart> {
  const data = await shopifyFetch<{ cartBuyerIdentityUpdate: { cart: ShopifyCart } }>({
    query: `
      mutation CartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
        cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
          cart {
            ...CartFragment
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, buyerIdentity },
    cache: 'no-store',
  })

  return normalizeCart(data.cartBuyerIdentityUpdate.cart)
}
