import React from 'react'
import styles from './login-test.module.scss'

export default function LoginTest() {
  return (
    <>
      <div className={styles.ring}>
        <i className={styles.border1}></i>
        <i className={styles.border2}></i>
        <i className={styles.border3}></i>
        <div className={styles.login}>
          <h2>Login</h2>
          <div className={styles.inputBx}>
            <input type="text" placeholder="請輸入帳號" />
          </div>
          <div className={styles.inputBx}>
            <input type="password" placeholder="請輸入密碼" />
          </div>
          <div className={styles.inputBx}>
            <input type="submit" defaultValue="登入" />
          </div>
          <div className={styles.links}>
            <a href="#">Forget Password</a>
            <a href="#">Signup</a>
          </div>
        </div>
      </div>
    </>
  )
}
