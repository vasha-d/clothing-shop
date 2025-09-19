import { Outlet } from "react-router-dom"
import CartPanel from "./CartPanel/CartPanel"
import useGetPage from "./useGetListPage"
function Shop() {
  
  const outletContext  = useGetPage()

  if (outletContext.loading) return 'Loading...'
  
  return (
    <>
      <Outlet context={outletContext}></Outlet>
      <CartPanel></CartPanel>
    </>
  )
}

export default Shop