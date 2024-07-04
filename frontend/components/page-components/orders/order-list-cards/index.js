// 我的訂單頁面
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-context'
import styles from './order-list-cards.module.css'
import FilterBtn from '@/components/UI/filter-btn'
import OrderStatusTag from '../order-status-tag'
import NoData from '@/components/UI/no-data'
import OrderProductImgBox from '../order-product-img-box'
import { ORDER_LIST_GET, PRODUCT_IMG } from '@/configs/api-path'
import { FiShoppingBag, FiCreditCard, FiPackage } from 'react-icons/fi'

export default function OrderListCards({ orderStatusId }) {
  const [orderData, setOrderData] = useState([])
  const [orderDetailData, setOrderDetailData] = useState([])
  const { auth } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${ORDER_LIST_GET}?member_id=${auth.id}&order_status_id=${orderStatusId}`
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
  }, [auth.id, orderStatusId])


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
              <FilterBtn
                btnText="詳情"
                href={`/user/orders/details/${v.order_id}`}
              />
            </div>
            <div className="horizontalDividerS" />
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
                    <OrderProductImgBox
                      key={i}
                      imgSrc={
                        detail.product_img
                          ? `${PRODUCT_IMG}/${detail.product_img}`
                          : ''
                      }
                    />
                  ))}
              </div>
            </div>
          </div>
        ))
      )}
    </>
  )
}
