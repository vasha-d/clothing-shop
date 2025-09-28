import styles from './confirmpurchase.module.css'
import successImg from '../../../../assets/confirm-purchase.svg'
import closeImg from '../../../../assets/close-cart.svg'
import { Link, useNavigate } from 'react-router-dom'

function ConfirmPurchase({closeModal, closeCart}) {



  return (
    <div className={styles.cover}>
      <div className={styles.container}>

        <div className={styles.body}>
          
          <div className={styles.imgWrapper}>
            <img src={successImg} alt="" />
          </div>
          <h1>Congrats!</h1>
          <div>Your order is places successfully!</div>
          <Link to='/products'>
            <button onClick={closeCart} className='big-button'>Continue Shopping</button>
          </Link>
        </div>


        <img className={styles.closeImg} src={closeImg} onClick={closeModal}/>
      </div>

    </div>
  )
}

export default ConfirmPurchase