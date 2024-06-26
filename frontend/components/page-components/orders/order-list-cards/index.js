import React, { useState, useEffect } from 'react'
import styles from './order-list-cards.module.css'
import FilterBtn from '@/components/UI/filter-btn'
import OrderStatusTag from '../order-status-tag'
import NoData from '@/components/UI/no-data'
import { FiShoppingBag, FiCreditCard, FiPackage } from 'react-icons/fi'

export default function OrderListCards({ orderStatusId }) {
  const [orderData, setOrderData] = useState([])
  const [orderDetailData, setOrderDetailData] = useState([])
  const memberId = 1 // 暫時設定會員 id

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3001/orders?member_id=${memberId}&order_status_id=${orderStatusId}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch order data')
        }

        const data = await response.json()

        console.log(data)
        setOrderData(data.orders) // 取得訂單資料
        setOrderDetailData(data.orderDetails) // 取得訂單所有商品資料（圖片）
      } catch (error) {
        console.log('Error fetching orders:', error)
      }
    }

    fetchOrders()
  }, [memberId, orderStatusId])

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString)
  //   return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
  //     '0' + date.getDate()
  //   ).slice(-2)}`
  // }

  return (
    <>
      {/* 如果沒有資料，顯示無訂單記錄圖示，有的話則進行 map */}
      {orderData.length === 0 ? (
        <div className={styles.orderBox}>
          <NoData
            text="無訂單記錄"
            backgroundColor="transparent"
            borderRadius="0rem"
          />
        </div>
      ) : (
        orderData.map((v, i) => (
          <div key={v.order_id} className={styles.orderBox}>
            <div className={styles.orderHeader}>
              <p>{v.order_date}</p>
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
                <OrderStatusTag status={v.order_status_name} />
              </div>

              <div className={styles.orderProductImg}>
                {orderDetailData
                  .filter((detail) => detail.order_id === v.order_id) // 取得訂單下所有的商品
                  .map((detail, i) => (
                    <div key={i} className="itemImgBox">
                      {/* 如果有商品圖顯示商品圖，如果沒有顯示無資料 */}
                      {detail.product_img ? (
                        <img src={`/products/${detail.product_img}`} alt="" />
                      ) : (
                        <NoData text="無商品圖" borderRadius="0rem" />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))
      )}
    </>
  )
}
