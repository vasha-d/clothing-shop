import { useState } from 'react'
import styles from './auth.module.css'
import type { RegistrationObjType } from '../../types'
import avatarPlaceholder from '../../assets/upload-avatar.svg'
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
    removeAvatar
  } = useValidate()


  function validClass(showError: boolean) {
    return showError ? ' '+styles.invalid : ''
  }
  function PlaceHolderElement ({text, value}: {text: string, value: string}) {

    return (
      <div className={!!value ? styles.hide : styles.placeholder }>
        {text} <span>*</span>
      </div>
    )
  }  
  function ErrorMessage ({validationObj}: {validationObj: {value: string, showError: boolean}}) {

    return (
      <div className={styles.message}>
        {validationObj.showError ? validationObj.message : ''}
      </div> 
    )
  }
  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
          <div className={styles.head}>
            Registration
          </div>
          <form className={styles.formList}>
            <div className={styles.imgForm}>
              <img className={styles.avatar} src={avatarFile.url || avatarPlaceholder} />
              <label className={styles.imgLabel}>
                Upload New
                <input onChange={handleFile} type="file" accept='image/*' />
              </label>
              <div onClick={removeAvatar} className={styles.removeAvatar}>Remove</div>
            </div>
            <div className={styles.inputWrapper + validClass(username.showError)}>
              <input type="text" onChange={handleUsername} value={username.value}
               name="username" id="username" />
              <PlaceHolderElement text='Username' value={username.value}/>
              <ErrorMessage validationObj={username}/>
            </div>
            <div className={styles.inputWrapper + validClass(email.showError)}>
              <input type="email" name="email" id="email" 
              onChange={handleEmail} value={email.value} />
              <PlaceHolderElement text='Email' value={email.value}/>
              <ErrorMessage validationObj={email}/>
            </div>
            <div className={styles.inputWrapper + validClass(password.showError)}>
              <input type="password" name='password' id='password'
              onChange={handlePassword} value={password.value}
              ></input>
              <PlaceHolderElement text='Password' value={password.value}/>
              <ErrorMessage validationObj={password}/>
            </div>
            
            <div className={styles.inputWrapper + validClass(confirmPassword.showError)}>
              <input type="password" name='password_confirmation' id='password_confirmation'
              onChange={handleConfirmPassword} value={confirmPassword.value}
              ></input>
              <PlaceHolderElement text='Confirm Password' value={confirmPassword.value}/>
              <ErrorMessage validationObj={confirmPassword}/>

            </div>
            <button className= {styles.register} onClick={submitForm}>Register</button>
            <a className={styles.altLink} href="/sign-in">
              Already a member?  <span>Log in</span>
            </a>
          </form>
      </div>
    </div>
  )
}

export default Register