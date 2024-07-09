import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import styles from './order-reviews-page.module.css'
import BlackBtn from '@/components/UI/black-btn'
import ReviewItemCard from './review-item-card'
import NoData from '@/components/UI/no-data'
import { FaArrowLeftLong } from 'react-icons/fa6'
import HDivider from '@/components/UI/divider/horizontal-divider'
import {
  PRODUCT_IMG,
  ORDER_REVIEW_POST,
  ORDER_REVIEW_GET,
} from '@/configs/api-path'

export default function OrderReviewsSection({ orderId }) {
  const [reviews, setReviews] = useState([])
  const [formData, setFormData] = useState([])
  const [anyReviewed, setAnyReviewed] = useState(false)
  const fetchOrderReviews = async () => {
    try {
      const response = await axios.get(`${ORDER_REVIEW_GET}/${orderId}`)
      if (response.data.success) {
        setReviews(response.data.rows)

        // 初始化 formData
        const initialFormData = response.data.rows.map((v) => ({
          order_id: +orderId,
          order_product_id: v.order_product_id,
          review: v.review || '',
          rate: v.rate || 0,
        }))
        setFormData(initialFormData)

        // 檢查是否有任一 review_status 為 1
        const anyReviewed = response.data.rows.find(
          (v) => v.review_status === 1
        )
        setAnyReviewed(!!anyReviewed)

        console.log('fetch', response.data.rows)
      }
    } catch (error) {
      console.error('Error fetching order reviews:', error)
    }
  }

  useEffect(() => {
    if (orderId > 0) {
      fetchOrderReviews()
      console.log('fetch order reviews', orderId, anyReviewed)
    }
  }, [orderId])

  // 控制表單輸入欄位，更新 formData
  const handleInputChange = (e, order_product_id) => {
    const { name, value } = e.target
    setFormData((prevFormData) =>
      prevFormData.map((item) =>
        item.order_product_id === order_product_id
          ? { ...item, [name]: value }
          : item
      )
    )
    console.log(formData)
  }

  const handleRatingChange = (order_product_id, rate) => {
    setFormData((prevFormData) =>
      prevFormData.map((item) =>
        item.order_product_id === order_product_id ? { ...item, rate } : item
      )
    )
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(ORDER_REVIEW_POST, formData)

      const data = response.data
      console.log(data)

      if (data.success) {
        alert('儲存成功')
      }
    } catch (error) {
      console.error('提交表單時出錯', error)
    }
  }

  return (
    <form
      name="orderReviews"
      onSubmit={handleSubmit}
      className={styles.orderDetailBox}
    >
      {/* card header */}
      <div className={styles.orderDetailHeader}>
        <Link className={styles.titleBox} href="/user/orders/ongoing">
          <FaArrowLeftLong />
          <h5>訂單評價</h5>
        </Link>
      </div>

      <div className="horizontalDividerS" />

      {/* card body */}
      {anyReviewed === false &&
        !!reviews.length === true &&
        reviews.map((v) => (
          <ReviewItemCard
            key={v.order_product_id}
            order_product_id={v.order_product_id}
            product_name={v.product_name}
            product_img={`${PRODUCT_IMG}/${v.product_img}`}
            review={
              formData.find((f) => f.order_product_id === v.order_product_id)
                ?.review || ''
            }
            onChange={(e) => handleInputChange(e, v.order_product_id)}
            rate={
              formData.find((f) => f.order_product_id === v.order_product_id)
                ?.rate || 0
            }
            onRatingChange={(rate) =>
              handleRatingChange(v.order_product_id, rate)
            }
          />
        ))}

      {anyReviewed === true &&
        !!reviews.length === true &&
        reviews.map((v) => (
          <ReviewItemCard
            key={v.order_product_id}
            order_product_id={v.order_product_id}
            product_name={v.product_name}
            product_img={`${PRODUCT_IMG}/${v.product_img}`}
            placeholder=""
            review={v.review}
            rate={v.rate}
            inputDisabled={true}
            ratingReadOnly={true}
          />
        ))}

      {anyReviewed === false && (
        <div className={styles.btnStack}>
          <BlackBtn
            type="submit"
            btnText="送出評價"
            href={null}
            paddingType="medium"
          />
        </div>
      )}
    </form>
  )
}
