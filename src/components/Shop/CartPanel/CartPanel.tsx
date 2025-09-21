import { useNavigate } from "react-router-dom"
import type { CartControlsHookType } from "../../../types"

function CartPanel({loading,visible, cartData, setVisible, setRefresh}: CartControlsHookType) {
  const navigate = useNavigate()
  console.log(cartData)
  if (loading || !visible )return null

  function closeCart()  {
    setVisible(false)
  }
  function clickCheckOut() {
    navigate('/check-out')
  }
  return (
    <div>
      {cartData?.map(element => {
        console.log(element.name)
        return <div>{element.name}</div>
      })}
      <button onClick={closeCart}>Close cart</button>
      <button onClick={clickCheckOut}>Check Out</button>
    </div>
  )
}

export default CartPanel