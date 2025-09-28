import { Link, useLocation } from "react-router-dom"
import styles from './navbar.module.css'
import logo from '../../assets/logo.svg'
import cartIcon from '../../assets/cart.svg'
import avatarPlaceholder from '../../assets/avatar-placeholder.svg'
import unregisteredPlaceholder from '../../assets/unregistered-placeholder.svg'
import type { SetStateAction } from "react"
function Navbar({setVisible} : {setVisible: React.Dispatch<SetStateAction<boolean>>}) { 


  const {pathname} = useLocation()

  const isInAuthorizationRoutes = ['/register', '/sign-in'].includes(pathname)

  function openCart(){
    setVisible(true)
  }
  const authorizedElement = (
    <>
      <div className={styles.cart} onClick={openCart}>
          <img src={cartIcon} alt="" />
      </div>
      <img className={styles.avatar} src={avatarPlaceholder} alt="" />
    </>
  )
  const unauthorizedElement = (
    
      <Link to={'/sign-in'} className={styles.signIn} onClick={openCart}>
          <img src={unregisteredPlaceholder} alt="" />
          Log In
      </Link>
    
  )
  return (
    <div className={styles.navbar}>

      <Link to='/products' className={styles.logo} >
        <img src={logo} alt="" />  
        <span>
          RedSeam Clothing
        </span>
      </Link>      

      <div className={styles.rightEnd}>
        {isInAuthorizationRoutes ? unauthorizedElement : authorizedElement}
      </div>
    </div>
  )
}

export default Navbar