import type { ProductObjType } from '../../../types'
import styles from './ProductCard.module.css'
function ProductCard({productObj}: 
  {productObj: ProductObjType} ){
  
  
    return (
    <div className={styles.card}>
      {productObj.id}  {productObj.name}
      {productObj.price}$$
      <div className={styles.prodImg}>
        <img src={productObj.cover_image} alt="" />
      </div>
    </div>
  )
}

export default ProductCard