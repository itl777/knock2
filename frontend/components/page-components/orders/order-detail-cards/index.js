import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './order-detail-cards.module.css'
import FilterBtn from '@/components/UI/filter-btn'
import OrderStatusTag from '../order-status-tag'
import OrderProductImgBox from '../order-product-img-box'
import { FaArrowLeftLong } from 'react-icons/fa6'

export default function OrderDetailCards({ orderId }) {
  const [orderData, setOrderData] = useState([])
  const [orderDetailData, setOrderDetailData] = useState([])
  const orderIdNumber = orderId.order_id
  console.log(orderIdNumber)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3001/user/orders/details/${orderIdNumber}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch order data')
        }

        const data = await response.json()

        console.log('order detail data:', data)
        setOrderData(data.orders) // 取得訂單資料
        setOrderDetailData(data.orderDetails) // 取得訂單詳情
      } catch (error) {
        console.log('Error fetching orders: ', error)
      }
    }
    fetchOrders()
  }, [orderIdNumber])

  const o = orderData[0]

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
          {orderDetailData.map((v, i) => (
            <div key={v.product_id} className="itemBoxS">
              <OrderProductImgBox
                imgSrc={v.product_img ? `/products/${v.product_img}` : ''}
              />
              <div className="itemInfoS">
                <p className="product-name">{v.product_name}</p>
                <div className="itemQtyPriceBoxS">
                  <p>x {v.order_quantity}</p>
                  <div className="itemPriceS">
                    <p>$ 700</p>
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
              <p>{o?.order_date}</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>訂單編號</p>
              <p>202405220001_fake</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>總金額</p>
              <p>$ {o?.total_price}</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>付款方式</p>
              <p>{orderData.length > 0 && o?.payment_method}</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>付款時間</p>
              <p>2024.05.22 16:30:30_fake</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>地址</p>
              <p>{o?.full_address}</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>到貨時間</p>
              <p>2024.05.25 16:30:30_fake</p>
            </div>
            <OrderStatusTag status={o?.order_status_name} />
          </div>

          <div className={styles.orderReviewHintBox}>
            <img src="/ghost/ghost_05.png" alt="" />
            <div className={styles.orderReviewDialog}>
              <p>
                喜歡您的商品嗎？
                <br />
                請留下您大大的讚賞！
              </p>
              <FilterBtn btnText="評價" href="https://mui.com/" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
