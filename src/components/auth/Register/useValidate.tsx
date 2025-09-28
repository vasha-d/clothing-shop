import { useState } from "react";
import { postNewAccount, postSignIn } from "../api";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type ValidationObjType = {
  value: string,
  valid: boolean,
  showError: boolean,
  message: string
}
type avatarObjTye = {
  url: string | undefined,
  file: null | File,
  showError: boolean,
  valid: boolean,
  message: string,
}
const defaultAvatarObj: avatarObjTye = {url: undefined, file: null, valid: false, message: '', showError: false}
const defaultValidationObj: ValidationObjType = {value: '', valid: false, message: '', showError: false}
function useValidate() {

  const [username, setUsername] = useState(defaultValidationObj)
  const [email, setEmail] = useState(defaultValidationObj)
  const [password, setPassword] = useState(defaultValidationObj)
  const [confirmPassword, setConfirmPassword] = useState(defaultValidationObj)
  const [avatarFile, setAvatarFile] = useState<avatarObjTye>(defaultAvatarObj)
  const navigate = useNavigate()
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0] as File
    const url = URL.createObjectURL(file)
    setAvatarFile(old => {
      return {...old, url, file}
    }
    )
    e.target.value = ''
  }

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
  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const valid = hasThreeSymbols(value) 
    let message = valid ? '' : 'Username must have at least 3 symbols!'  
    const showError = !!value && !valid

    setUsername({value, valid, message, showError})
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
    
    const confrimFieldValid = value == confirmPassword.value
    const matchMsg = confrimFieldValid ? '' : 'Password fields must match!'
    setPassword({value, valid, message: symbolsMsg, showError})
    
    
    const showConfirmError = !!matchMsg
    setConfirmPassword(prev => {
      return {...prev, valid: confrimFieldValid, message: matchMsg, showError: showConfirmError}
    })
  }
  function handleConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const valid = value == password.value
    const message = valid ? '' : 'Password fields must match!'
    const showError = !valid
    
    setConfirmPassword({value, valid, message, showError})
  }
  function removeAvatar () {
    setAvatarFile(defaultAvatarObj)
  }
  function handleBackendError(error: AxiosError | null) {

    if (error.code == 'ERR_NETWORK') {
      setAvatarFile(old => {
        return {
          ...old,
          message: 'Avatar size can not exceed 1 mb!',
          showError: true,
          valid: false
        }
      })
    }
    const messages = error?.response?.data?.errors
    if (!messages) return;
    if (messages.email) {
      setEmail(u => {
        return {...u, message: messages.email, showError: true, valid: false}
      })
    }
    if (messages.username) {
      setUsername(u => {
        return {...u, message: messages.username, showError: true, valid: false}
      })
    }
    
  }
  async function submitRegister (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const dataObj = {
      username: username.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
      avatar: avatarFile.file || null
    }
    const req = await postNewAccount(dataObj)
    if (req?.status == 200) {
      await postSignIn({
        email: email.value,
        password: password.value
      })
      navigate('/products')
    } else {
      handleBackendError(req)
    }

  }

  return {
    username,
    handleUsername,
    email,
    handleEmail,
    password,
    handlePassword,
    confirmPassword,
    handleConfirmPassword,
    avatarFile,
    handleFile,
    submitRegister,
    removeAvatar
  }

}




export default useValidate