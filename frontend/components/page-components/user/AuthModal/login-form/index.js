import Link from 'next/link'
import Image from 'next/image'
import { Dialog } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ThirdPartyLoginButton from '../third-party-login-button'
import { useLoginModal } from '@/context/login-context/index'

// styles
import styles from '../login-form.module.scss'
// components
import AuthFormInput from '../auth-form-input'
import ClearButton from '@/components/UI/ClearButton'

const dialogTheme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          overflow: 'visible',
          borderRadius: '1rem',
          backgroundColor: '#343434',
        },
      },
    },
  },
})

export default function LoginForm() {
  const {
    loginModalState,
    loginData,
    loginErrors,
    handleLoginChange,
    loginSubmit,
    loginFormSwitch,
  } = useLoginModal()

  return (
    <>
      <ThemeProvider theme={dialogTheme}>
        <Dialog
          open={loginModalState}
          onClose={() => loginFormSwitch()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <figure className={styles.ghost}>
            <Image src="/ghost/ghost_04.png" alt="" width={133} height={138} />
            <Image src="/ghost/ghost_13.png" alt="" width={115} height={115} />
          </figure>
          <form className={styles.forms} onSubmit={loginSubmit}>
            <div className={styles.title}>
              <h3>會員登入</h3>
            </div>
            <div className={styles.box}>
              <AuthFormInput
                name="account"
                type="text"
                value={loginData.account}
                placeholder="請輸入Email"
                onChange={handleLoginChange}
              />
              <span className={styles.errorText}>{loginErrors.account}</span>
              <AuthFormInput
                name="password"
                type="password"
                value={loginData.password}
                placeholder="請輸入密碼"
                onChange={handleLoginChange}
              />
              <span className={styles.errorText}>{loginErrors.password}</span>
              <div className={styles.box2}>
                <span className={styles.errorText}>{loginErrors.result}</span>
                <ClearButton
                  onClick={() => {
                    loginFormSwitch('ForgotPassword')
                  }}
                  btnText={<span>忘記密碼？</span>}
                />
              </div>
            </div>

            <div className={styles.box}>
              <input type="submit" value="登入" />
            </div>
            <div className={styles.links}>
              <ClearButton
                onClick={() => {
                  loginFormSwitch('Register')
                }}
                btnText={<span>尚未註冊會員？ 立即註冊</span>}
              />
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
