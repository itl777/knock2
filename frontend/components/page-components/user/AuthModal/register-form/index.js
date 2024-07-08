import Link from 'next/link'
import Image from 'next/image'
import { Dialog } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ThirdPartyLoginButton from '../third-party-login-button'

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

export default function RegisterForm({
  open, // state
  close, // function
  value,
  onChange,
  onSubmit,
  errorText,
  formChange,
}) {
  // open={registerState}
  // close={() => setRegisterState(false)}
  // value={registerData}
  // onChange={handleRegisterChange}
  // onSubmit={registerSubmit}
  // errorText={registerError}
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
          <form className={styles.forms} onSubmit={onSubmit}>
            <div className={styles.title}>
              <h3>會員註冊</h3>
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
              />{' '}
              <span className={styles.errorText}>{errorText.password}</span>
              <AuthFormInput
                name="reenter_password"
                type="password"
                value={value.reenter_password}
                placeholder="請再次輸入密碼"
                onChange={onChange}
              />
              <span className={styles.errorText}>
                {errorText.reenter_password}
              </span>
              <AuthFormInput
                name="name"
                type="text"
                value={value.name}
                placeholder="請輸入姓名"
                onChange={onChange}
              />
              <span className={styles.errorText}>
                {errorText.name}
                {errorText.result}
              </span>
            </div>
            <div className={styles.box}>
              <input type="submit" value="註冊" />
            </div>
            <div className={styles.links}>
              <Link
                href=""
                onClick={() => {
                  formChange('Login')
                }}
              >
                <span>已有註冊會員？ 返回登入</span>
              </Link>
            </div>
            <div className={styles.links}>
              <span>——— 或選擇其他方式註冊 ———</span>
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
