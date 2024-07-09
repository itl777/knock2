import styles from './order-select-box.module.css'
import Select02 from '@/components/UI/form-item/select02'

export default function OrderSelectBox({
  label = 'label',
  name = '',
  value = '',
  placeholder = '',
  options = [],
  errorText = '',
  onChange = () => {},
}) {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={name} className={styles.labelStyle}>
        {label}
      </label>
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
  )
}
