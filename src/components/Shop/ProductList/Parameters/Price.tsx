import { useState } from "react"


type PricePropsType = {
  min: number,
  max: number,
  submitPrice: (min: number, max:number) => void
}

function Price({min, max, submitPrice}: PricePropsType) {

  const [newMin, setNewMin] = useState(min)
  const [newMax, setNewMax] = useState(max)
  function handleMin (e: React.ChangeEvent<HTMLInputElement>) {
    const newVal = parseInt(e.target.value)
    setNewMin(newVal)
  }
  function handleMax (e: React.ChangeEvent<HTMLInputElement>) {
    const newVal = parseInt(e.target.value)
    setNewMax(newVal)
  }
  function applyPriceFIlter(e) {
    e.preventDefault()
    submitPrice(newMin, newMax)
  }

  return (
    <div>
      <h4>Select Price</h4>

      <form>
        <input onChange={handleMin} type="number" name="min" id="min" placeholder="From"/>
        <input onChange={handleMax} type="number" name="max" id="max" placeholder="To" />
        <button onClick={applyPriceFIlter}>Apply</button>
      </form>

    </div>
  )
}

export default Price