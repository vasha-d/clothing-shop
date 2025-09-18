import { useState } from "react"
import type { SortType } from "../../../../types"
import styles from './Parameters.module.css'
type SortPropsType = {
  sort: SortType
  submitSort: (newVal: SortType) => void
}


function getClass(id: SortType, sortVal: SortType) {
  let className = ''
  if (sortVal == id) {
    className += styles.selected
  }

  return className
}

function Sort({sort, submitSort}: SortPropsType) {

  const [newSort, setNewSort] = useState<SortType>(sort)

  function changeSort (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLDivElement
    const newSortVal = target.id as SortType 
    console.log('setting new', newSortVal)
    setNewSort(newSortVal)

  }
  function applySort() {
    submitSort(newSort)
  }
  return (
    <div>
      

      <h4>Sort By</h4>
      <div>
        <div
          onClick={changeSort}
          className={getClass('created_at', newSort)}
          id="created_at">New products first</div>
        <div
          onClick={changeSort}
          className={getClass('price', newSort)}
          id="price">Price, low to high</div>
        <div
          onClick={changeSort}
          className={getClass('-price', newSort)}
          id="-price">Price, high to low</div>
      </div>

      <button onClick={applySort}>Submit</button>
    </div>
  )
}

export default Sort