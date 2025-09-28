import {useNavigate, useParams } from "react-router-dom"
import type { FullProductObjType, CartDataType } from "../../../types"
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
import { readCookie } from "../../auth/api"
function toTitleCase(name: string) {
  return name[0].toUpperCase() + name.slice(1)
}

function ProductPage({setCartData}:{setCartData: React.Dispatch<React.SetStateAction<CartDataType | null>>}) {
  const id = parseInt(useParams().id as string)
  const {loading, data} = useGetProduct(id)
  if (loading) return 'Loading...'
  return <LoadedPage 
  setCartData={setCartData as React.Dispatch<React.SetStateAction<CartDataType | null>>} 
  productObj={data as FullProductObjType}></LoadedPage>

}
const sizesList = ['XS', 'S', 'M', 'L', 'XL']
function LoadedPage({productObj, setCartData}: 
  {productObj: FullProductObjType, setCartData: React.Dispatch<React.SetStateAction<CartDataType | null>>}) {

  let {available_sizes, available_colors, id} = productObj 
  const [color, setColor] = useState<string>(available_colors[0])
  const [size, setSize] = useState<string>(sizesList[0])
  const [quantity, setQuantity] = useState<number>(1)
  
  let navigate = useNavigate()
  available_sizes = available_sizes || sizesList
  
  
  async function clickAddToCart() {


    if (!document.cookie) {
      navigate('/sign-in')
    }
    const token = readCookie().token
    const req = await postCartItem(id, color, size, quantity, token) 
    if (req.status == 401) {
      navigate('/sign-in')
    } else if (req.status == 200) {
      updateInternalCart()
    }
  }
  function updateInternalCart() {
    setCartData(currentCart => {  
      let isExactItemInCart = currentCart?.some(i => {
        return i.id == id && i.size == size && i.color == color
      })

      const newCart = currentCart?.map(item => {return {...item}}) || []
      if (isExactItemInCart) {
        let index = currentCart?.findIndex(i => i.id == id && i.color == color && i.size == size)
        newCart[index].quantity += quantity
      } else {
        let newItem = {...productObj, quantity, size, color}
        newCart.push(newItem)
      }
      return newCart

    })
  }
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