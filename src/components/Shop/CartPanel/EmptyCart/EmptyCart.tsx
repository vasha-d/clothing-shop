import styles from './emptycart.module.css'
import cartImg from '../../../../assets/big-cart.svg'
import { Link } from 'react-router-dom'
function EmptyCart({closeCart}: {closeCart: () => {}}) {
  return (
    <div className={styles.body}>
      <div>
        <img src={cartImg} alt="" />
      </div>
      <h1 style={{fontSize: '24px'}}>Ooops!</h1>
      <div>You've got nothing in your cart just yet...</div>

      <Link to='/products'>
        <button onClick={closeCart} className={styles.button}>Start Shopping</button>
      </Link>
    </div>
  )
}



export default EmptyCart