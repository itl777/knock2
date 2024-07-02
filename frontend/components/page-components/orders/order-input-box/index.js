import styles from './order-input-box.module.css'
import Input01 from '@/components/UI/form-item/input01'

export default function OrderInputBox({
  label = 'label',
  name = '',
  type = '',
  value = '',
  placeholder = '',
  disabled = false,
  errorText = '',
  onChange = () => {},
}) {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={name} className={styles.labelStyle}>
        {label}
      </label>
      <Input01
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  )
}
