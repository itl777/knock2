import Link from 'next/link'
import { Dialog } from '@mui/material'

// styles
import styles from '../login-form.module.scss'
// components
import AuthFormInput from '../auth-form-input'

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
            <span className={styles.errorText}>{errorText.name}</span>
            <div className={styles.box2}>
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
          </div>

          <div className={styles.box}>
            <input type="submit" value="註冊" />
          </div>
          <div className={styles.links}>
            <span>——— 或選擇其他方式註冊 ———</span>
          </div>
          <div className={styles.links}>{/* 第三方登入 */}</div>
        </form>
      </Dialog>
    </>
  )
}
