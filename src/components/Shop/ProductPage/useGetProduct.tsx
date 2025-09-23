import axios from "axios"
import { useEffect, useState } from "react"
import { getItem } from "../api/products"
import type { FullProductObjType } from "../../../types"

type GetProductHookType = {
  data: FullProductObjType | null;
  loading: boolean
}

export default function useGetProduct(id: number): GetProductHookType {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  useEffect(() => {

    async function getProduct () {
      setLoading(true)
      const req = await getItem(id)   
      
      const data = req.data as FullProductObjType
      setData(req.data)
      setLoading(false)
      console.log(data)
      console.log(loading)
      
    }

    getProduct()
  }, [id])
  
  return {loading, data}

}