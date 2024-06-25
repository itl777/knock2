import React from 'react'
import styles from './user-profile-form.module.scss'

export default function UserProfileForm() {
  return (
    <>
      <div className={styles['user-profile-form']}>
        <div className={styles['account']}>
          <div className={styles['avatar']}></div>
          <div></div>
        </div>
      </div>
    </>
  )
}
