import './css/App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './components/auth/Register/Register'
import SignIn from './components/auth/SignIn/SignIn'
import Shop from './components/Shop/Shop'
import ProductPage from './components/Shop/ProductPage/ProductPage'
import CheckOut from './components/Shop/CheckOut/CheckOut'
import Navbar from './components/Navbar/Navbar'
import ProductList from './components/Shop/ProductList/ProductList'
import useCartPanel from './components/Shop/CartPanel/useCartPanel'
function App() {  
  
  const cartHook = useCartPanel()
  return (
      <>

        <Navbar setVisible={cartHook.controls.setVisible}></Navbar>

        <Routes>
          <Route path='/' element={<Navigate to='products' replace/>}></Route>

          <Route index path='/register' element={<Register></Register>}></Route>
          <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
          <Route path='/products' element={<Shop cartHook={cartHook}></Shop>}>
            <Route path='' element= {<ProductList></ProductList>}></Route>
            <Route path=':id' element={<ProductPage setCartData={cartHook.controls.setCartData}></ProductPage>}></Route>
            <Route path='check-out' element={<CheckOut cartElement={cartHook.cartElement}></CheckOut>}></Route>
          </Route>
        </Routes>
      </>
      

  )
}

export default App
