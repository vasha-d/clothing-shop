import { useState } from 'react'
import styles from './auth.module.css'
import type { RegistrationObjType } from '../../types'
import { postNewAccount } from './api'
import useValidate from './useValidate'
const defaultDataState = {
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  avatar: null
}

function Register() {

  const [dataObj, setDataObj] = useState<RegistrationObjType>(defaultDataState)
  
  const {
    username,
    handleUsername,
    email,
    handleEmail,
    password,
    handlePassword,
    confirmPassword,
    handleConfirmPassword,
    submitForm,
    avatarFile,
    handleFile,
  } = useValidate()


  function validClass(showError: boolean) {
    return showError ? ' '+styles.invalid : ''
  }
  return (
    <div>
      <div className={styles.formContainer}>
          <form>
            <div className={styles.imgForm}>
              <input onChange={handleFile} type="file" accept='image/*' />
              <img src={avatarFile.url} ></img>
            </div>
            <div className={styles.form + validClass(username.showError)}>
              <input type="text" onChange={handleUsername} value={username.value}
              placeholder='Username' name="username" id="username" />
              <div className={styles.message}>
                {username.showError ? username.message : ''}
              </div>
            </div>
            <div className={styles.form + validClass(email.showError)}>
              <input type="email" name="email" id="email" 
              placeholder='Email'
              onChange={handleEmail} value={email.value} />
              <div className={styles.message}>
                {email.showError ? email.message : ''}
              </div>
            </div>
            <div className={styles.form + validClass(password.showError)}>
              <input type="password" name='password' id='password'
              onChange={handlePassword} value={password.value}
              ></input>
              <div className={styles.message}>
                {password.showError ? password.message : ''}                
              </div>
            </div>
            
            <div className={styles.form + validClass(confirmPassword.showError)}>
              <input type="password" name='password_confirmation' id='password_confirmation'
              onChange={handleConfirmPassword} value={confirmPassword.value}
              ></input>
              <div className={styles.message}>
                {confirmPassword.showError ? confirmPassword.message : ''}
              </div>

            </div>

            <button onClick={submitForm}>Register</button>
          </form>
      </div>
      <a href="/sign-in">Or Sign IN</a>
    </div>
  )
}

export default Register