
function PickSize({allSizes, currentSize, setSize}:
  {allSizes: string[], currentSize: string, setSize: React.Dispatch<React.SetStateAction<string>>}
) {


  const SizeButton = ({size} : {size: string}) => {
    function onClickButton() {
      setSize(size)
    } 
    return <div onClick={onClickButton}>{size}</div>
  }
  const list = allSizes.map(s => {
    return <SizeButton key={s} size={s}/>
  })

  return (
    <div>
      Pick a Size:
      {list}

    </div>
  )
}

export default PickSize