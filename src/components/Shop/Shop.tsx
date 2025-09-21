import { Outlet } from "react-router-dom"
import useGetPage from "./useGetListPage"
import type { useCartPanelType } from "../../types"
function Shop({cartHook}: {cartHook: useCartPanelType}) {
  
  const outletContext  = useGetPage()
  const {cartElement} = cartHook
  if (outletContext.loading) return 'Loading...'
  return (
    <>
      <Outlet context={outletContext}></Outlet>
      {cartElement}
    </>
  )
}

export default Shop