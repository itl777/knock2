import { useEffect, useState } from 'react'
import styles from './select.module.scss'
import Select01 from './select01'

export default function UserProfileSelect({
  options = [],
  label = '',
  name = '',
  placeholder = '',
  errorText = '',
}) {
  const [errorTextState, setErrorTextState] = useState(false)

  useEffect(() => {
    const newErrorTextState = errorText !== '' ? true : false
    setErrorTextState(newErrorTextState)
  }, [errorText])

  return (
    <>
      <div className={styles.formItem}>
        <label htmlFor={name} className={styles.myLabel}>
          {label}
        </label>
        <div className={styles.myDiv}>
          <Select01 options={options} name={name} placeholder={placeholder} />
          {errorTextState === true ? (
            <span className={styles.errorText}>{errorText}</span>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}
