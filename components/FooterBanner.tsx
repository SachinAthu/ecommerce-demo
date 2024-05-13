"use client"

import { useNextSanityImage } from "next-sanity-image"

import { BannerType } from "@/lib/types"
import { client } from "@/lib/client"
import Link from "next/link"
import Image from "next/image"

export default function FooterBanner({
  banner: {
    image,
    discount,
    largeText1,
    largeText2,
    saleTime,
    midText,
    product,
    buttonText,
    smallText,
    desc,
  },
}: {
  banner: BannerType
}) {
  const imageProps = useNextSanityImage(client, image)

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>

        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <Image
          {...imageProps}
          alt="footer banner"
          className="footer-banner-image"
        />
      </div>
    </div>
  )
}
