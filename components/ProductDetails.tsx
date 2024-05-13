"use client"

import { useState } from "react"
import { useNextSanityImage } from "next-sanity-image"
import Image from "next/image"
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai"

import { client } from "@/lib/client"
import { ProductType } from "@/lib/types"
import { useStateContext } from "@/contexts/StateContext"

export default function ProductDetails({ product }: { product: ProductType }) {
  const { image, name, price, details } = product
  const { onAdd } = useStateContext()
  const [index, setIndex] = useState(0)
  const [qty, setQty] = useState(1)

  const imageProps = (i: number = 0) => useNextSanityImage(client, image[i])

  const incQty = () => {
    setQty((prev) => prev + 1)
  }

  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1
      return prev - 1
    })
  }

  return (
    <div className="product-detail-container">
      <div>
        <div className="image-container">
          <Image
            {...imageProps(index)}
            style={{ maxWidth: "100%" }}
            alt={name}
            className="product-detail-image"
          />
        </div>

        <div className="small-images-container">
          {image?.map((img, i) => (
            <Image
              key={img._key}
              {...imageProps(i)}
              style={{ maxWidth: "100%" }}
              alt={name}
              className={
                i === index ? "small-image selected-image" : "small-image"
              }
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="product-detail-desc">
        <h1>{name}</h1>

        <div className="reviews">
          <div>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>

          <p>20</p>
        </div>

        <h4>Details</h4>
        <p>{details}</p>
        <p className="price">${price}</p>

        <div className="quantity">
          <h3>Quantity</h3>
          <p className="quantity-desc">
            <span className="minus" onClick={decQty}>
              <AiOutlineMinus />
            </span>
            <span className="num">{qty}</span>
            <span className="plus" onClick={incQty}>
              <AiOutlinePlus />
            </span>
          </p>
        </div>

        <div className="buttons">
          <button
            type="button"
            className="add-to-cart"
            onClick={() => onAdd(product, qty)}
          >
            Add to Cart
          </button>
          <button type="button" className="buy-now" onClick={() => {}}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}
