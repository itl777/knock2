import styles from './item.module.scss'
import Input01 from '@/components/UI/form-item/input01'
import FilterBtn from '@/components/UI/filter-btn'

export default function UserProfileInput({
  label = '',
  name = '',
  type = '',
  value = '',
  placeholder = '',
  disabled = false,
  btn = false,
  btnText = '',
  errorText = '',
  onChange = () => {},
  btnOnClick = () => {},
}) {
  return (
    <>
      <div className={styles.formItem}>
        <label htmlFor={name} className={styles.myLabel}>
          {label}
        </label>
        <div className={styles.myDiv}>
          <div className={styles.row}>
            <Input01
              name={name}
              type={type}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChange}
            />
            {btn ? (
              <div className={styles.button}>
                <FilterBtn onClick={btnOnClick} btnText={btnText} />
              </div>
            ) : null}
          </div>
          <div className={styles.errorText}>
            {errorText !== '' ? <span>{errorText}</span> : ''}
          </div>
        </div>
      </div>
    </>
  )
}
