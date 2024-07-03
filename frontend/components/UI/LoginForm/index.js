import { useState } from 'react'
import Link from 'next/link'
// context
import { useAuth } from '@/context/auth-context'
import { useSnackbar } from '@/context/snackbar-context'
// styles
import styles from './login-form.module.scss'
// components
import Modal from '@mui/material/Modal'
import LoginFormInput from './login-input'

export default function LoginForm({ loginFormState, handleLoginFormClose }) {
  // context
  const { login } = useAuth()
  const { openSnackbar } = useSnackbar()
  // state
  const [loginFormData, setLoginFormData] = useState({
    account: '',
    password: '',
  })
  const [loginFormError, setLoginFormError] = useState('')

  // function
  const handleLoginFormChange = (e) => {
    const { name, value } = e.target
    const newLoginFormData = { ...loginFormData, [name]: value }
    setLoginFormData(newLoginFormData)
  }

  const LoginFormSubmit = async (e) => {
    e.preventDefault()
    const result = await login(loginFormData.account, loginFormData.password)
    if (result.success) {
      // 如果登入成功
      handleLoginFormClose()
      setLoginFormData({
        account: '',
        password: '',
      })
      setLoginFormError('')
      openSnackbar('登入成功！', 'success')
    } else {
      // 如果登入失敗
      setLoginFormError(result.error)
    }
  }

  return (
    <>
      <Modal
        open={loginFormState}
        onClose={() => {
          setLoginFormData({
            account: '',
            password: '',
          })
          setLoginFormError('')
          handleLoginFormClose()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form className={styles.login} onSubmit={LoginFormSubmit}>
          <div className={styles.title}>
            <h3>會員登入</h3>
          </div>
          <div className={styles.inputBx}>
            <LoginFormInput
              name="account"
              type="text"
              value={loginFormData.account}
              placeholder="請輸入帳號"
              onChange={handleLoginFormChange}
            />
          </div>
          <div className={styles.inputBx}>
            <LoginFormInput
              name="password"
              type="password"
              value={loginFormData.password}
              placeholder="請輸入密碼"
              onChange={handleLoginFormChange}
            />
          </div>
          <div className={styles.inputBx}>
            <span className={styles.errorText}>{loginFormError}</span>
            <Link href="">
              <span>忘記密碼？</span>
            </Link>
          </div>
          <div className={styles.inputBx}>
            <input type="submit" value="登入" />
          </div>
          <div className={styles.links}>
            <Link href="">
              <span>尚未註冊會員？ 立即註冊</span>
            </Link>
          </div>
          <div className={styles.links}>
            <span>——— 或選擇其他方式登入 ———</span>
          </div>
          <div className={styles.links}>{/* 第三方登入 */}</div>
        </form>
      </Modal>
    </>
  )
}
