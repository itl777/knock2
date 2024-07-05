import React from 'react'
import styles from './review-item-card.module.css'
import OrderProductImgBox from '../../order-product-img-box'
import OrderRating from '@/components/UI/rating'

export default function ReviewItemCard({
  productId = 0,
  productName = '',
  productImg= '',
}) {
  return (
    <div className={styles.orderItemBox}>
    <OrderProductImgBox imgSrc={productImg} />
    <div className={styles.orderItemBoxRight}>
      <p>{productName}</p>
      <input />
      <OrderRating />
    </div>
  </div>
  )
}
