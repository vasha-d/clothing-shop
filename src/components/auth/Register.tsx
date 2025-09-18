import { useState } from 'react'
import styles from './auth.module.css'
import type { RegistrationObjType } from '../../types'
import { postNewAccount } from './api'
const defaultDataState = {
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  avatar: null
}

function Register() {

  const [dataObj, setDataObj] = useState<RegistrationObjType>(defaultDataState)
  const [avatarURL, setAvatarURL] = useState<string | undefined>(undefined)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement
    const img = target.files?.[0] as File
    const imgURL = URL.createObjectURL(img)
    setDataObj(prev => {
      return {...prev, avatar: img}
    })
    setAvatarURL(imgURL)
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    
    console.log(e.target.id)
    setDataObj(prev => {
        return {...prev, [e.target.id]: e.target.value}
      }
    )

    console.log(dataObj)
  }
  async function submitForm (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const req = await postNewAccount(dataObj)
    console.log(req)

  }
  return (
    <div>
      <div className={styles.formContainer}>
          <form>
            <div className={styles.imgForm}>
              aa
              <input onChange={handleFile} type="file" accept='image/*' />
              <img src={avatarURL} ></img>
            </div>
            <input type="text" onChange={handleChange} value={dataObj.username}
            placeholder='Username' name="username" id="username" />
            <input type="email" name="email" id="email" onChange={handleChange} value={dataObj.email} />
            <input type="password" name='password' id='password'
              onChange={handleChange} value={dataObj.password}
            ></input>
            <input type="password" name='password_confirmation' id='password_confirmation'
              onChange={handleChange} value={dataObj['password_confirmation']}
            ></input>

            <button onClick={submitForm}>Register</button>
          </form>
      </div>
      <a href="/sign-in">Or Sign IN</a>
    </div>
  )
}

export default Register