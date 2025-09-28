import type { ValidationObjType } from '../../../types'
import styles from '../../auth/auth.module.css'  
  
export default function ErrorMessage ({validationObj}: {validationObj: ValidationObjType}) {
  return (
    <div className={styles.message}>
      {validationObj.showError ? validationObj.message[0] : ''}
    </div> 
  )
}