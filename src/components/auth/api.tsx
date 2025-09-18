import type { RegistrationObjType, SignInObjType } from "../../types";
import axios from "axios";
const api = 'https://api.redseam.redberryinternship.ge/api'

export async function postNewAccount (obj: RegistrationObjType) {

  const url = api + '/register'
  const data = new FormData()
  for (const [key, value] of Object.entries(obj)) {
    if (value != null) {
      data.append(key, value)
      
    }
  }
  const register = await axios.post(url, data, {
    headers: {
      "Accept": "application/json"
    }
  })
  console.log(register.data)
  console.log(register)
}


export async function postSignIn(signInObj: SignInObjType) {

  const url = api + '/login'
  const data = new FormData()
  data.append('email',signInObj.email)
  data.append('password',signInObj.password)



  const signIn = await axios.post(url, signInObj, {
    headers: {
      "Accept": 'application/json'
    } 
  })
  return signIn

}

