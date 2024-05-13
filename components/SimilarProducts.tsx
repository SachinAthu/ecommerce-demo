import { ProductType } from "@/lib/types"
import { Product } from "."

export default function SimilarProducts({
  products,
}: {
  products: ProductType[]
}) {
  return (
    <div className="maylike-products-wrapper">
      <h2>You may also like</h2>

      <div className="marquee">
        <div className="maylike-products-container track">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
