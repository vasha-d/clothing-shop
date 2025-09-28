
import type { ProductListQueryType } from '../../../types'
import closeImg from '../../../assets/close-cart.svg'
import styles from './ProductList.module.css'


function PriceFilterNote({query, setQuery}:  {query: ProductListQueryType, setQuery: React.Dispatch<React.SetStateAction<ProductListQueryType>> }) {


  const isActive = query.max || query.min
  if (!isActive) return null

  let text = `Price: ${query.min}-${query.max}`
  if (!query.min) text = `Price: Below ${query.max} $`
  if (!query.max) text = `Price: Above ${query.min} $`
  function resetPriceFIlter () {
    setQuery(q => {
      return {...q, min: 0, max: ''}
    })
  }
  return (
    <div className={styles.priceNote}>
      <span>  
        {text}
      </span>
      <img onClick={resetPriceFIlter} className={styles.closePriceNote} src={closeImg} alt="" />
    </div>
  ) 
  
}

export default PriceFilterNote