
import styles from './Pages.module.css'
import type { PaginationMetaType, ProductListQueryType } from "../../../../types"
import leftChevron from '../../../../assets/left-chevron.svg'


function Pages({meta, setQuery}: {meta: PaginationMetaType, setQuery: React.Dispatch<React.SetStateAction<ProductListQueryType>> }) {
  const {current_page, last_page} = meta

  let pageList = buildNumberList(current_page, last_page)
  pageList = addDots(pageList)

  function clickPrevPage() {
    if (current_page > 1) {
      setQuery(q => {return {...q, page: current_page - 1}})
    }
  }
  function clickNextPage() {
    if (current_page < last_page) {
      setQuery(q => {return {...q, page: current_page + 1}})
    }
  }
  const PageNumberButton = ({n}: {n: number}) => {
    const text = n == -1 ? '...' : n
    const currentStyle = n == current_page ? ' ' + styles.current : ''
    function clickNumber() {
      setQuery(q => {
        return {...q, page: n}
      })
    }
    return <div onClick={clickNumber} className={styles.pageNum + currentStyle}>{text}</div>
  }
  return (
    <div className={styles.container}> 

      <div onClick={clickPrevPage} className={styles.prev}>
        <img src={leftChevron} alt="" />
      </div>
      <div className={styles.numbers}>
        {pageList.map(n => {
          return <PageNumberButton n={n} key={n}></PageNumberButton>
        })}
      </div>
     <div onClick={clickNextPage} className={styles.next}>
        <img src={leftChevron} alt="" />
      </div>
    </div>
  )
}

function buildNumberList(current_page:number, last_page: number) {
  let pageList = []
  const start = [1,2]
  const middle = [current_page-1, current_page, current_page+1]
  const end = [last_page-1, last_page]
  //Build array of which page numbers to display
  for (let i = 1; i <= last_page; i++) {
    if (start.includes(i)) {
      pageList.push(i)
    } else if (middle.includes(i)) {
      pageList.push(i)
    } else if (end.includes(i)) {
      pageList.push(i) 
    }
  }
  return pageList
}

function addDots (pageList : number[]) : number[] {

  //This inserts '...' where needed; 
  for (let i = 1; i < pageList.length; i++) {
    //Iterates through our pages list, checks if anywhere it increments by more than 1
    // and add '...' there. For example if we have [1,2,3,4,5,9,10] it will add -1 after the 
    // 5.  We will render that as '...'
    if (pageList[i] - pageList[i-1] != 1) {
      pageList.splice(i, 0, -1);
      i++;
    }
  }
  return pageList
}

export default Pages