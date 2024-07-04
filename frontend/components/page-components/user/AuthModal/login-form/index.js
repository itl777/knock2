import Link from 'next/link'
import Image from 'next/image'
import { Dialog } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// styles
import styles from '../login-form.module.scss'
// components
import AuthFormInput from '../auth-form-input'

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

export default function LoginForm({
  open,
  close,
  value,
  onChange,
  onSubmit,
  errorText,
  formChange,
}) {
  // open={loginModalState}
  // close={() => setLoginModalState(false)}
  // value={loginData}
  // onChange={handleLoginChange}
  // onSubmit={loginSubmit}
  // errorText={loginError}
  // formChange={handleFormSwitch}
  return (
    <>
      <ThemeProvider theme={dialogTheme}>
        <Dialog
          open={open}
          onClose={close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <figure className={styles.ghost}>
            <Image src="/ghost/ghost_04.png" alt="" width={133} height={138} />
            <Image src="/ghost/ghost_13.png" alt="" width={115} height={115} />
          </figure>
          <form className={styles.forms} onSubmit={onSubmit}>
            <div className={styles.title}>
              <h3>會員登入</h3>
            </div>
            <div className={styles.box}>
              <AuthFormInput
                name="account"
                type="text"
                value={value.account}
                placeholder="請輸入Email"
                onChange={onChange}
              />
              <span className={styles.errorText}>{errorText.account}</span>
              <AuthFormInput
                name="password"
                type="password"
                value={value.password}
                placeholder="請輸入密碼"
                onChange={onChange}
              />
              <span className={styles.errorText}>{errorText.password}</span>
              <div className={styles.box2}>
                <span className={styles.errorText}>{errorText.result}</span>
                <Link
                  href=""
                  onClick={() => {
                    formChange('ForgotPassword')
                  }}
                >
                  <span>忘記密碼？</span>
                </Link>
              </div>
            </div>

            <div className={styles.box}>
              <input type="submit" value="登入" />
            </div>
            <div className={styles.links}>
              <Link
                href=""
                onClick={() => {
                  formChange('Register')
                }}
              >
                <span>尚未註冊會員？ 立即註冊</span>
              </Link>
            </div>
            <div className={styles.links}>
              <span>——— 或選擇其他方式登入 ———</span>
            </div>
            <div className={styles.links}>{/* 第三方登入 */}</div>
          </form>
        </Dialog>
      </ThemeProvider>
    </>
  )
}
