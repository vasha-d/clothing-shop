import { useEffect, useRef, useState } from 'react'
import type { CartItemType } from '../../../../types'
import { deleteCartProduct, patchCartProduct } from '../../api/cart'
import styles from './CartItem.module.css'

import  type { CartDataType } from '../../../../types'
import { readCookie } from '../../../auth/api'

function toTitleCase(s: string) {
  return s[0].toUpperCase()+s.slice(1)
}


function CartItem({itemObj, index, setCartData}: 
  {itemObj: CartItemType, index: number, setCartData: React.Dispatch<React.SetStateAction<CartDataType>>})
  {
  
  const {id, color, size, quantity} = itemObj
  const minusClassName = quantity == 1 ? ' '+styles.disabled : ''
  const token = readCookie().token
  function clickPlus() {    
    setCartData(list => {
      patchCartProduct(id, color, size, quantity+1, token)
      let newItemObj = {...itemObj, quantity: quantity + 1}
      let newCart = [...list]
      newCart[index] = newItemObj 
      return newCart
    })
  }
  function clickMinus() {
    if (quantity == 1) return    
    setCartData(list => {
      patchCartProduct(id, color, size, quantity-1, token)
      let newItemObj = {...itemObj, quantity: quantity - 1}
      let newCart = [...list]
      newCart[index] = newItemObj 
      return newCart
    })
  }
  function clickRemove() {  
    deleteCartProduct(id, color, size, token)
    setCartData(list => {
      let newCart = [...list]
      newCart.splice(index, 1)
      return newCart
    })
  }

  return (
    <div className={styles.container} key={id}>

      <img className={styles.img} src={itemObj.images[itemObj.available_colors.findIndex(c => c == itemObj.color)]} alt="" />

      <div className={styles.main}>

        <div className={styles.head}>
          <span>{toTitleCase(itemObj.name)}</span>
          <span style={{fontSize: '18px', textWrap: 'nowrap'}}>$ {itemObj.price}</span>
        </div>
        <div className={styles.details}>
          <div>{itemObj.color}</div>
          <div>{itemObj.size}</div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.quantity}>
            <span onClick={clickMinus} className={styles.changeQuantity + minusClassName}>-</span>
            <span>{quantity}</span>
            <span onClick={clickPlus} className={styles.changeQuantity}>+</span>
          </div>
          <button className={styles.remove} onClick={clickRemove}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem