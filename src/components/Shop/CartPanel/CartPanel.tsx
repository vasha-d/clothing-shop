import { useLocation, useNavigate } from "react-router-dom"
import type { CartControlsHookType, CartDataType } from "../../../types"
import styles from './CartPanel.module.css'
import { useRef } from "react"
import CartItem from "./CartItem/CartItem"
import { postCheckOut, postNewCartQuantities } from "../api/cart"
import Pricing from "./Pricing"
import PanelHead from "./PanelHead"
import { readCookie } from "../../auth/api"
const {token, email} = readCookie()
console.log(token, email)
type LoadedPanelProps = CartControlsHookType & {
    cartData: CartDataType ,
    setCartData: React.Dispatch<React.SetStateAction<CartDataType>>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isCheckingOut: boolean
}

function CartPanel(props: CartControlsHookType) {

  if (props.loading || !props.visible ) return null
  
  
  return <LoadedCartPanel {...props as LoadedPanelProps} 
  ></LoadedCartPanel>
}

function LoadedCartPanel ({cartData, setVisible, setCartData, isCheckingOut}: LoadedPanelProps) {
  const navigate = useNavigate()

  const panelRef = useRef<HTMLDivElement>(null)

  async function closeCart()  {
    setVisible(false)
    postNewCartQuantities(cartData, token)
  }
  function clickGoToCheckout() {
    navigate('/products/check-out')
  }

  //Close cart panel if clicked outside the panel
  function clickCover(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isCheckingOut) return;
    const clickedInsidePanel = panelRef.current?.contains(e.target as Node)
    if (!clickedInsidePanel) {
      closeCart()
    }
  }

  //This element is used in both the cart panel and the check out page
  return (
    <div onClick={clickCover}className={isCheckingOut? styles.cartWrapper : styles.cover}>
      <div ref={panelRef} className={isCheckingOut ? styles.normalContainer : styles.panelContainer}>

        {isCheckingOut || <PanelHead cartData={cartData} closeCart={closeCart}/>}        

        <div className={styles.itemList}>
          {cartData.map((value, index) => {
            return <CartItem index={index} itemObj={value} setCartData={setCartData} key={index}/>
          })}
        </div>

        <div className={styles.bottom}>
          <Pricing cartData={cartData}></Pricing>
          {isCheckingOut || 
          <button className={styles.button} onClick={clickGoToCheckout}>Check out</button>
          }


        </div>
      </div> 
    </div>
  )

}

export default CartPanel