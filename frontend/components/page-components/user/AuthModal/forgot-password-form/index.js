import Link from 'next/link'
import { Dialog } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import OTPInput from '@/components/UI/form-item/otp-input'
import ThirdPartyLoginButton from '../third-party-login-button'
import { useLoginModal } from '@/context/login-context/index'

// styles
import styles from '../login-form.module.scss'
// components
import AuthFormInput from '../auth-form-input'

const dialogTheme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '1rem',
          backgroundColor: '#343434',
        },
      },
    },
  },
})

export default function ForgotPasswordForm() {
  const {
    forgotPasswordState,
    forgotPasswordData,
    forgotForgotPasswordErrors,
    handleForgotPasswordChange,
    forgotPasswordSubmit,
    otpData,
    setOtpData,
    loginFormSwitch,
  } = useLoginModal()
  return (
    <>
      <ThemeProvider theme={dialogTheme}>
        <Dialog
          open={forgotPasswordState}
          onClose={() => loginFormSwitch()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form className={styles.forms} onSubmit={forgotPasswordSubmit}>
            <div className={styles.title}>
              <h3>忘記密碼</h3>
            </div>
            <div className={styles.box}>
              <AuthFormInput
                name="account"
                type="text"
                value={forgotPasswordData.account}
                placeholder="請輸入註冊時填寫的 Email 帳號"
                onChange={handleForgotPasswordChange}
              />
              <span className={styles.errorText}>
                {forgotForgotPasswordErrors.account}
                {forgotForgotPasswordErrors.result}
              </span>
              <OTPInput value={otpData} onChange={setOtpData} />
            </div>
            <div className={styles.box}>
              <input type="submit" value="送出" />
            </div>
            <div className={styles.links}>
              <Link
                href=""
                onClick={() => {
                  loginFormSwitch('Login')
                }}
              >
                <span>想起密碼了？ 返回登入</span>
              </Link>
            </div>
            <div className={styles.links}>
              <span>——— 或選擇其他方式登入 ———</span>
            </div>
            <div className={styles.links}>
              <ThirdPartyLoginButton />
            </div>
          </form>
        </Dialog>
      </ThemeProvider>
    </>
  )
}
