import styles from './reservation-page.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// context
import { useLoginModal } from '@/context/login-context'
import { useAuth } from '@/context/auth-context'
// components
import ReservationListCards from '../reservation-list-cards'
import RedirectionGuide from '@/components/UI/redirect-guide'

export default function ReservationPage({ status }) {
  const { auth, authIsReady } = useAuth()
  const { loginFormSwitch } = useLoginModal()
  const router = useRouter()
  const [isLogin, setIsLogin] = useState()

  // 登入驗證
  useEffect(() => {
    if (router.isReady && authIsReady) {
      if (!auth.id) {
        setIsLogin(false)
        loginFormSwitch('Login')
      }
      if (auth.id) {
        setIsLogin(true)
      }
    }
  }, [auth.id, router.isReady, authIsReady])

  return (
    <>
      {!isLogin && <RedirectionGuide />}
      {isLogin && (
        <div className={styles.listContainer}>
          <ReservationListCards />
          <ReservationListCards />
        </div>
      )}
    </>
  )
}
