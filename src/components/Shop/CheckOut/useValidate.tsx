import { useState } from "react"
import { readCookie } from "../../auth/api"
import { postCheckOut } from "../api/cart"
import type { ValidationObjType } from "../../../types"

type FormDataObjType = {
  name:  ValidationObjType,
  surname: ValidationObjType,
  email: ValidationObjType,
  address: ValidationObjType,
  zip_code: ValidationObjType
}
const defaultValidationObj: ValidationObjType= {
  value: '',
  message: '',
  valid: false,
  showError: false
}
const defaultDataObjType: FormDataObjType = {
  name: {...defaultValidationObj},
  surname: {...defaultValidationObj},
  email: {...defaultValidationObj, value: readCookie().email},
  address: {...defaultValidationObj},
  zip_code: {...defaultValidationObj}
}
const token = readCookie().token
export default function useValidate() {

  const [formData, setFormData] = useState<FormDataObjType>(defaultDataObjType)
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    let newValue = e.target.value
    const targetField = e.target.id as string
    const newValidationObj = {...formData[targetField as keyof FormDataObjType] as ValidationObjType} 
    newValidationObj.value = newValue
    setFormData(old => {
      return {...old, [targetField]: newValidationObj}
    })
  }
  function resetErrors () {
    setFormData(old => {

      const newData = {...old}
      Object.entries(newData).forEach(([key, value]) => {
        newData[key] = {...value, showError: false, message: '', valid: false}
      })
      return newData
    })
  }
  function handleBackendErrors (errors) {

    Object.entries(errors).forEach(([key, value]) => {
      setFormData(f => {
        const newValidationObj = f[key as keyof FormDataObjType] as ValidationObjType
        newValidationObj.valid = false
        newValidationObj.showError = true
        newValidationObj.message = value as string


        return {...f, [key]: newValidationObj}
      })
    })
  }
  async function submitCheckoutForm (onSuccess: () => void) {
    const data = {}
    

    const req = await postCheckOut(token, formData)
    console.log(req)
    if (req.status == 200) {
      onSuccess()
    } else if (req.status == 422) {
      let errors = req?.response.data.errors
      resetErrors()
      handleBackendErrors(errors)
    }
     
  }
  return {formData, handleChange, submitCheckoutForm}

}