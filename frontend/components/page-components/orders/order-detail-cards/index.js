import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './order-detail-cards.module.css'
import useFetchOrderData from '@/hooks/fetchOrderDetails'
import FilterBtn from '@/components/UI/filter-btn'
import OrderStatusTag from '../order-status-tag'
import OrderProductImgBox from '../order-product-img-box'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { PRODUCT_IMG } from '@/configs/api-path'

export default function OrderDetailCards({ orderId }) {

  const orderIdNumber = orderId.order_id
  const { orderData, orderDetails } = useFetchOrderData(orderIdNumber)

  return (
    <div className={styles.orderDetailBox}>
      {/* card header */}
      <div className={styles.orderDetailHeader}>
        <Link className={styles.titleBox} href="/user/orders/ongoing">
          <FaArrowLeftLong />
          <h5>訂單明細</h5>
        </Link>
        <FilterBtn btnText="發票" href="https://mui.com/" />
      </div>

      <div className="horizontalDividerS" />

      {/* card body */}
      <div className={styles.orderDetailContent}>
        {/* card body left */}
        <div className={styles.orderDetailLeft}>
          {/* order product mapping */}
          {orderDetails.map((v, i) => (
            <div key={v.product_id} className="itemBoxS">
              <OrderProductImgBox
                imgSrc={v.product_img ? `${PRODUCT_IMG}/${v.product_img}` : ''}
              />
              <div className="itemInfoS">
                <p className="product-name">{v.product_name}</p>
                <div className="itemQtyPriceBoxS">
                  <p>x {v.order_quantity}</p>
                  <div className="itemPriceS">
                    <p>$ {v.order_unit_price}</p>
                    <small>$ {v.order_unit_price}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* card body right */}
        <div className={styles.orderDetailRight}>
          <div className={styles.orderInfoBox}>
            <div className={styles.orderInfoRow}>
              <p>訂單日期</p>
              <p>{orderData?.order_date}</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>訂單編號</p>
              <p>202405220001_fake</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>總金額</p>
              <p>$ {orderData?.total_price}</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>付款方式</p>
              <p>{orderData.length > 0 && orderData?.payment_method}</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>付款時間</p>
              <p>2024.05.22 16:30:30_fake</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>地址</p>
              <p>{orderData?.full_address}</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>到貨時間</p>
              <p>2024.05.25 16:30:30_fake</p>
            </div>
            <OrderStatusTag status={orderData?.order_status_name} />
          </div>

          <div className={styles.orderReviewHintBox}>
            <img src="/ghost/ghost_05.png" alt="" />
            <div className={styles.orderReviewDialog}>
              <p>
                喜歡您的商品嗎？
                <br />
                請留下您大大的讚賞！
              </p>
              <FilterBtn btnText="評價" href={`/user/orders/details/reviews/${orderIdNumber}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
