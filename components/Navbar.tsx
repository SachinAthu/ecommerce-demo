"use client"

import Link from "next/link"
import { AiOutlineShopping } from "react-icons/ai"

import { Cart } from "."
import { useStateContext } from "@/contexts/StateContext"

export default function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href={"/"}>Gadget Store</Link>
      </p>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}
