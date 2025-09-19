
function PickColor({allColors, currentColor, setColor, }: 
  {allColors: string[], currentColor: string, setColor:React.Dispatch<React.SetStateAction<string>>}) {

  const ColorButton = ({col}: {col:string}) => {
    function onClickColor () {
      setColor(col)
    }
    return <div onClick={onClickColor}>{col}</div>
  }
  const list = allColors.map((c: string) => {
    return <ColorButton key={c} col={c}/>
  })
  return (
    <div>
      Colors:
      {list}
    </div>
  )
}

export default PickColor