import {useParams } from "react-router-dom"
import type { FullProductObjType } from "../../../types"
import styles from './ProductPage.module.css'
import PickColor from "./PickColor/PickColor"
import { useState } from "react"
import PickSize from "./PickSize/PickSize"
import PickQuantity from "./PickQuantity"
import Images from "./Images"
import { postCartItem } from "../api/cart"
import cartImg from '../../../assets/white-cart.svg'
import Details from "./Details/Details"
import useGetProduct from "./useGetProduct"
function toTitleCase(name: string) {
  return name[0].toUpperCase() + name.slice(1)
}

function ProductPage() {
  const id = parseInt(useParams().id as string)
  const {loading, data} = useGetProduct(id)
  if (loading) return 'Loading...'
  return <LoadedPage productObj={data as FullProductObjType}></LoadedPage>

}

function LoadedPage({productObj}: {productObj: FullProductObjType}) {

  const {available_sizes, available_colors, id} = productObj 
  const [color, setColor] = useState<string>(available_colors[0])
  const [size, setSize] = useState<string>(available_sizes[0])
  const [quantity, setQuantity] = useState<number>(1)

  async function clickAddToCart() {
    const token = localStorage.getItem('token') as string
    const req = postCartItem(id, color, size, quantity, token) 
    console.log(req)
  }
  console.log(productObj)
  console.log(quantity, size, color)
  return (
    <div className={styles.page}> 
      <div className={styles.head}>
        Listing/product
      </div>
      <div className={styles.body}>
        <Images
          links={[...productObj.images]}
          allColors={available_colors}
          currentColor={color}
          setColor={setColor}
        ></Images>
        <div className={styles.main}>
          <div className={styles.title}>
            {toTitleCase(productObj.name)}
            <br />
            $ {productObj.price}
          </div>
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
          <button className={styles.addToCart} onClick={clickAddToCart}>
            <img src={cartImg} alt="" />
            Add to Cart
          </button>
          <Details productObj={productObj}></Details>
        </div>
      </div>

      
    </div>
  )
}

export default ProductPage