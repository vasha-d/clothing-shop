import { Outlet } from "react-router-dom"
import CartPanel from "./CartPanel/CartPanel"
import { getItem, getPage } from "./api/products"
import { deleteCartProduct, getCart, patchCartProduct, postCartItem, postCheckOut } from "./api/cart"
function Shop() {
  if (!localStorage.getItem('token')) return
  
  return (
    <>
      <Outlet></Outlet>
      <CartPanel></CartPanel>
    </>
  )
}

export default Shop