import React from 'react'
import styles from './reservation-list-cards.module.css'
// hooks
import { formatPrice } from '@/hooks/numberFormat'
// components
import OrderDetailRow from '../../orders/order-detail-row'
import CardHeader from '../../orders/order-list-cards/card-header'

export default function ReservationListCards({ status }) {

  return (
    <div className={styles.reservationContainer}>
      <CardHeader title="2024-00-00 r.reservation_date" btnHref={null} btnHidden={true} />

      <div className={styles.reservationContent}>
        {/* card body left */}
        <div className={styles.reservationLeft}>
          <div className={styles.themeImgBox}>
            <img src="/products/p1-1.jpg" />
          </div>
        </div>

        {/* card body right */}
        <div className={styles.reservationRight}>
          <div className={styles.reservationInfoBox}>
            <OrderDetailRow label="行程日期" content={`${status}r.reservation_date`} />
            <OrderDetailRow
              label="密室主題"
              content="t.theme_name - bt.branch_name"
            />
            <OrderDetailRow
              label="預約場次"
              content="s.start_time ~ s.end_time"
            />
            <OrderDetailRow label="預約人數" content="r.participants" />
            <OrderDetailRow label="訂金金額" content="t.deposit" />
            <OrderDetailRow label="成立日期" content="r.created_at" />
          </div>
        </div>
      </div>
    </div>
  )
}
