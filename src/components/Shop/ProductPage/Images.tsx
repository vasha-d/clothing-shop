import styles from './ProductPage.module.css'

function Images({links, allColors, currentColor, setColor}: 
  {links:string[], allColors: string[],currentColor: string, setColor:React.Dispatch<React.SetStateAction<string>>}) {

  
  
  const imgList = allColors.map((value, index) => {
    function onClickImg () {
      console.log('dong')
      setColor(value)
    }
    return <img onClick={onClickImg} key={index} id={value} src={links[index]}></img>
  })

  return (
    <div>
      <div className={styles.sideImages}>
        {imgList}

      </div>
      <div className={styles.mainImg}>
        <img src={links[allColors.indexOf(currentColor)]}></img>
      </div>
      
    </div>
  )
}

export default Images