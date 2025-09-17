import type { RegistrationObjType } from "../../types";
import axios from "axios";
const api = 'https://api.redseam.redberryinternship.ge/api'

export async function postAccount (obj: RegistrationObjType) {

  const url = api + '/register'
  const data = new FormData()
  for (const [key, value] of Object.entries(obj)) {
    data.append(key, value)
  }

  console.log(data, obj)
  const register = await axios.post(url, data, {
    headers: {
      "Accept": "application/json"
    }
  })
  console.log(register.data)
  console.log(register)
}