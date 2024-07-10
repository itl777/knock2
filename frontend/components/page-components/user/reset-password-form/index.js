import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { RESET_PASSWORD_POST } from '@/configs/api-path'
import { useSnackbar } from '@/context/snackbar-context'
import styles from './reset-password-form.module.scss'
import UserProfileFormTitle from '../user-profile-form/user-profile-title'
import UserProfileInput from '../user-profile-form/user-profile-item/UserProfileInput'

export default function ResetPasswordForm() {
  const { auth, getAuthHeader } = useAuth()
  const { openSnackbar } = useSnackbar()

  const [resetPasswordData, setResetPasswordData] = useState({
    old_password: '',
    new_password: '',
    reenter_new_password: '',
  })
  const [resetPasswordError, setResetPasswordError] = useState({
    old_password: '',
    new_password: '',
    reenter_new_password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setResetPasswordData({ ...resetPasswordData, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setResetPasswordError({
      old_password: '',
      new_password: '',
      reenter_new_password: '',
    })
    
  }
  return (
    <>
      <form className={styles['reset-password-form']} onSubmit={onSubmit}>
        <div className={styles['box2']}>
          <div>
            <UserProfileFormTitle text={'修改密碼'} />
            {auth.id ? (
              <UserProfileInput
                label="舊密碼"
                name="old_password"
                type="password"
                value={resetPasswordData.old_password}
                placeholder="請輸入姓名"
                disabled={false}
                errorText={resetPasswordError.old_password}
                onChange={handleChange}
              />
            ) : (
              ''
            )}
            <UserProfileInput
              label="新密碼"
              name="new_password"
              type="password"
              value={resetPasswordData.new_password}
              placeholder="請輸入姓名"
              disabled={false}
              errorText={resetPasswordError.new_password}
              onChange={handleChange}
            />
            <UserProfileInput
              label="確認密碼"
              name="reenter_new_password"
              type="password"
              value={resetPasswordData.reenter_new_password}
              placeholder="請輸入暱稱"
              errorText={resetPasswordError.reenter_new_password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles['box2']}>
          <button type="submit">送出</button>
        </div>
      </form>
    </>
  )
}
