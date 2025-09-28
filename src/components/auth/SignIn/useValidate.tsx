import { useState } from "react";
import { postSignIn } from "../api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type ValidationObjType = {
  value: string,
  valid: boolean,
  showError: boolean,
  message: string
}

const defaultValidationObj: ValidationObjType = {value: '', valid: false, message: '', showError: false}
function useValidate() {

  const [email, setEmail] = useState(defaultValidationObj)
  const [password, setPassword] = useState(defaultValidationObj)
  const navigate = useNavigate()


  function hasThreeSymbols(s: string) {
    return s.trim().length > 2
  }

  function validEmail(s: string) {
    const condition1 = s.includes('@')
    if (!condition1) return false
    const splitString = s.split('@')
    const condition2 = !!splitString[0].trim().length && !!splitString[1].trim().length 
    return condition2
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const valid = validEmail(value)
    let message = valid ? '' : 'Invalid email!'  
    const showError = !!value && !valid
    
    setEmail({value, valid, message, showError})
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const valid = hasThreeSymbols(value)
    const symbolsMsg = valid ? '' : 'Password must have at least 3 symbols!'  
    const showError = !!value && !valid
    
    setPassword({value, valid, message: symbolsMsg, showError})
  }    
    

  function handleBackendError(error: AxiosError | null) {
    const messages = error?.response?.data?.errors
    if (error == null) return;
    if (error.status == 401) {
      setEmail(e => {
        return {value: e.value, message: 'Invalid Credentials', showError: true, valid: false}
      })
      setPassword(p => {
        return {value: p.value, message: 'Invalid Credentials', showError: true, valid: false}
      })
      return
    }

    if (!messages) return;

    if (messages.email) {
      setEmail(e => {
        return {...e, message: messages.email, showError: true, valid: false}
      })
    } 
    if (messages.password) {
    setPassword(p => {
        return {...p, message: messages.email, showError: true, valid: false}
      })
    }
  }

  async function submitSignIn (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const dataObj = {
     email:email.value,
      password: password.value
    }
    const req = await postSignIn(dataObj)
    if (req.status == 200) {
      
      //If Sign In successful, go to shop page
      navigate('/products')
    } else {  
      handleBackendError(req as AxiosError)
    }
  }
  return {
    email,
    handleEmail,
    password,
    handlePassword,
    submitSignIn
  }

}




export default useValidate