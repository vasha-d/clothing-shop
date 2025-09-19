import { useRef, useState } from "react"
import Price from "./Price"
import Sort from "./Sort"
import type { ProductListQueryType, SortType } from "../../../../types"
import type { filterVisibleType } from "./types"
type ParamPropsType = {
  query: ProductListQueryType,
  setQuery: React.Dispatch<React.SetStateAction<ProductListQueryType>>
}
function Parameters({query, setQuery}: ParamPropsType) {
  const [visible, setVisible] = useState<filterVisibleType>('none')
  const paramsRef = useRef<HTMLDivElement>(null)
  function submitPrice (min: number | '', max: number | '') {
    setQuery(prev => {
      return {...prev, min, max}
    })
    setVisible('none')
  }
  function submitSort (sort: SortType) {
    setQuery(prev => {
      return {...prev, sort}
    })
    setVisible('none')
  }
  function onClickPriceHeader() {
    if (visible == 'price') {
      setVisible('none')
    } else {
      setVisible('price')
      closeFilterOnClickOutside()
    }
  }
  function onClickSortHeader () {
    if (visible == 'sort') {
      setVisible('none')
    } else {
      setVisible('sort')
      closeFilterOnClickOutside()
    }
  }
  function closeFilterOnClickOutside () {
    function runOnClick(e: PointerEvent) {
      const target = e.target as Node
      const clickedOutsideDiv = !paramsRef.current?.contains(target)
      if (clickedOutsideDiv) {
        setVisible('none')
      }
    }
    document.addEventListener('click', runOnClick) 
  }
  return (
    <div ref={paramsRef}>
      <h4 onClick={onClickPriceHeader}>Select Price</h4>
      <Price 
        min={query.min}
        max={query.max}
        visible = {visible}
        submitPrice={submitPrice}
      ></Price>
      <h4 onClick={onClickSortHeader}>Sort By</h4>
      <Sort 
        visible = {visible}
        sort={query.sort}
        submitSort={submitSort}
      ></Sort>
    </div>
  )
}

export default Parameters