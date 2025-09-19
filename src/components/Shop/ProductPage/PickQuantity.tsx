import React from 'react'

const allQuantities = [1,2,3,4,5,6,7,8,9,10]
function PickQuantity({currentQuantity, setQuantity}:{
  currentQuantity: number, setQuantity: React.Dispatch<React.SetStateAction<number>>
}
) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setQuantity(parseInt(e.target.value))
  }
  const options = allQuantities.map((q) => {
    return <option key={q} value={q}>{q}</option>
  })

  return (
    <div>

      <select onChange={handleChange}>
        {options}
      </select>
    </div>
  )
}

export default PickQuantity