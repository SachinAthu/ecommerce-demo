import { client } from "@/lib/client"
import { HeroBanner, FooterBanner, Product } from "@/components"
import { ProductType } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function Home() {
  const productQuery = '*[_type == "product"]'
  const products: ProductType[] = await client.fetch(productQuery)
  // console.log(products)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return (
    <>
      <HeroBanner banner={bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speackers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner banner={bannerData && bannerData[0]} />
    </>
  )
}
