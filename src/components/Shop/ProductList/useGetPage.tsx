import { useEffect, useState } from "react";
import { getPage } from "../api/products";
import type { PageFetchReturnType, ProductListQueryType } from "../../../types";

const defaultQuery: ProductListQueryType = {
  page: 1,
  min: 0,
  max: 1000,
  sort: 'created_at'
}
export default function useGetPage() {

  const [query, setQuery] = useState(defaultQuery)
  const [data, setData] = useState<PageFetchReturnType | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    
    async function fetchProducts() {
      const req = await getPage(
        query.page, query.min, query.max, query.sort
      )
      const data = req.data
      setData(data)
      setLoading(false)
    }
    fetchProducts()
  }, [query.page, query.min, query.max, query.sort])

  console.log(query)
  return {data, setQuery, query, loading}
}