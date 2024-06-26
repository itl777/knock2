import { useEffect, useState } from 'react'
import styles from './input.module.scss'
import Input01 from './input01'

export default function UserProfileInput({
  label = '',
  name = '',
  type = '',
  value = '',
  placeholder = '',
  disabled = false,
  errorText = '',
  onChange = () => {},
}) {
  const [errorTextState, setErrorTextState] = useState(false)

  useEffect(() => {
    const newErrorTextState = errorText !== '' ? true : false
    setErrorTextState(newErrorTextState)
  }, [errorText])

  return (
    <>
      <div className={styles.formItem}>
        <label htmlFor={name}>{label}</label>
        <div>
          <Input01
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
          />
          {errorTextState === true ? <span>{errorText}</span> : ''}
        </div>
      </div>
    </>
  )
}
