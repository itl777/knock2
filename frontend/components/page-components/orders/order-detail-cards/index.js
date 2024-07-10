import React from 'react'
import styles from './order-detail-cards.module.css'
import useFetchOrderData from '@/hooks/fetchOrderDetails'
import OrderItemDetail from '../order-item-detail'
import FilterBtn from '@/components/UI/filter-btn'
import OrderDetailRow from '../order-detail-row'
import UserHeader from '@/components/UI/user-header'
import { PRODUCT_IMG } from '@/configs/api-path'

export default function OrderDetailCards({ orderId }) {
  const orderIdNumber = orderId.order_id
  const { orderData, orderDetails } = useFetchOrderData(orderIdNumber)

  return (
    <div className={styles.orderDetailContainer}>
      <UserHeader type='icon' title="訂單明細" btnHref={null} />

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
          <div className={styles.orderInfoBox}>
            <OrderDetailRow label="訂單日期" content={orderData?.order_date} />
            <OrderDetailRow label="訂單編號" content={'20230404**'} />
            <OrderDetailRow
              label="總金額"
              content={`$ ${orderData?.total_price}`}
            />
            <OrderDetailRow
              label="付款時間"
              content={'2024.05.22 16:30:30**'}
            />
            <OrderDetailRow label="地址" content={orderData?.full_address} />

            <OrderDetailRow status={orderData?.order_status_name} />
          </div>

          <div className={styles.orderReviewHintBox}>
            <img src="/ghost/ghost_05.png" alt="" />
            <div className={styles.orderReviewDialog}>
              <p>
                喜歡您的商品嗎？
                <br />
                請留下您大大的讚賞！
              </p>
              <FilterBtn
                btnText="評價"
                href={`/user/orders/details/reviews/${orderIdNumber}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
