export type ProductType = {
  _type: string
  slug: { current: string; _type: "slug" }
  price: number
  _createdAt: string
  name: string
  details: string
  _id: string
  _updatedAt: string
  image: { _type: string; asset: [Object]; _key: string }[]
  _rev: string
}

export type CartProductType = ProductType & { quantity: number }

export type BannerType = {
  desc: string
  image: { _type: string; asset: [Object] }
  discount: string
  _createdAt: string
  saleTime: string
  largeText1: string
  _updatedAt: string
  largeText2: string
  _id: string
  _rev: string
  _type: string
  midText: string
  buttonText: string
  product: string
  smallText: string
}
