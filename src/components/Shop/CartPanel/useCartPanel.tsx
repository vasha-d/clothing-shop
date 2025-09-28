import { useEffect, useState } from "react"
import { getCart } from "../api/cart"
import type { CartControlsHookType, CartDataType, CartItemType, useCartPanelType } from "../../../types"
import CartPanel from "./CartPanel"
import { useLocation } from "react-router-dom"
import { readCookie } from "../../auth/api"
const token = readCookie().token as string

export default function useCartPanel() : useCartPanelType {
  
  const controls = useCartCotrols()
  const element = <CartPanel {...controls}></CartPanel>
  return {cartElement: element, controls}
}


//Controls for opening, closing  and refreshing cart panel
function useCartCotrols(): CartControlsHookType {

  const currentPath = useLocation().pathname
  const isCheckingOut = currentPath == '/products/check-out'

  const [visible, setVisible] = useState(isCheckingOut) //If user is on checkout page, show cart 
  const [cartData, setCartData] = useState<CartDataType | null>(null)
  const [loading, setLoading] = useState(true)


  
  useEffect(() => {
    async function fetchCart() {
      const req = await getCart(token)
      const data = req.data as CartItemType[]
      setCartData(data)
      setLoading(false)
    }
    fetchCart()
  }, [])
  
  
  return {visible, setVisible, cartData, setCartData, loading, isCheckingOut}
}


