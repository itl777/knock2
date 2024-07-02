import styles from './item.module.scss'
import Select02 from '@/components/UI/form-item/select02/index'

export default function UserProfileSelect({
  name = '',
  value = '',
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
          <Select02
            name={name}
            placeholder={placeholder}
            value={value}
            options={options}
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
