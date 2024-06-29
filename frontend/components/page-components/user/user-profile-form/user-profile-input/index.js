import { useEffect, useState } from 'react'
import styles from './input.module.scss'
import Input01 from '@/components/UI/form-item/input01'

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
