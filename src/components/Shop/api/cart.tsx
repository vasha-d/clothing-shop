import axios, { AxiosError } from "axios"



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
  try {
    const req = await axios.get(url, configObj(token))
    return req
  } catch (error) {
    return error
  }
}

export async function
postCartItem (id: number, color: string, size: string, quantity: number, token: string) {
  const url = api + `/products/${id}`
  
  const data = {color:color, size: size, quantity}

  
  try {
    const req = await axios.post(url, data, configObj(token))
    return {status: 200}
  } catch (error) {
    return error
  }


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
  const req = await axios.delete(url, {...configObj(token), data})
  console.log(req.data)
  return req
}
export async function postCheckOut(token: string, formData) {

  const url = api + `/checkout`
  const data = {}

  Object.entries(formData).forEach(([key, value]) => {
        data[key] = value.value
  })
  
  try {
    console.log(data)
    const response = await axios.post(url, data, configObj(token))
    
    return response
  } catch (error) {
    return error
  }

}