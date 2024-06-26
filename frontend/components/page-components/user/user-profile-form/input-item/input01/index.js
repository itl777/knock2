import styles from './input01.module.scss'

export default function Input01({
  name = '',
  type = '',
  value = '',
  placeholder = '',
  disabled = false,
  onChange = () => {},
}) {
  const inputClassName = (() => {
    switch (type) {
      case 'email':
        return styles.inputDisabled
      case 'password':
        return styles.inputDisabled
      case 'text':
        return styles.inputDefault
      default:
        return styles.inputDefault
    }
  })()
  return (
    <>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled === true ? 'disabled' : ''}
        className={inputClassName}
        onChange={onChange}
      />
    </>
  )
}
