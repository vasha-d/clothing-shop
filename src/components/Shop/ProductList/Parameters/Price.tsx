import { useState } from "react"
import styles from './Parameters.module.css'

import type { PricePropsType } from "./types"

function Price({min, max, submitPrice, visible}: PricePropsType) {

  const [newMin, setNewMin] = useState(min)
  const [newMax, setNewMax] = useState(max)

  if (visible != 'price') {
    clearUnsubmittedInputs()
    return null
  }
  function clearUnsubmittedInputs () {
    if (min != newMin || max != newMax) {
      setNewMin(min)
      setNewMax(max)
    }
  }
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
    <div className={styles.price}> 
      <div className={styles.priceHead}>Select price</div>
      <form className={styles.priceForm}>
        <input onChange={handleMin} value={newMin} type="number" name="min" id="min" placeholder="From"/>
        <input onChange={handleMax} value={newMax} type="number" name="max" id="max" placeholder="To" />
        <button className={styles.applyPrice} onClick={applyPriceFIlter}>Apply</button>
      </form>

    </div>
  )
}

export default Price