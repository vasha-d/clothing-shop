import { useEffect, useState } from "react";
import { getPage } from "../api/products";
import type { SortType } from "../../../types";

type ProductListQueryType = {
  page: number,
  min: number,
  max: number,
  sort: SortType
}
const defaultQuery: ProductListQueryType = {
  page: 1,
  min: 0,
  max: 1000,
  sort: 'created_at'
}
export default function useGetPage() {

  const [query, setQuery] = useState(defaultQuery)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    
    async function fetchProducts() {
      const req = await getPage(
        query.page, query.min, query.max, query.sort
      )
      const data = req.data
      console.log(req, data)
      setData(req.data)
      setLoading(false)
    }
    fetchProducts()
  }, [query.page, query.min, query.max, query.sort])


  return {data, setQuery, query, loading}
}