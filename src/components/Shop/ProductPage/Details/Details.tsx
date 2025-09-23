import type { FullProductObjType } from "../../../../types"
import styles from './Details.module.css'
function Details({productObj}: {productObj: FullProductObjType}) {

  return (
    <div className={styles.container}>
      
      <div className={styles.head}>
        <span>Details</span>

        <img src={productObj.brand.image} alt="" />
      </div>


      <div>
        <span>Brand: {productObj.brand.name}</span>
        <br />
        <br />
        <span>{productObj.description}</span>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Details