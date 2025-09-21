import { useLocation } from "react-router-dom"
import styles from './navbar.module.css'
function Navbar({visible, setVisible, setRefresh}) { 


  const {pathname} = useLocation()

  const isInAuthorizationRoutes = ['/register', '/sign-in'].includes(pathname)
  console.log(isInAuthorizationRoutes, pathname)

  function openCart(){
    setVisible(true)
    setRefresh((r:boolean) => !r)
  }
  return (
    <div className={styles.navbar}>

      <div>Logo</div>      

      <div onClick={openCart}>Cart</div>
    </div>
  )
}

export default Navbar