import { Outlet } from "react-router-dom"
import useGetPage from "./ProductList/useGetPage"
import type { useCartPanelType, UseGetPageReturnType } from "../../types"
function Shop({cartHook}: {cartHook: useCartPanelType}) {
  
  const outletContext  = useGetPage()
  const {cartElement, controls} = cartHook
  if (outletContext.loading && outletContext.data === null) return 'Loading...'

  const loadedHook = outletContext as UseGetPageReturnType
  return (
    <>
      <Outlet context={loadedHook}></Outlet>
      {controls.isCheckingOut || cartElement}
    </>
  )
}

export default Shop