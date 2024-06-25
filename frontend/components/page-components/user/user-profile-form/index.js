import React from 'react'
import styles from './user-profile-form.module.scss'
import UserProfileFormTitle from './title'

export default function UserProfileForm() {
  return (
    <>
      <div className={styles['user-profile-form']}>
        <div className={styles['account']}>
          <div className={styles['avatar']}></div>
          <div>
            <UserProfileFormTitle />
          </div>
        </div>
      </div>
    </>
  )
}
