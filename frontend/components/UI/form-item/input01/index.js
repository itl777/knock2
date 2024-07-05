import styles from './input01.module.scss'

export default function Input01({
  name = '',
  type = '',
  value = '',
  placeholder = '',
  disabled = false,
  onChange = () => {},
}) {
  value === null ? (value = '') : value
  return (
    <>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled === true ? 'disabled' : ''}
        className={
          disabled === true ? styles.inputDisabled : styles.inputDefault
        }
        onChange={onChange}
      />
    </>
  )
}
