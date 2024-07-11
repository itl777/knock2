// 我的訂單頁面
import React, { useState, useEffect } from 'react'
import styles from './order-list-cards.module.css'
// hooks
import { useAuth } from '@/context/auth-context'
import { formatPrice } from '@/hooks/numberFormat'
// components
import OrderStatusTag from '../order-status-tag'
import NoData from '@/components/UI/no-data'
import OrderProductImgBox from '../order-product-img-box'
import CardHeader from './card-header'
import IconTextRow from './icon-text-row'
// icons
import { HiOutlineCreditCard, HiOutlineCube } from 'react-icons/hi'
// api path
import { ORDER_LIST_GET, PRODUCT_IMG } from '@/configs/api-path'

export default function OrderListCards({ orderStatusId }) {
  const [orderData, setOrderData] = useState([])
  const [orderDetailData, setOrderDetailData] = useState([])
  const { auth } = useAuth()

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
            <CardHeader
              title={v.order_date}
              btnText="詳情"
              btnHref={`/user/orders/details/${v.order_id}`}
            />
            <div className={styles.orderBody}>
              <div>
                <div className={styles.orderInfoRowBox}>
                  <IconTextRow content={v.order_id} />
                  <IconTextRow
                    content={`${formatPrice(v.total_price)} / ${v.payment_method}`}
                    icon={HiOutlineCreditCard}
                  />
                  <IconTextRow content={v.full_address} icon={HiOutlineCube} />
                </div>

                <OrderStatusTag status={v.order_status_name} />
              </div>

              <div className={styles.imgListBox}>
                {orderDetailData
                  .filter((detail) => detail.order_id === v.order_id)
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
