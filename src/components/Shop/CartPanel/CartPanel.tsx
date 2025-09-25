import { data, useNavigate } from "react-router-dom"
import type { CartControlsHookType, CartDataType } from "../../../types"
import styles from './CartPanel.module.css'
import closeCartImg from '../../../assets/close-cart.svg'
import { useRef, useState } from "react"
import CartItem from "./CartItem/CartItem"
import { postNewCartQuantities } from "../api/cart"
const token = localStorage.getItem('token')

type LoadedPanelProps = CartControlsHookType & {
    cartData: CartDataType ,
    setCartData: React.Dispatch<React.SetStateAction<CartDataType>>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function CartPanel(props: CartControlsHookType) {

  if (props.loading || !props.visible ) return null
  
  
  return <LoadedCartPanel {...props as LoadedPanelProps} 
  ></LoadedCartPanel>
}

function LoadedCartPanel ({cartData, setVisible, setCartData}: LoadedPanelProps) {
  const navigate = useNavigate()
  const panelRef = useRef<HTMLDivElement>(null)

  async function closeCart()  {
    setVisible(false)
    postNewCartQuantities(cartData, token)
  }
  function clickCheckOut() {
    navigate('/check-out')
  }
  //Close cart panel if clicked outside the panel
  function clickCover(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const clickedInsidePanel = panelRef.current?.contains(e.target as Node)
    if (!clickedInsidePanel) {
      closeCart()
    }
  }
  function totalItemsPrice() {
    let price = 0
    cartData.forEach(item => {
      price += item.price * item.quantity
    })
    return price
  }
  console.log(window.innerHeight, window.innerWidth)
  return (
    <div onClick={clickCover}className={styles.cover}>
      <div ref={panelRef} className={styles.container}>
        <div className={styles.head}>
          <span>
            Shopping Cart ({Object.keys(cartData).length})
          </span>
          <img className={styles.closeCart} onClick={closeCart} src={closeCartImg} alt="" />
        </div>
        <div className={styles.itemList}>
          {cartData.map((value, index) => {
            return <CartItem index={index} itemObj={value} setCartData={setCartData} key={index}/>
          })}
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.pricing}>
            <div>Items subtotal <span className={styles.price}>$ {totalItemsPrice()}</span></div>
            <div>Delivery <span className={styles.price}>$ 5</span></div>
            <div className={styles.total}>Total <span className={styles.price}>$ {totalItemsPrice() + 5}</span></div>
          </div>
          <button className={styles.checkOut} onClick={clickCheckOut}>Check out</button> 
        </div>
      </div> 
    </div>
  )

}

export default CartPanel