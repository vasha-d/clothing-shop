import type { CartDataType } from '../../../types'
import closeCartImg from '../../../assets/close-cart.svg'
import styles from './CartPanel.module.css'

function PanelHead({cartData, closeCart}: {cartData: CartDataType | null, closeCart: () => void}) {
  return (
    
    
    
    <div className={styles.head}>
     <span>
       Shopping Cart ({cartData ? Object.keys(cartData).length : 0})
     </span>
     <img className={styles.closeCart} onClick={closeCart} src={closeCartImg} alt="" />
    
    </div>
  )
}

export default PanelHead