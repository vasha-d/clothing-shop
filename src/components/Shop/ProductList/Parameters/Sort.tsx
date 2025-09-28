import { useState } from "react"
import type { SortType } from "../../../../types"
import styles from './Parameters.module.css'
import type { SortFilterPropsType } from "./types"
//Applies '.selected' class to whichever option is selected
function getClass(id: SortType, sortVal: SortType) {
  let className = styles.sortOption
  if (sortVal == id) {
    className += ' '+styles.selected
  }

  return className
}

function Sort({sort, submitSort, visible}: SortFilterPropsType) {

  const [newSort, setNewSort] = useState<SortType>(sort)
  if (visible !== 'sort') {
    clearUnsubmittedInputs()
    return null
  }
  function clearUnsubmittedInputs () {
    if (newSort != sort) {
      setNewSort(sort)
    }
  }
  function changeSort (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLDivElement
    const newSortVal = target.id as SortType 
    setNewSort(newSortVal)
    submitSort(newSortVal)
  }
  return (
    <div className={styles.sort}>
      <div className={styles.sortHead}>Sort by</div>
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

    </div>
  )
}

export default Sort