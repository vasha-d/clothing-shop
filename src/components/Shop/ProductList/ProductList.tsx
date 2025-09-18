import type { ProductObjType } from "../../../types"
import ProductCard from "./ProductCard"
import useGetPage from "./useGetPage"
import styles from './ProductList.module.css'
import Parameters from "./Parameters/Parameters"
function ProductList() {

  const {data, query, setQuery, loading} = useGetPage()

  if (loading) return 'Loading...'
  


  const list = data?.data.map((product: ProductObjType) => {
    return <ProductCard key={product.id} productObj={product}></ProductCard>
  }) 
  console.log(data)
  return (
    <div>

      <h2>Headers -- filters</h2>
      <Parameters
        query={query}
        setQuery={setQuery}
      />
      <div className={styles.listContainer}>
        {list}
      </div>
    </div>
  )
}

export default ProductList