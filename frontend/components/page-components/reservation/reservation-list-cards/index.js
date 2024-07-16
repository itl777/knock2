import React from 'react'
import styles from './reservation-list-cards.module.css'
// components
import OrderDetailRow from '../../orders/order-detail-row'
import CardHeader from '../../orders/order-list-layout/card-header'

export default function ReservationListCards({
  reservation_date = 'reservation_date',
  theme_name = 'theme_name',
  theme_img = 'theme_img',
  session = 'start_time ~ end_time',
  participants = 'participants',
  deposit,
  created_at,
}) {
  return (
    <div className={styles.reservationContainer}>
      <CardHeader
        title={reservation_date}
        btnRightHidden={true}
        btnLeftHidden={true}
      />

      <div className={styles.reservationContent}>
        {/* card body left */}
        <div className={styles.reservationLeft}>
          <div className={styles.themeImgBox}>
            <img src={theme_img} />
          </div>
        </div>

        {/* card body right */}
        <div className={styles.reservationRight}>
          <div className={styles.reservationInfoBox}>
            <OrderDetailRow label="行程日期" content={reservation_date} />
            <OrderDetailRow label="密室主題" content={theme_name} />
            <OrderDetailRow label="預約場次" content={session} />
            <OrderDetailRow label="預約人數" content={participants} />
            <OrderDetailRow label="訂金金額" content={deposit} />
            <OrderDetailRow label="成立日期" content={created_at} />
            <OrderDetailRow label="付款日期" content={created_at} />
          </div>
        </div>
      </div>
    </div>
  )
}
