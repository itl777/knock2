import React, { useEffect, useState } from 'react'
import styles from './order-detail-cards.module.css'
import { useRouter } from 'next/router'
import useFetchOrderData from '@/hooks/fetchOrderDetails'
import OrderItemDetail from '../order-item-detail'
import OrderReviewDialog from '../order-review-dialog'
import UserHeader from '@/components/UI/user-header'
import OrderDetailInfo from '../order-detail-info'
import { PRODUCT_IMG } from '@/configs/api-path'

export default function OrderDetailCards({ order_id }) {
  const router = useRouter()
  const { order, detail, anyReviewed, fetchOrderData } = useFetchOrderData()
  const [showReviewDialog, setShowReviewDialog] = useState(false)

  const handleInvoice = () => {
    router.push(`/user/orders/details/invoice/${order_id}`)
  }

  const hideInvoice = () => {
    if (order) {
      return order.invoice_rtn_code === 1 ? false : true
    }
  }

  useEffect(() => {
    fetchOrderData(order_id)
    if (order) {
      if (order.order_status_id === 3) {
        setShowReviewDialog(true) // 已完成才可以評價
      } else {
        setShowReviewDialog(false)
      }
    }
  }, [order_id, anyReviewed])

  return (
    <div className={styles.orderDetailContainer}>
      <UserHeader
        type="icon"
        title="訂單明細"
        btnText="發票"
        btnHidden={hideInvoice()}
        onClickBtn={handleInvoice}
      />

      {/* card body */}
      <div className={styles.orderDetailContent}>
        {/* card body left */}
        <div className={styles.orderDetailLeft}>
          {/* order product mapping */}
          {detail.map((v, i) => (
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
            order_date={order?.order_date}
            merchant_trade_no={order?.merchant_trade_no}
            subtotal_price={order?.subtotal_price}
            deliver_fee={order?.deliver_fee}
            total_price={order?.total_price}
            payment_date={order?.payment_date}
            full_address={order?.full_address}
            order_status_name={order?.order_status_name}
          />

          {showReviewDialog && (
            <OrderReviewDialog
              order_id={order_id}
              content={anyReviewed ? '已收到您的評價！' : undefined}
              btnText={anyReviewed ? '查看評價' : undefined}
            />
          )}
        </div>
      </div>
    </div>
  )
}
