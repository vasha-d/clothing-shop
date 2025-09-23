
import styles from './PickColor.module.css'

const colorMap = {
  White: "#eef1f3ff",
  Red: "#FF0000",
  Blue: "#0000FF",
  "Navy Blue": "#001F54",
  Grey: "#808080",
  Black: "#000000",
  Purple: "#800080",
  Orange: "#FFA500",
  Beige: "#F5F5DC",
  Pink: "#FFC0CB",
  Green: "#008000",
  Cream: "#FFFDD0",
  Maroon: "#800000",
  Brown: "#8e5106ff",
  Peach: "#FFE5B4",
  "Off White": "#F8F8F0",
  Mauve: "#E0B0FF",
  Yellow: "#FFFF00",
  Magenta: "#FF00FF",
  Khaki: "#F0E68C",
  Olive: "#808000",
  Multi: "linear-gradient(90deg, red, yellow, green, blue)",
}


function PickColor({allColors, currentColor, setColor, }: 
  {allColors: string[], currentColor: string, setColor:React.Dispatch<React.SetStateAction<string>>}) {
  
  const ColorButton = ({col}: {col:string}) => {
    function onClickColor () {
      setColor(col)
    }
    const selectedClass = currentColor == col ? ' '+styles.colSelected : ''
    return (
      <div style={{borderColor: colorMap[col]}} className={styles.colorBtnWrapper + selectedClass}>
        <div style={{backgroundColor: colorMap[col]}}className={styles.colorBtn} onClick={onClickColor}>
        </div>
      </div>
    )

  }
  const list = allColors.map((c: string) => {
    return <ColorButton key={c} col={c}/>
  })
  return (
    <div className={styles.pickColorsContainer}>
      Color: {currentColor}
      <div className={styles.colorsList}>
        {list}
      </div>
    </div>
  )
}

export default PickColor