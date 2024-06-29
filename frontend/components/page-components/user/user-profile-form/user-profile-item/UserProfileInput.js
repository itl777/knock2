import { useEffect, useState } from 'react'
import styles from './item.module.scss'
import Input01 from '../../../../UI/form-item/input01'

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

  return (
    <>
      <div className={styles.formItem}>
        <label htmlFor={name} className={styles.myLabel}>{label}</label>
        <div className={styles.myDiv}>
          <Input01
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
          />
          {errorText !== '' ? (
            <span className={styles.errorText}>{errorText}</span>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}
