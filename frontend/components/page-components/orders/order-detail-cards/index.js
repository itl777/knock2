import React, { useEffect, useState } from 'react'
import styles from './order-detail-cards.module.css'
import useFetchOrderData from '@/hooks/fetchOrderDetails'
import OrderItemDetail from '../order-item-detail'
import OrderReviewDialog from '../order-review-dialog'
import UserHeader from '@/components/UI/user-header'
import OrderDetailInfo from '../order-detail-info'
import { PRODUCT_IMG } from '@/configs/api-path'

export default function OrderDetailCards({ orderId }) {
  const orderIdNumber = orderId.order_id
  const { orderData, orderDetails, anyReviewed } =
    useFetchOrderData(orderIdNumber)
  const [showReviewDialog, setShowReviewDialog] = useState(false)

  useEffect(() => {
    if (!orderData.order_status_id) {
      setShowReviewDialog(false)
      return
    }
    if (orderData.order_status_id === 2 || orderData.order_status_id === 3) {
      setShowReviewDialog(true)
    } else {
      setShowReviewDialog(false)
    }
  }, [orderData, orderDetails, orderIdNumber, anyReviewed])

  return (
    <div className={styles.orderDetailContainer}>
      <UserHeader type="icon" title="訂單明細" btnHref={null} />

      {/* card body */}
      <div className={styles.orderDetailContent}>
        {/* card body left */}
        <div className={styles.orderDetailLeft}>
          {/* order product mapping */}
          {orderDetails.map((v, i) => (
            <OrderItemDetail
              key={v.product_id}
              productName={v.product_name}
              originalPrice={v.order_unit_price}
              discountedPrice={v.order_unit_price}
              productImg={
                v.product_img ? `${PRODUCT_IMG}/${v.product_img}` : ''
              }
              orderQty={v.order_quantity}
            />
          ))}
        </div>

        {/* card body right */}
        <div className={styles.orderDetailRight}>
          <OrderDetailInfo
            order_date={orderData?.order_status_id}
            merchant_trade_no={orderData?.merchant_trade_no}
            total_price={orderData?.total_price}
            payment_date={orderData?.payment_date}
            full_address={orderData?.full_address}
            order_status_name={orderData?.order_status_name}
          />

          {showReviewDialog && (
            <OrderReviewDialog
              order_id={orderIdNumber}
              content={anyReviewed ? '已收到您的評價！' : undefined}
              btnText={anyReviewed ? '查看評價' : undefined}
            />
          )}
        </div>
      </div>
    </div>
  )
}
