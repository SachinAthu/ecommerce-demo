"use client"

import React from "react"
import { useNextSanityImage } from "next-sanity-image"
import Link from "next/link"
import Image from "next/image"

import { ProductType } from "@/lib/types"
import { client } from "@/lib/client"

export default function Product({
  product: { image, slug, name, price },
}: {
  product: ProductType
}) {
  const imageProps = image ? useNextSanityImage(client, image[0]) : null

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          {imageProps && (
            <Image
              {...imageProps}
              style={{ maxWidth: "100%" }}
              alt={name}
              width={250}
              height={250}
              className="product-image"
            />
          )}

          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}
