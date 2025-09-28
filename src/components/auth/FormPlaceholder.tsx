import styles from './auth.module.css'

export default function PlaceHolderElement ({text, value}: {text: string, value: string}) {

  return (
    <div className={!!value ? styles.hide : styles.placeholder }>
      {text} <span>*</span>
    </div>
  )
}  