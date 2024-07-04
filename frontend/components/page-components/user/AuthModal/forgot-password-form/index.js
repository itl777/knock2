import Link from 'next/link'
import { Dialog } from '@mui/material'

// styles
import styles from '../login-form.module.scss'
// components
import AuthFormInput from '../auth-form-input'

export default function ForgotPasswordForm({
  open,
  close,
  value,
  onChange,
  onSubmit,
  errorText,
  formChange,
}) {
  // open={forgotPasswordState}
  // close={() => setForgotPasswordState(false)}
  // value={forgotPasswordData}
  // onChange={handleForgotPasswordChange}
  // onSubmit={forgotPasswordSubmit}
  // errorText={forgotForgotPasswordError}
  // formChange={handleFormSwitch}
  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form className={styles.forms} onSubmit={onSubmit}>
          <div className={styles.title}>
            <h3>忘記密碼</h3>
          </div>
          <div className={styles.box}>
            <AuthFormInput
              name="account"
              type="text"
              value={value.account}
              placeholder="請輸入註冊時填寫的 Email 帳號"
              onChange={onChange}
            />
          </div>
          <div className={styles.box}>
            <span className={styles.errorText}>{errorText.result}</span>
            <Link
              href=""
              onClick={() => {
                formChange('Login')
              }}
            >
              <span>返回登入</span>
            </Link>
          </div>
          <div className={styles.box}>
            <input type="submit" value="送出" />
          </div>
          <div className={styles.links}>
            <span>——— 或選擇其他方式登入 ———</span>
          </div>
          <div className={styles.links}>{/* 第三方登入 */}</div>
        </form>
      </Dialog>
    </>
  )
}
