import React, { useState, useEffect } from 'react'
import styles from './checkout-page.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAuth } from '@/context/auth-context'
import { useLoginModal } from '@/context/login-context'
import useScreenSize from '@/hooks/useScreenSize'
import usePayment from '@/hooks/usePayment'
import BlackBtn from '@/components/UI/black-btn'
import CheckoutTotalTable from '../checkout-page2/CheckoutTotalTable'
import RedirectionGuide from '@/components/UI/redirect-guide'
import { CHECKOUT_POST } from '@/configs/api-path'

export default function CheckoutPage() {
  const router = useRouter()
  const { auth, authIsReady } = useAuth()
  const { loginFormSwitch } = useLoginModal()
  const userClientWidth = useScreenSize()
  const [screenWidth, setScreenWidth] = useState(userClientWidth)
  const { handleOrderPayment } = usePayment()

  // 从路由獲取預約數據
  const {
    name,
    mobile_phone,
    reservation_date,
    session_id,
    sessionTime,
    participants,
    discount,
    deposit,
    themeName,
    branchName,
    themeImage,
    remark,
  } = router.query

  // 使用 deposit 作为 subtotal
  const subtotal = parseFloat(deposit) || 0

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataToSubmit = {
      user_id: auth.id,
      name,
      mobile_phone,
      reservation_date,
      session_id,
      participants,
      deposit,
      subtotal,
      themeName,
      branchName,
      discount, // 傳遞優惠項目名稱
    }

    try {
      // Step 1: 提交訂單和商品資料到後端
      const response = await axios.post(CHECKOUT_POST, dataToSubmit)
      if (response.data.success) {
        const reservation_id = response.data.reservation_id // 取得後端返回的 order_id
        // Step 2: 送 orderId, subtotal 給後端
        handleOrderPayment(reservation_id, subtotal)
      }
    } catch (error) {
      console.error('提交表單時出錯', error)
      alert('訂單提交失敗，請稍後再試。')
    }
  }

  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.h2Style}>確認預約</h2>
      <form onSubmit={handleSubmit} className={styles.contentContainer}>
        <div className={styles.checkoutLeft}>
          <h5>預約資訊</h5>
          <div className={styles.itemList}>
            <p>
              主題: {themeName} - {branchName}
            </p>
            <p>姓名: {name}</p>
            <p>電話: {mobile_phone}</p>
            <p>日期: {reservation_date}</p>
            <p>時間: {sessionTime}</p>
            <p>人數: {participants} 人</p>
            {discount && <p>優惠項目: {discount}</p>}
            {remark && <p>備註: {remark}</p>}
          </div>
        </div>
        <div className={styles.checkoutRight}>
          <div
            className={styles.themeImageContainer}
            style={{
              background: ` url("/themes-main/${themeImage}") no-repeat center center / cover`,
            }}
          ></div>
          <CheckoutTotalTable
            subtotal={subtotal}
            checkoutTotal={subtotal}
            discountName={discount}
          />

          <BlackBtn
            btnText="前往付款"
            type="submit"
            paddingType="medium"
            className={styles.btnStyle}
          />
        </div>
      </form>
    </section>
  )
}
