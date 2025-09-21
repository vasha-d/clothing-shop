import axios from "axios"
import type { ProductObjType } from "../../../types"
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
export async function 
patchCartProduct(id: number, quantity: number, token: string) {
  const url = api + `/products/${id}`
  const data = {quantity}
  const req= await axios.patch(url, data, configObj(token))
  console.log(req.data)
  return req
}

export async function deleteCartProduct(id: number, token: string) {
  const url = api + `/products/${id}`
  const req = await axios.delete(url, configObj(token))
  console.log(req.data)
  return req
}
export async function postCheckOut(token: string) {

  const url = api + `/checkout`

  const req = await axios.post(url, configObj(token))

  console.log(req)

  return req
}