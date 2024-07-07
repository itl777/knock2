// checkout page
import React, { useState, useEffect } from 'react'
import styles from './coupon-card.module.css'
import Link from 'next/link'

export default function CouponCard({
  status='',
  coupon_name='80 元折價券',
  restrict='最低消費金額：200 元',
  expire_date='2024.10.31',
}) {
  return (
    <div className={styles.couponCard}>
      <div className={styles.couponCardLeft}>
        <img src="/ghost/ghost_11.png" alt="" />
        <div className={styles.couponStatusTag}>{status}</div>
      </div>

      <div className={styles.couponCardRight}>
        <div className={styles.couponInfo}>
          <p>{coupon_name}</p>
          <p>{restrict}</p>
          <p>有效期限：{expire_date}</p>
          <Link href='/' className={styles.moreInfo}>使用說明</Link>
        </div>
      </div>
    </div>
  )
}
