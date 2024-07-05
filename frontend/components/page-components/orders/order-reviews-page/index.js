import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './order-reviews-page.module.css'
import useFetchOrderData from '@/hooks/fetchOrderDetails'
import BlackBtn from '@/components/UI/black-btn'
import ReviewItemCard from './review-item-card'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { PRODUCT_IMG } from '@/configs/api-path'

export default function OrderReviewsPage({ orderId }) {
  const orderIdNumber = orderId.order_id
  const { orderData, orderDetails } = useFetchOrderData(orderIdNumber)

  return (
    <div className={styles.orderDetailBox}>
      {/* card header */}
      <div className={styles.orderDetailHeader}>
        <Link className={styles.titleBox} href="/user/orders/ongoing">
          <FaArrowLeftLong />
          <h5>訂單評價</h5>
        </Link>
      </div>

      <div className="horizontalDividerS" />

      {/* card body */}
      {orderDetails.map((v, i) => (
        <ReviewItemCard
          key={v.product_id}
          productId={v.product_id}
          productName={v.product_name}
          productImg={`${PRODUCT_IMG}/${v.product_img}`}
        />
      ))}
      <div className={styles.btnStack}>
        <BlackBtn btnText="送出評價" />
      </div>
    </div>
  )
}
