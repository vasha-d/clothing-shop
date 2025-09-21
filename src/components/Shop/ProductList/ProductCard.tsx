import { Link } from 'react-router-dom'
import type { ProductObjType } from '../../../types'
import styles from './ProductCard.module.css'
function toTitleCase(name: string) {
  return name[0].toUpperCase()+name.slice(1)
}
function ProductCard({productObj}: {productObj: ProductObjType}) {
  

  function onClickCard () {

  }
  
  return (
    <Link to={`/products/${productObj.id}`}>
      <div className={styles.card} onClick={onClickCard}>        
        <div className={styles.prodImg}>
          <img src={productObj.cover_image} alt="" />
        </div>
      <div className={styles.info}>
        <div>{toTitleCase(productObj.name)}</div>
        <span style={{fontSize: '16px'}}>$ {productObj.price}</span>
      </div>
      </div>
    </Link>
  )
}

export default ProductCard