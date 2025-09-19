import { useOutletContext, useParams } from "react-router-dom"
import type { ProductObjType, UseGetPageReturnType } from "../../../types"
import styles from './ProductPage.module.css'
import PickColor from "./PickColor"
import { useState } from "react"
import PickSize from "./PickSize"
import PickQuantity from "./PickQuantity"
import Images from "./Images"
import { postCartItem } from "../api/cart"

function ProductPage() {

  const id = parseInt(useParams().id as string)
  const outletContext = useOutletContext() as UseGetPageReturnType
  const productObj = outletContext.data?.data.filter((obj) => obj.id == id)[0] as ProductObjType
  const {available_sizes, available_colors} = productObj
  const [color, setColor] = useState<string>(available_colors[0])
  const [size, setSize] = useState<string>(available_sizes[0])
  const [quantity, setQuantity] = useState<number>(1)

  async function clickAddToCart() {
    const token = localStorage.getItem('token') as string
    const req = postCartItem(id, color, size, quantity, token) 
    console.log(req)
  }
  console.log(quantity, size, color)
  return (
    <div> 
      <PickColor 
        allColors={available_colors}
        currentColor={color}
        setColor={setColor}
      />
      <PickSize
        allSizes={available_sizes}
        currentSize={size}
        setSize={setSize}
      />
      <PickQuantity
        currentQuantity={quantity}
        setQuantity={setQuantity}
      />
      <Images
        links={[...productObj.images]}
        allColors={available_colors}
        currentColor={color}
        setColor={setColor}
      ></Images>

      <button onClick={clickAddToCart}>Add to Cart</button>
    </div>
  )
}

export default ProductPage