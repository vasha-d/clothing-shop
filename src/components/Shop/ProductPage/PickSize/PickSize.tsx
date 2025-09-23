import styles from './PickSize.module.css'


function PickSize({allSizes, currentSize, setSize}:
  {allSizes: string[], currentSize: string, setSize: React.Dispatch<React.SetStateAction<string>>}
) {
  const SizeButton = ({size} : {size: string}) => {
    function onClickButton() {
      setSize(size)
    } 
    const selectedClass = currentSize == size ? ' '+styles.sizeSelected : ''
    return <div className={styles.size+selectedClass} onClick={onClickButton}>{size}</div>
  }
  const list = allSizes.map(s => {
    return <SizeButton key={s} size={s}/>
  })

  return (
    <div className={styles.pickSize}>
      <div >Size: {currentSize}</div>
      <div className={styles.sizeList}>
        {list}
      </div>
    </div>
  )
}

export default PickSize