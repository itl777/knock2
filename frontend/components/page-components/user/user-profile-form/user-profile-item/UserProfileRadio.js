import { useEffect, useState } from 'react'
import styles from './item.module.scss'
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
        <label className={styles.myLabel} htmlFor={name}>
          {label}
        </label>
        <div className={styles.myDiv}>
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
