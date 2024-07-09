import styles from './input01.module.scss'

export default function Input01({
  name = '',
  type = '',
  value = '',
  placeholder = '',
  disabled = false,
  inputStyles = 'def',
  onChange = () => {},
}) {
  value === null ? (value = '') : value

  let className

  if (inputStyles === 'def') {
    className = disabled === false ? styles.inputDefault : styles.inputDisabled
  }

  if (inputStyles === 'line') {
    className =
      disabled === false ? styles.inputDefaultLine : styles.inputDisabledLine
  }

  return (
    <>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled === true ? 'disabled' : ''}
        className={className}
        onChange={onChange}
      />
    </>
  )
}
