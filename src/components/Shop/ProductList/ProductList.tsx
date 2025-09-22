import type  {ProductObjType, UseGetPageReturnType } from "../../../types"
import ProductCard from "./ProductCard"
import styles from './ProductList.module.css'
import Parameters from "./Parameters/Parameters"
import { useOutletContext } from "react-router-dom"
import Pages from "./Pages/Pages"
function ProductList() {
  const {data, query, setQuery} = useOutletContext() as UseGetPageReturnType
  const list = data?.data.map((product: ProductObjType) => {
    return <ProductCard key={product.id} productObj={product}></ProductCard>
  }) 

  console.log(data)
  console.log(window.innerWidth, window.innerHeight)

  return (
    <div className={styles.page}>

      <div className={styles.head}>
        <div className={styles.products}>Products</div>
        <div className={styles.rightEnd}>
          <div className={styles.pageMeta}>
            Showing {data?.meta.from}-{data?.meta.to} of {data?.meta.total} results
          </div>
          <Parameters
            query={query}
            setQuery={setQuery}
          />
        </div>
      </div>
     
      <div className={styles.listContainer}>
        {list}
      </div>
      <Pages setQuery={setQuery} meta={data?.meta}></Pages>
    </div>
  )
}

export default ProductList