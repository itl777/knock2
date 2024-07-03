import styles from './input.module.scss'

export default function LoginFormInput({
  name = '',
  type = '',
  value = '',
  placeholder = '',
  disabled = false,
  onChange = () => {},
}) {
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
