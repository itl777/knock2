// checkout page
import React, { useState, useEffect } from 'react'
import styles from './coupon-card.module.css'
import MoreInfoBtn from './more-info-text-btn'
import { formatPrice } from '@/hooks/numberFormat'

export default function CouponCard({
  // status='',
  coupon_name = '80 元折價券',
  restrict = '最低消費金額：200 元',
  expire_date = '2024.10.31',
  onClick,
  btnHidden = false,
}) {
  return (
    <div className={styles.couponCard}>
      <div className={styles.couponCardLeft}>
        <img src="/ghost/ghost_11.png" alt="" />
      </div>

      <div className={styles.couponCardRight}>
        <div className={styles.couponInfo}>
          <p>{coupon_name}</p>
          <div className={styles.textBox}>
            <p>最低消費金額：{formatPrice(restrict)}</p>
            <p>有效期限：{expire_date}</p>
          </div>

          {!btnHidden && (
            <MoreInfoBtn onClick={onClick} href={null} btnText="使用說明" />
          )}
        </div>
      </div>
    </div>
  )
}
