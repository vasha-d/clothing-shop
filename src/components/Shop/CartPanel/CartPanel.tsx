import type { CartControlsHookType } from "../../../types"

function CartPanel({loading,visible, cartData, setVisible, setRefresh}: CartControlsHookType) {

  console.log(cartData)
  if (loading || !visible )return null

  function closeCart()  {
    setVisible(false)
  }
  return (
    <div>
      {cartData?.map(element => {
        console.log(element.name)
        return <div>{element.name}</div>
      })}
      <button onClick={closeCart}>Close cart</button>
    </div>
  )
}

export default CartPanel