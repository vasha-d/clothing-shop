import useGetPage from "./useGetPage"

function ProductList() {

  const {data, query, setQuery, loading} = useGetPage()

  if (loading) return 'Loading...'
  
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default ProductList