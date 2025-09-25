import axios from "axios"
import type { CartDataType, newQuantitiesType, ProductObjType } from "../../../types"



const api = 'https://api.redseam.redberryinternship.ge/api/cart'
const configObj = (token: string) => {

  return {
    
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }  
  }
}
export async function getCart(token: string) {
  const url = api 

  const req = await axios.get(url, configObj(token))
  console.log(req.data)
  return req
}

export async function
postCartItem (id: number, color: string, size: string, quantity: number, token: string) {
  const url = api + `/products/${id}`
  
  const data = {color:color, size: size, quantity}

  const req = await axios.post(url, data, configObj(token))

  console.log(req.data)
  return req
}

export async function postNewCartQuantities(newCartObj: CartDataType, token: string | null) {

  newCartObj.forEach(async (item) => {
    
    let req = await patchCartProduct(item.id, item.color, item.size, item.quantity, token)
    console.log(req)
  })

}

export async function 
patchCartProduct(id: number, color: string, size: string, quantity: number, token: string | null) {
  const url = api + `/products/${id}`
  const data = {quantity, color, size}
  console.log('running', url, data)
  const req= await axios.patch(url, data, configObj(token))
  console.log(req.data)
  return req
}

export async function deleteCartProduct(id: number, color: string, size: string,  token: string | null) {
  const url = api + `/products/${id}`
  const data = {color, size}
  const req = await axios.delete(url,  configObj(token))
  console.log(req.data)
  return req
}
export async function postCheckOut(token: string) {

  const url = api + `/checkout`

  const req = await axios.post(url, configObj(token))

  console.log(req)

  return req
}