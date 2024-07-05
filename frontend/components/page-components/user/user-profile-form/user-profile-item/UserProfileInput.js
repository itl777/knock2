import styles from './item.module.scss'
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
        <label htmlFor={name} className={styles.myLabel}>
          {label}
        </label>
        <div className={styles.myDiv}>
          <Input01
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
          />
          <div className={styles.errorText}>
            {errorText !== '' ? <span>{errorText}</span> : ''}
          </div>
        </div>
      </div>
    </>
  )
}
