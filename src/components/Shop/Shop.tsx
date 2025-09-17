import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import CartPanel from "./CartPanel/CartPanel"
function Shop() {



  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <CartPanel></CartPanel>
    </>
  )
}

export default Shop