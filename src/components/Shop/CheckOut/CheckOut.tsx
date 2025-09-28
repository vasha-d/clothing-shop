import { readCookie } from '../../auth/api'
import styles from './checkout.module.css'
import ErrorMessage from './ErrorMessage'
import useValidate from './useValidate'

function CheckOut({cartElement}: {cartElement: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>}) {

  console.log(readCookie())

  const {formData, handleChange, submitCheckoutForm} = useValidate()
  const {name, surname, email, zip_code, address} = formData

  function isValidClass(showError: boolean) {
    return showError ? ' '+styles.invalid : ''
  }
  return (
    <div className={styles.page}>
      <h1>Checkout</h1>
      <div className={styles.body}> 
        <div className={styles.main}>
          <h2>
            Order details
          </h2>
          <div className={styles.forms}>
            <div className={styles.inputWrapper+isValidClass(name.showError)}>
              <input onChange={handleChange} value={name.value}
               type="text" name="name" id="name" placeholder='Name' />
              <ErrorMessage validationObj={name}></ErrorMessage>
            </div>
            <div className={styles.inputWrapper+isValidClass(surname.showError)}>
              <input onChange={handleChange} value={surname.value}
               type="text" name="surname" id="surname" placeholder='Surname' />
              <ErrorMessage validationObj={surname}></ErrorMessage>


            </div>
            <div className={styles.inputWrapper+` `+styles.mail+isValidClass(email.showError)}>
              <input onChange={handleChange} value={email.value}
               className={styles.mail} type="email" name="email" id="email" placeholder='Email'/>
              <ErrorMessage validationObj={email}></ErrorMessage>

            </div>
            <div className={styles.inputWrapper+isValidClass(address.showError)}>
              <input onChange={handleChange} value={address.value}
               type="text" name="address" id="address" placeholder='Address' />
              <ErrorMessage validationObj={address}></ErrorMessage>

            </div>
            <div className={styles.inputWrapper+isValidClass(zip_code.showError)}>
              <input onChange={handleChange} value={zip_code.value}
               type="number" name="zip_code" id="zip_code" placeholder='Zip' />
              <ErrorMessage validationObj={zip_code}></ErrorMessage>

            </div>
          </div>
        </div>

        {cartElement}
        <button className='big-button' onClick={submitCheckoutForm} >Pay</button>
      </div>
    </div>
  )
}

export default CheckOut