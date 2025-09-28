import styles from '../auth.module.css'
import useValidate from './useValidate'
import PlaceHolderElement from '../FormPlaceholder'
import ErrorMessage from '../ErrorMessage'
import showPasswordImg from '../../../assets/show-password.svg'
import { useState } from 'react'
function SignIn() {

  const {
    email,
    handleEmail,
    password,
    handlePassword,
    submitSignIn
  } = useValidate()
  const [passwordHidden, setPasswordHidden] = useState(true)
  
  function isValidClass(showError: boolean) {
    return showError ? ' '+styles.invalid : ''
  }
  function togglePasswordHide() {
    setPasswordHidden(h => !h)
  }
  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
          <form className={styles.formList}>
            
            <div className={styles.head}>Log in</div>

            <div className={styles.inputWrapper+isValidClass(email.showError)}>
              <input type="email" name="email" 
              id="email" onChange={handleEmail} value={email.value} />
              <PlaceHolderElement text='Email' value={email.value}/>
              <ErrorMessage validationObj={email}/>

            </div>

            <div className={styles.inputWrapper+isValidClass(password.showError)}>
              <input type={passwordHidden ? 'password' : 'text'} name='password' id='password'
                onChange={handlePassword} value={password.value}
              ></input>
              <PlaceHolderElement text='Password' value={password.value}/>
              <ErrorMessage validationObj={password}/>
              <img onClick={togglePasswordHide} className={styles.togglePasswordHidden} src={showPasswordImg} alt="" />
            </div>

            <button className={styles.submit} onClick={submitSignIn}>SignIn</button>

            <a className={styles.altLink} href="/register">
              Not a memeber?  <span>Register</span>
            </a>
          </form>
      </div>

    </div>
  )
}

export default SignIn