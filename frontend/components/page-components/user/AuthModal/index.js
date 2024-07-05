import { useState } from 'react'
// context
import { useAuth } from '@/context/auth-context'
import { useSnackbar } from '@/context/snackbar-context'
// components
import LoginForm from './login-form'
import RegisterForm from './register-form'
import ForgotPasswordForm from './forgot-password-form'
import {
  schemaLoginForm,
  schemaRegisterForm,
  schemaForgetPasswordForm,
} from './schema-auth-forms'

export default function AuthModal({ loginModalState, setLoginModalState }) {
  // context
  const { login, register, forgotPassword } = useAuth()
  const { openSnackbar } = useSnackbar()

  // Login
  // 父元件傳的 loginModalState setLoginModalState  // open close
  const [loginData, setLoginData] = useState({ account: '', password: '' })
  const [loginErrors, setLoginErrors] = useState({
    account: '',
    password: '',
    result: '',
  })
  const handleLoginChange = (e) => {
    const { name, value } = e.target
    const newLoginData = { ...loginData, [name]: value }
    setLoginData(newLoginData)
  }
  const loginSubmit = async (e) => {
    e.preventDefault()

    // 資料驗證

    const LoginValidationResult = schemaLoginForm.safeParse(loginData)
    const newLoginErrors = { account: '', password: '', result: '' }

    if (!LoginValidationResult.success) {
      if (LoginValidationResult.error?.issues?.length) {
        for (let issue of LoginValidationResult.error.issues) {
          newLoginErrors[issue.path[0]] = issue.message
        }
        setLoginErrors(newLoginErrors)
      }
      return // 表單資料沒有驗證通過就直接返回
    }

    // 驗證完成，送出登入
    const result = await login(loginData.account, loginData.password)
    if (result.success) {
      // 如果登入成功
      setLoginModalState(false)
      setLoginData({ account: '', password: '' })
      setLoginErrors({ account: '', password: '', result: '' })
      openSnackbar('登入成功！', 'success')
    } else {
      // 如果登入失敗
      console.error(result.error)
      setLoginErrors({ account: '', password: '', result: '帳號或密碼錯誤' })
    }
  }

  // Register
  const [registerState, setRegisterState] = useState(false) // open close
  const [registerData, setRegisterData] = useState({
    account: '',
    password: '',
    reenter_password: '',
    name: '',
  })
  const [registerErrors, setRegisterErrors] = useState({
    account: '',
    password: '',
    reenter_password: '',
    name: '',
    result: '',
  })
  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    const newRegisterData = { ...registerData, [name]: value }
    setRegisterData(newRegisterData)
  }
  const registerSubmit = async (e) => {
    e.preventDefault()

    // 資料驗證
    const RegisterValidationResult = schemaRegisterForm.safeParse(registerData)
    const newRegisterErrors = {
      account: '',
      password: '',
      reenter_password: '',
      name: '',
      result: '',
    }

    if (!RegisterValidationResult.success) {
      if (RegisterValidationResult.error?.issues?.length) {
        for (let issue of RegisterValidationResult.error.issues) {
          newRegisterErrors[issue.path[0]] = issue.message
        }
        setRegisterErrors(newRegisterErrors)
      }
      return // 表單資料沒有驗證通過就直接返回
    }

    // 包裝
    const newRegisterData = { ...registerData, nick_name: registerData.name }

    const result = await register(
      newRegisterData.account,
      newRegisterData.password,
      newRegisterData.name,
      newRegisterData.nick_name
    )

    if (result.success) {
      // 如果註冊成功
      openSnackbar('註冊成功！返回登入', 'success')
      handleFormSwitch('Login')
    } else {
      // 如果註冊失敗
      setRegisterErrors({ result: 'Email已被註冊，請試試其他Email' })
    }
  }

  // ForgotPassword
  const [forgotPasswordState, setForgotPasswordState] = useState(false) // open close
  const [forgotPasswordData, setForgotPasswordData] = useState({
    account: '',
  })
  const [forgotForgotPasswordErrors, setForgotPasswordErrors] = useState({
    account: '',
    result: '',
  })
  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target
    const newPasswordData = { ...forgotPasswordState, [name]: value }
    setForgotPasswordData(newPasswordData)
  }
  const forgotPasswordSubmit = async (e) => {
    e.preventDefault()
    // 資料驗證
    const fpValidationResult =
      schemaForgetPasswordForm.safeParse(forgotPasswordData)
    const newForgotPasswordErrors = {
      account: '',
      result: '',
    }

    if (!fpValidationResult.success) {
      if (fpValidationResult.error?.issues?.length) {
        for (let issue of fpValidationResult.error.issues) {
          newForgotPasswordErrors[issue.path[0]] = issue.message
        }

        setForgotPasswordErrors(newForgotPasswordErrors)
      }

      return // 表單資料沒有驗證通過就直接返回
    }

    // 驗證成功，包裝送後端 OTP

    let result = forgotPassword(forgotPasswordData.account)
    if (result.success) {
      // 如果發送成功
      setForgotPasswordData({ account: '' })
      setForgotPasswordErrors({ account: '', result: '' })
      openSnackbar('發送成功', 'success')
    } else {
      // 如果發送失敗
      console.error(result.error)
      openSnackbar('發送失敗', 'error')
    }
  }

  // FormSwitch
  const handleFormSwitch = (formName) => {
    setLoginData({ account: '', password: '' })
    setRegisterData({
      account: '',
      password: '',
      reenter_password: '',
      name: '',
    })
    setForgotPasswordData({ account: '' })
    setLoginErrors({
      account: '',
      password: '',
      result: '',
    })
    setRegisterErrors({
      account: '',
      password: '',
      reenter_password: '',
      name: '',
      result: '',
    })
    setForgotPasswordErrors({
      account: '',
      result: '',
    })

    if (formName === 'Login') {
      setLoginModalState(true)
      setRegisterState(false)
      setForgotPasswordState(false)
    } else if (formName === 'Register') {
      setLoginModalState(false)
      setRegisterState(true)
      setForgotPasswordState(false)
    } else {
      setLoginModalState(false)
      setRegisterState(false)
      setForgotPasswordState(true)
    }
  }

  return (
    <>
      <LoginForm
        open={loginModalState}
        close={() => setLoginModalState(false)}
        value={loginData}
        onChange={handleLoginChange}
        onSubmit={loginSubmit}
        errorText={loginErrors}
        formChange={handleFormSwitch}
      />

      <RegisterForm
        open={registerState}
        close={() => setRegisterState(false)}
        value={registerData}
        onChange={handleRegisterChange}
        onSubmit={registerSubmit}
        errorText={registerErrors}
        formChange={handleFormSwitch}
      />

      <ForgotPasswordForm
        open={forgotPasswordState}
        close={() => setForgotPasswordState(false)}
        value={forgotPasswordData}
        onChange={handleForgotPasswordChange}
        onSubmit={forgotPasswordSubmit}
        errorText={forgotForgotPasswordErrors}
        formChange={handleFormSwitch}
      />
    </>
  )
}
