// order list card components
import React, { useState, useEffect } from 'react'
import styles from './order-list-cards.module.css'
import FilterBtn from '@/components/UI/filter-btn'
import OrderStatusTag from '../order-status-tag'
import { FiShoppingBag, FiCreditCard, FiPackage } from 'react-icons/fi'


export default function OrderListCards({ orderStatusId }) {
  const [data, setData] = useState([])
  const memberId = 1;

  useEffect(() => {
    fetch(`http://127.0.0.1:3001/orders?member_id=${memberId}&order_status_id=${orderStatusId}`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setData(data.data) // 設置從後端獲取的訂單資料到狀態中
      })
      .catch((error) => {
        console.error('Error fetching orders:', error)
      })
  }, [memberId, orderStatusId])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
      '0' + date.getDate()
    ).slice(-2)}`
  }

  return (
    <>
      {data.map((v, i) => (
        <div key={v.order_id} className={styles.orderBox}>
          <div className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <p>{formatDate(v.order_date)}</p>
              <FilterBtn btnText="詳情" href="/user/orders/details" />
            </div>
            <div className="horizontalDivider" />
            <div className={styles.orderContent}>
              <div className={styles.orderInfo}>
                <div className={styles.orderInfoRow}>
                  <FiShoppingBag />
                  <p>{v.order_id}</p>
                </div>
                <div className={styles.orderInfoRow}>
                  <FiCreditCard />
                  <p>{`$ ${v.total_price} / ${v.payment_method}`}</p>
                </div>
                <div className={styles.orderInfoRow}>
                  <FiPackage />
                  <p>{v.full_address}</p>
                </div>
                <OrderStatusTag status={v.order_status_name}/>
              </div>

              <div className={styles.orderProductImg}>
                {v.product_imgs && v.product_imgs.split(',').map((imgPath, index) => (
                  <div key={index} className="itemImgBox">
                    <img src={`/products/${imgPath}`} alt="" />
                  </div>
                ))}
              </div>

              {/* <div className={styles.orderProductImg}>
                <div className="itemImgBox">
                  <p>{v.product_img}</p>
                  <img src="/products/p1.png" alt="" />
                </div>
                <div className="itemImgBox">
                  <p>{v.product_img}</p>
                  <img src="/products/p1.png" alt="" />
                </div>
                <div className="itemImgBox">
                  <p>{v.product_img}</p>
                  <img src="/products/p1.png" alt="" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

{
  /* <div className={styles.orderInfo}>
<div className={styles.orderInfoRow}>
  <FiShoppingBag />
  <p>202405220001</p>
</div>
<div className={styles.orderInfoRow}>
  <FiCreditCard />
  <p>$ 32,000 / 信用卡</p>
</div>
<div className={styles.orderInfoRow}>
  <FiPackage />
  <p>台北市大安區天堂路38號</p>
</div>
<div
  className={`${styles.orderStatusTag} ${styles.orderStatusOrange}`}
>
  待出貨
</div>
</div>
<div className={styles.orderProductImg}>
<div className="itemImgBox">
  <img src="/products/p1.png" alt="" />
</div>
<div className="itemImgBox">
  <img src="/products/p1.png" alt="" />
</div>
<div className="itemImgBox">
  <img src="/products/p1.png" alt="" />
</div>
</div> */
}
