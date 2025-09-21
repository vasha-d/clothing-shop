import { useEffect, useState } from "react"
import { getCart } from "../api/cart"
import type { CartControlsHookType, useCartPanelType } from "../../../types"
import CartPanel from "./CartPanel"

const token = localStorage.getItem('token') as string

export default function useCartPanel() : useCartPanelType {
  
  const controls = useCartCotrols()
  const element = <CartPanel {...controls}></CartPanel>
  return {cartElement: element, controls}
}
//Controls for opening, closing  and refreshing cart panel
function useCartCotrols(): CartControlsHookType {

  const [visible, setVisible] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [cartData, setCartData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchCart() {
      const req = await getCart(token)

      const data = req.data
      console.log(data)
      setCartData(data)
      setLoading(false)
    }
    fetchCart()
  }, [refresh])
  return {visible, setVisible, setRefresh, cartData, loading}
}


