import { useEffect, useState } from 'react'
import styles from './radio.module.scss'
import Radio01 from '../../../../UI/form-item/radio01'

export default function UserProfileRadio({
  label = '',
  errorText = '',
  radio = [],
  name = '',
  checked = '',
  disabled = false,
  onChange = () => {},
}) {

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
