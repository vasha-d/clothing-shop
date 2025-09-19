import type { SortType } from "../../../../types"

export type filterVisibleType = 'none' | 'price' | 'sort'
export type PricePropsType = {
  min: number | '',
  max: number | '',
  submitPrice: (min: number, max:number) => void,
  visible: filterVisibleType,
}

export type SortFilterPropsType = {
  sort: SortType
  submitSort: (newVal: SortType) => void
  visible: filterVisibleType,

}
