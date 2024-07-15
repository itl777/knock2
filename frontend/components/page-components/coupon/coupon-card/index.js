// checkout page
import React, { useState, useEffect } from 'react'
import styles from './coupon-card.module.css'
import MoreInfoBtn from './more-info-text-btn'
import { formatPrice } from '@/hooks/numberFormat'

export default function CouponCard({
  coupon_name,
  status='ongoing',
  restrict,
  expire_date,
  onClick,
  btnHidden = false,
}) {
  const getStatusClass = (baseClass) => {
    switch (status) {
      case 'ongoing':
        return `${baseClass}`;
      case 'used':
        return `${baseClass} ${styles.history}`;
      case 'expired':
        return `${baseClass} ${styles.history}`;
      default:
        return baseClass;
    }
  }
  
  return (
    <div className={getStatusClass(styles.couponCard)}>
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
