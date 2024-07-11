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
  onBlur = () => {},
}) {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={name}>{label}</label>
      <Input01
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className={styles.errorTextBox}>
        {errorText !== '' ? <span className={styles.errorText}>{errorText}</span> : ''}
      </div>
    </div>
  )
}
