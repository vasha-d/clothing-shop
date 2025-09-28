import styles from './auth.module.css'  
  
export default function ErrorMessage ({validationObj}: {validationObj: {value: string, message: string, showError: boolean}}) {

  return (
    <div className={styles.message}>
      {validationObj.showError ? validationObj.message : ''}
    </div> 
  )
}