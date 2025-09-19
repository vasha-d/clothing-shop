import { Link } from 'react-router-dom'
import type { ProductObjType } from '../../../types'
import styles from './ProductCard.module.css'
function ProductCard({productObj}: {productObj: ProductObjType}) {
  

  function onClickCard () {

  }
  
  return (
    <Link to={`/products/${productObj.id}`}>
      <div className={styles.card} onClick={onClickCard}>
        {productObj.id}  {productObj.name}
        {productObj.price}$$
        <div className={styles.prodImg}>
          <img src={productObj.cover_image} alt="" />
        </div>
      </div>
    </Link>
  )
}

export default ProductCard