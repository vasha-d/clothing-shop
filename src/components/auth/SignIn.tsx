import { useState } from 'react'
import styles from './auth.module.css'
import type { SignInObjType } from '../../types'
import { postSignIn} from './api'
import { Navigate, useNavigate } from 'react-router-dom'
const defaultDataState = {
  email: '',
  password: '',
}

function SignIn() {

  const [dataObj, setDataObj] = useState<SignInObjType>(defaultDataState)
  const navigate = useNavigate()
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
    const req = await postSignIn(dataObj)
    const token = req.data.token
    localStorage.setItem('token', token)
    console.log(localStorage.getItem('token'))
    // document.cookie = `token=${token}; Secure; SameSite=Lax`
    //If Sign In successful, go to shop page
    if (req.status == 200) {
      navigate('/products')
    }
  }
  return (
    <div>
      <div className={styles.formContainer}>
          <form>

            <input type="email" name="email" placeholder='Email' required
            id="email" onChange={handleChange} value={dataObj.email} />
            <input type="password" name='password' id='password'
              placeholder='Password'
              onChange={handleChange} value={dataObj.password}
            ></input>

            <button onClick={submitForm}>SignIn</button>
          </form>
      </div>

    </div>
  )
}

export default SignIn