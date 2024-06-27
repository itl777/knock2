import { useEffect, useState } from 'react'
import styles from './radio.module.scss'
import Radio01 from './radio01'

export default function UserProfileInput({
  radio = [],
  label = '',
  name = '',
  disabled = false,
  DBvalue = '',
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
        <label className={styles.mylabel} htmlFor={name}>
          {label}
        </label>
        <div className={styles.radio}>
          <Radio01
            radio={radio}
            name={name}
            disabled={disabled}
            DBvalue={DBvalue}
          />
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
