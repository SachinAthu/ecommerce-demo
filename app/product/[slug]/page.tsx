import { Metadata } from "next"

import { ProductDetails, SimilarProducts } from "@/components"
import { ProductType } from "@/lib/types"
import { client } from "@/lib/client"

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  // fetch product
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`
  const product: ProductType = await client.fetch(productQuery)

  if (!product) return {}

  return {
    title: product.name,
    description: product.details,
  }
}

export default async function Product({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`
  const product: ProductType = await client.fetch(productQuery)

  const similarProductsQuery = '*[_type == "product"]'
  const similarProducts: ProductType[] =
    await client.fetch(similarProductsQuery)

  return (
    <div>
      <ProductDetails product={product} />

      <SimilarProducts products={similarProducts} />
    </div>
  )
}
