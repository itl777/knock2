import styles from './item.module.scss'
import Select01 from '@/components/UI/form-item/select01'

export default function UserProfileSelect({
  name = '',
  defaultValue = '',
  placeholder = '',
  options = [],
  label = '',
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
          <Select01
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            options={options}
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
