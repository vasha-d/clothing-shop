import { useState } from "react"
import Price from "./Price"
import Sort from "./Sort"
import type { ProductListQueryType, SortType } from "../../../../types"

type ParamPropsType = {
  query: ProductListQueryType,
  setQuery: React.Dispatch<React.SetStateAction<ProductListQueryType>>
}

function Parameters({query, setQuery}: ParamPropsType) {

  
  function submitPrice (min: number, max: number) {
    setQuery(prev => {
      return {...prev, min, max}
    })
  }
  function submitSort (sort: SortType) {
    setQuery(prev => {
      return {...prev, sort}
    })
  }
  return (
    <div>
      <Price 
        min={query.min}
        max={query.max}
        submitPrice={submitPrice}
      ></Price>
      <Sort 
        sort={query.sort}
        submitSort={submitSort}
      ></Sort>
    </div>
  )
}

export default Parameters