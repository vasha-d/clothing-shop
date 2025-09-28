import { useEffect, useState } from "react";
import { getPage } from "../api/products";
import type { PageFetchDataType, ProductListQueryType, UseGetPageReturnType } from "../../../types";

const defaultQuery: ProductListQueryType = {
  page: 1,
  min: 0,
  max: '',
  sort: 'created_at'
}
type pageHookType = {
  data: PageFetchDataType | null,
  loading: boolean,
  query: ProductListQueryType,
  setQuery: React.Dispatch<React.SetStateAction<ProductListQueryType>>
}
export default function useGetPage() : pageHookType {

  const [query, setQuery] = useState(defaultQuery)
  const [data, setData] = useState<PageFetchDataType | null>(null)
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

  return {data, setQuery, query, loading}
}