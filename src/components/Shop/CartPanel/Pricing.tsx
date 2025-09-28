import type { CartDataType } from '../../../types'
import styles from './CartPanel.module.css'




function Pricing({cartData}: {cartData: CartDataType}) {


  function totalItemsPrice() {
    let price = 0
    cartData.forEach(item => {
      price += item.price * item.quantity
    })
    return price
  }

  return (
    <div className={styles.pricing}>
      <div>Items subtotal <span className={styles.price}>$ {totalItemsPrice()}</span></div>
      <div>Delivery <span className={styles.price}>$ 5</span></div>
      <div className={styles.total}>Total <span className={styles.price}>$ {totalItemsPrice() + 5}</span></div>
    </div>
  )
}

export default Pricing
          