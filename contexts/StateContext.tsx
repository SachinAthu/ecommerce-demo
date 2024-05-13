"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react"
import { toast } from "react-hot-toast"

import { ProductType, CartProductType } from "@/lib/types"

type StateContextType = {
  showCart: boolean
  cartItems: CartProductType[]
  totalPrice: number
  totalQuantities: number

  setShowCart: (showCart: boolean) => void
  onAdd: (product: ProductType, quantity: number) => void
  toggleCartItemQty: (id: string, value: "inc" | "dec") => void
  remove: (id: string) => void
}

const StateContext = createContext<StateContextType | null>(null)
StateContext.displayName = "StateContext"

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState<CartProductType[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)

  const onAdd = (product: ProductType, quantity: number) => {
    const isProductInCart = cartItems.find((p) => p._id === product._id)

    setTotalPrice((prev) => prev + product.price * quantity)
    setTotalQuantities((prev) => prev + quantity)

    if (isProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          }
        }
        return item
      })

      setCartItems(updatedCartItems)
    } else {
      const newProduct = { ...product, quantity: quantity }
      setCartItems([...cartItems, { ...newProduct }])
    }

    toast.success(`${quantity} ${product.name} added to the cart.`)
  }

  const toggleCartItemQty = (id: string, value: "inc" | "dec") => {
    const index = cartItems.findIndex((item) => item._id === id)
    const foundProduct = cartItems[index]
    const newCartItems = [...cartItems]

    if (value === "inc") {
      newCartItems[index] = {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      }
      setCartItems(newCartItems)

      setTotalPrice((prev) => prev + foundProduct.price)
      setTotalQuantities((prev) => prev + 1)
    } else if (value === "dec" && foundProduct.quantity > 1) {
      newCartItems[index] = {
        ...foundProduct,
        quantity: foundProduct.quantity - 1,
      }
      setCartItems(newCartItems)
      setTotalPrice((prev) => prev - foundProduct.price)
      setTotalQuantities((prev) => prev - 1)
    }
  }

  const remove = (id: string) => {
    const index = cartItems.findIndex((item) => item._id === id)
    const foundProduct = cartItems[index]
    const newCartItems = [...cartItems].filter((item) => item._id !== id)

    setCartItems(newCartItems)
    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity)
    setTotalQuantities((prev) => prev - foundProduct.quantity)
  }

  const value = useMemo(
    () => ({
      showCart,
      cartItems,
      totalPrice,
      totalQuantities,

      setShowCart,
      onAdd,
      toggleCartItemQty,
      remove,
    }),
    [showCart, cartItems, totalPrice, totalQuantities]
  )

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

export const useStateContext = () => {
  const context = useContext(StateContext)
  if (!context) {
    throw new Error("useStateContext must be used within an StateProvider")
  }
  return context
}
