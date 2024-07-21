import React, { useState, useEffect } from 'react'
import styles from './checkout-page.module.css'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-context'
import { useLoginModal } from '@/context/login-context'
import useScreenSize from '@/hooks/useScreenSize'
import BlackBtn from '@/components/UI/black-btn'
import CheckoutTotalTable from '../checkout-total-table'
import RedirectionGuide from '@/components/UI/redirect-guide'

export default function CheckoutPage() {
  const router = useRouter()
  const { auth, authIsReady } = useAuth()
  const { loginFormSwitch } = useLoginModal()
  const userClientWidth = useScreenSize()
  const [screenWidth, setScreenWidth] = useState(userClientWidth)

  // 從路由獲取預約數據
  const { name, date, timeSlot, people, discount, themeId, deposit } =
    router.query

  // 使用 deposit 作為 subtotal
  const subtotal = parseFloat(deposit) || 0

  // 計算總價（這裡假設總價就是定金，您可以根據需要調整）
  const total = subtotal

  useEffect(() => {
    setScreenWidth(userClientWidth)
  }, [userClientWidth])

  useEffect(() => {
    if (router.isReady && authIsReady) {
      if (!auth.id) {
        loginFormSwitch('Login')
      }
    }
  }, [auth.id, router.isReady, authIsReady])

  if (!auth.id && authIsReady) {
    return <RedirectionGuide />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 實現預約提交邏輯
    console.log('提交預約', { name, date, timeSlot, people, deposit, total })
    // 這裡您可以調用 API 來保存預約
  }

  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.h2Style}>確認預約</h2>
      <form onSubmit={handleSubmit} className={styles.contentContainer}>
        <div className={styles.checkoutLeft}>
          <h5>預約資訊</h5>
          <div className={styles.itemList}>
            <p>名稱: {name}</p>
            <p>日期: {date}</p>
            <p>時間: {timeSlot}</p>
            <p>人數: {people}</p>
            <p>訂金: ${deposit}</p>
          </div>
          <CheckoutTotalTable
            subtotal={subtotal}
            checkoutTotal={total}
            totalDiscount={discount}
          />
        </div>
        <div className={styles.checkoutRight}>
          <BlackBtn
            btnText="確認預約"
            type="submit"
            paddingType="medium"
            className={styles.btnStyle}
          />
        </div>
      </form>
    </section>
  )
}
