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
  const { login, register } = useAuth()
  const { openSnackbar } = useSnackbar()

  // Login
  // 父元件傳的 loginModalState setLoginModalState  // open close
  const [loginData, setLoginData] = useState({ account: '', password: '' })
  const [loginErrors, setLoginErrors] = useState({
    account: '',
    password: '',
    result: '',
  }) // error text
  const handleLoginChange = (e) => {
    // form data change
    const { name, value } = e.target
    const newLoginData = { ...loginData, [name]: value }
    setLoginData(newLoginData)
  }
  const loginSubmit = async (e) => {
    // form submit
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
    // form data
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
  }) // error text
  const handleRegisterChange = (e) => {
    // form data change
    const { name, value } = e.target
    const newRegisterData = { ...registerData, [name]: value }
    setRegisterData(newRegisterData)
  }
  const registerSubmit = async (e) => {
    // form submit
    e.preventDefault()

    // 資料驗證
    // password 要等於 reenter_password
    console.log(registerData)
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

    // return
    // 包裝
    const newRegisterData = { ...registerData, nick_name: registerData.name }
    console.log(newRegisterData)

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
      // 如果登入失敗
      setLoginErrors(result.error)
    }
  }

  // ForgotPassword
  const [forgotPasswordState, setForgotPasswordState] = useState(false) // open close
  const [forgotPasswordData, setForgotPasswordData] = useState({
    // form data
    account: '',
  })
  const [forgotForgotPasswordErrors, setForgotPasswordErrors] = useState({
    account: '',
    result: '',
  }) // error text
  const handleForgotPasswordChange = (e) => {
    // form data change
    const { name, value } = e.target
    const newPasswordData = { ...forgotPasswordState, [name]: value }
    setForgotPasswordData(newPasswordData)
  }
  const forgotPasswordSubmit = async (e) => {
    // form submit
    e.preventDefault()

    // if (result.success) {
    //   // 如果登入成功

    //   openSnackbar('註冊成功！請返回登入', 'success')
    // } else {
    //   // 如果登入失敗
    //   setLoginError(result.error)
    // }
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
