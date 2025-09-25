import { useLocation } from "react-router-dom"
import styles from './navbar.module.css'
import logo from '../../assets/logo.svg'
import cartIcon from '../../assets/cart.svg'
import avatarPlaceholder from '../../assets/avatar-placeholder.svg'

function Navbar({visible, setVisible}) { 


  const {pathname} = useLocation()

  const isInAuthorizationRoutes = ['/register', '/sign-in'].includes(pathname)

  function openCart(){
    setVisible(true)
  }
  return (
    <div className={styles.navbar}>

      <div className={styles.logo} >
        <img src={logo} alt="" />  
        <span>
          RedSeam Clothing
        </span>
      </div>      

      <div className={styles.rightEnd}>
        <div className={styles.cart} onClick={openCart}>
          <img src={cartIcon} alt="" />
        </div>
        <img className={styles.avatar} src={avatarPlaceholder} alt="" />
      </div>
    </div>
  )
}

export default Navbar