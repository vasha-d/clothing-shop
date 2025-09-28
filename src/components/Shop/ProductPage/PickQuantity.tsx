import styles from './ProductPage.module.css'

const allQuantities = [1,2,3,4,5,6,7,8,9,10]
function PickQuantity({setQuantity}:{
  currentQuantity: number, setQuantity: React.Dispatch<React.SetStateAction<number>>
}
) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setQuantity(parseInt(e.target.value))
  }
  const options = allQuantities.map((q) => {
    return <option key={q} value={q}>{q}</option>
  })

  return (
    <div className={styles.pickQuantityContainer}>
      Quantity 
      <select className={styles.selectQuantity} onChange={handleChange}>
        {options}
      </select>
    </div>
  )
}

export default PickQuantity