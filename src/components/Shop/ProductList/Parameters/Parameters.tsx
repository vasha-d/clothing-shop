import { useRef, useState } from "react"
import Price from "./Price"
import Sort from "./Sort"
import type { ProductListQueryType, SortType } from "../../../../types"
import type { filterVisibleType } from "./types"
import priceFilterIcon from '../../../../assets/filter.svg'
import downChevron from '../../../../assets/down-chevron.svg'
import styles from './Parameters.module.css'

type ParamPropsType = {
  query: ProductListQueryType,
  setQuery: React.Dispatch<React.SetStateAction<ProductListQueryType>>
}
const sortTypeToText = {
  created_at: 'New products first',
  price: 'Price, low to high',
  '-price': 'Price, high to low'
}
function Parameters({query, setQuery}: ParamPropsType) {
  const [visible, setVisible] = useState<filterVisibleType>('none')
  const paramsRef = useRef<HTMLDivElement>(null)
  function submitPrice (min: number | '', max: number | '') {
    setQuery(prev => {
      return {...prev, page: 1, min, max}
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
        document.removeEventListener('click', runOnClick)
      }
    }
    document.addEventListener('click', runOnClick) 
  }
  return (
    <div className={styles.container} ref={paramsRef}>
      <div className={styles.parameter}>
        <div className={styles.openParamsButton} onClick={onClickPriceHeader}>
          <img src={priceFilterIcon} alt="" />
          Filter
        </div>
        <Price 
          min={query.min}
          max={query.max}
          visible = {visible}
          submitPrice={submitPrice}
        ></Price>
      </div>
      <div className={styles.parameter}> 
        <div className={styles.openParamsButton} onClick={onClickSortHeader}>
          {visible == 'sort' ? 'Sort by' : sortTypeToText[query.sort]} 
          <img src={downChevron} alt="" />
        </div>
        <Sort 
          visible = {visible}
          sort={query.sort}
          submitSort={submitSort}
        ></Sort>
      </div>

    </div>
  )
}

export default Parameters