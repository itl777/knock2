import { useEffect, useState } from 'react'
import styles from './item.module.scss'
import Radio01 from '@/components/UI/form-item/radio01'

export default function UserProfileRadio({
  label = '',
  errorText = '',
  radios = [],
  name = '',
  checked = '',
  disabled = false,
  onChange = () => {},
}) {
  return (
    <>
      <div className={styles.formItem}>
        <label className={styles.myLabel} htmlFor={name}>
          {label}
        </label>
        <div className={styles.myDiv}>
          <Radio01
            radios={radios}
            name={name}
            disabled={disabled}
            checked={checked}
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
