// checkout page
import React, { useState, useEffect } from 'react'
import styles from './coupon-container.module.css'
import CouponCard from '../coupon-card'

export default function CouponContainer() {
  return (
    <section className={styles.couponSection}>
      <div>
        <h5>已領取的優惠券</h5>
        <div className="horizontalDividerS"></div>
      </div>
      <div className={styles.couponBox}>
        <CouponCard />
        <CouponCard />
      </div>
    </section>
  )
}
