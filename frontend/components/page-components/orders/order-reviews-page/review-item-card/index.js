import React from 'react'
import styles from './review-item-card.module.css'
import OrderProductImgBox from '../../order-product-img-box'
import OrderRating from '@/components/UI/rating'
import Input01 from '@/components/UI/form-item/input01'

export default function ReviewItemCard({
  order_product_id = 0,
  product_name = '',
  product_img = '',
  placeholder='請輸入評價',
  review = '',
  rate = 0,
  onChange,
  onRatingChange,
  inputDisabled = false,
  ratingReadOnly = false,
}) {
  return (
    <div className={styles.orderItemBox}>
      <OrderProductImgBox imgSrc={product_img} />
      <div className={styles.orderItemBoxRight}>
        <p>{product_name}</p>
        <Input01
          name="review"
          placeholder={placeholder}
          value={review}
          inputStyles="line"
          onChange={onChange}
          disabled={inputDisabled}
        />
        <OrderRating readOnly={ratingReadOnly} rate={rate} onChange={onRatingChange} />
      </div>
    </div>
  )
}
