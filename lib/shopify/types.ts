/**
 * Shopify Storefront API TypeScript tipovi
 * Kopiraj u: lib/shopify/types.ts
 */

export type ShopifyImage = {
  url: string
  altText: string | null
  width: number
  height: number
}

export type ShopifyMoneyV2 = {
  amount: string
  currencyCode: string
}

export type ShopifyProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  quantityAvailable: number | null
  price: ShopifyMoneyV2
  compareAtPrice: ShopifyMoneyV2 | null
  selectedOptions: {
    name: string
    value: string
  }[]
  image: ShopifyImage | null
}

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  tags: string[]
  productType: string
  vendor: string
  createdAt: string
  updatedAt: string
  featuredImage: ShopifyImage | null
  images: {
    edges: { node: ShopifyImage }[]
  }
  priceRange: {
    minVariantPrice: ShopifyMoneyV2
    maxVariantPrice: ShopifyMoneyV2
  }
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoneyV2
    maxVariantPrice: ShopifyMoneyV2
  }
  variants: {
    edges: { node: ShopifyProductVariant }[]
  }
  options: {
    id: string
    name: string
    values: string[]
  }[]
  seo: {
    title: string | null
    description: string | null
  }
  metafields: ({
    key: string
    value: string
    namespace: string
  } | null)[]
}

export type ShopifyCollection = {
  id: string
  handle: string
  title: string
  description: string
  image: ShopifyImage | null
  seo: {
    title: string | null
    description: string | null
  }
}

export type ShopifyCartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: {
      id: string
      title: string
      handle: string
      featuredImage: ShopifyImage | null
    }
    price: ShopifyMoneyV2
    selectedOptions: {
      name: string
      value: string
    }[]
  }
  cost: {
    totalAmount: ShopifyMoneyV2
    subtotalAmount: ShopifyMoneyV2
  }
}

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: {
    edges: { node: ShopifyCartLine }[]
  }
  cost: {
    subtotalAmount: ShopifyMoneyV2
    totalAmount: ShopifyMoneyV2
    totalTaxAmount: ShopifyMoneyV2 | null
  }
  discountCodes: {
    code: string
    applicable: boolean
  }[]
}

// Normalized tipovi (bez edges/node wrappera)
export type Product = Omit<ShopifyProduct, 'images' | 'variants'> & {
  images: ShopifyImage[]
  variants: ShopifyProductVariant[]
}

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: ShopifyCartLine[]
}
