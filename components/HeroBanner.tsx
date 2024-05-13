"use client"

import Image from "next/image"
import Link from "next/link"
import { useNextSanityImage } from "next-sanity-image"

import { BannerType } from "@/lib/types"
import { client } from "@/lib/client"

export default function HeroBanner({
  banner: {
    image,
    smallText,
    midText,
    largeText1,
    largeText2,
    product,
    buttonText,
    desc,
  },
}: {
  banner: BannerType
}) {
  const imageProps = useNextSanityImage(client, image)

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>

        <h3>{midText}</h3>

        <h1>{largeText1}</h1>

        <Image
          {...imageProps}
          style={{ maxWidth: "100%", height: "auto" }}
          alt="headphones"
          className="hero-banner-image"
          // placeholder="blur"
          // blurDataURL={image.asset.metadata.lqip}
        />

        <div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>

          <div className="desc">
            <h5>Description</h5>

            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
