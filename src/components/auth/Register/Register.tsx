import styles from '../auth.module.css'
import avatarPlaceholder from '../../../assets/upload-avatar.svg' 
import showPasswordImg from '../../../assets/show-password.svg'
import useValidate from './useValidate'
import ErrorMessage from '../ErrorMessage'
import PlaceHolderElement from '../FormPlaceholder'
import { useState } from 'react'

function Register() {
  
  const {
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
    removeAvatar,
    submitRegister,
  } = useValidate()

  const [passwordHidden, setPasswordHidden] = useState<Boolean[]>([true, true])
  function isValidClass(showError: boolean) {

    return showError ? ' '+styles.invalid : ''
  }
  function toggleMainHidden() {
    setPasswordHidden(h => {
      return [!h[0], h[1]]
    })
  }
  function toggleConfirmationHidden() {
    setPasswordHidden(h => {
      return [h[0], !h[1]]
    })
  }
  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
          <div className={styles.head}>
            Registration
          </div>
          <form className={styles.formList}>

            <div className={styles.imgForm}>
              <label className={styles.imgLabel}>
              <img className={styles.avatar} src={avatarFile.url || avatarPlaceholder} />
                Upload New
                <input onChange={handleFile} type="file" accept='image/*' />
              </label>
              <div onClick={removeAvatar} className={styles.removeAvatar}>Remove</div>
              <div className={styles.avatarError}>
                {avatarFile.message}
              </div>
            </div>

            <div className={styles.inputWrapper + isValidClass(username.showError)}>
              <input type="text" onChange={handleUsername} value={username.value}
               name="username" id="username" />
              <PlaceHolderElement text='Username' value={username.value}/>
              <ErrorMessage validationObj={username}/>
            </div>

            <div className={styles.inputWrapper + isValidClass(email.showError)}>
              <input type="email" name="email" id="email" 
              onChange={handleEmail} value={email.value} />
              <PlaceHolderElement text='Email' value={email.value}/>
              <ErrorMessage validationObj={email}/>
            </div>

            <div className={styles.inputWrapper + isValidClass(password.showError)}>
              <input type={passwordHidden[0] ? 'password' : 'text'} name='password' id='password'
              onChange={handlePassword} value={password.value}
              ></input>
              <PlaceHolderElement text='Password' value={password.value}/>
              <ErrorMessage validationObj={password}/>
              <img onClick={toggleMainHidden} className={styles.togglePasswordHidden} src={showPasswordImg} alt="" />
            </div>
            
            <div className={styles.inputWrapper + isValidClass(confirmPassword.showError)}>
              <input type={passwordHidden[1] ? 'password' : 'text'} name='password_confirmation' id='password_confirmation'
              onChange={handleConfirmPassword} value={confirmPassword.value}
              ></input>
              <PlaceHolderElement text='Confirm Password' value={confirmPassword.value}/>
              <ErrorMessage validationObj={confirmPassword}/>
              <img onClick={toggleConfirmationHidden} className={styles.togglePasswordHidden} src={showPasswordImg} alt="" />
            </div>
            
            <button className= {styles.submit} onClick={submitRegister}>Register</button>
            <a className={styles.altLink} href="/sign-in">
              Already a member?  <span>Log in</span>
            </a>
          </form>
      </div>
    </div>
  )
}

export default Register