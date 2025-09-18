import { useState } from 'react'
import styles from './auth.module.css'
import type { SignInObjType } from '../../types'
import { postSignIn} from './api'
const defaultDataState = {
  email: '',
  password: '',
}

function SignIn() {

  const [dataObj, setDataObj] = useState<SignInObjType>(defaultDataState)

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