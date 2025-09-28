import type { RegistrationObjType, SignInObjType } from "../../types";
import axios, { AxiosError } from "axios";
const api = 'https://api.redseam.redberryinternship.ge/api'

export async function postNewAccount (obj: RegistrationObjType) {

  const url = api + '/register'
  const data = new FormData()
  for (const [key, value] of Object.entries(obj)) {
    if (value != null) {
      data.append(key, value)
      
    }
  }
  console.log(data)
  try {
    const register = await axios.post(url, data, {
    headers: {
      "Accept": "application/json"
    }
  })
    return null 
  } catch (error) {
    console.log(error)
    return error as AxiosError
  }


}
export async function postSignIn(signInObj: SignInObjType) {

  const url = api + '/login'
  const data = new FormData()
  data.append('email',signInObj.email)
  data.append('password',signInObj.password)
  try {
    const signIn = await axios.post(url, signInObj, {
      headers: {
        "Accept": 'application/json'
      } 
    })
    return signIn   
  } catch (error) {
    console.log(error)
    return error as AxiosError
  }


}



export function readCookie() {

  const cookie = document.cookie
  const data = cookie.split('=')[1]
  const obj = JSON.parse(decodeURIComponent(data))
  

  return obj as {email: string, username: string, token: string}
}