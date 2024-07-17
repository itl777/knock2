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
  payment_date,
  reservation_status_id=0,
  btnRightOnClick,
}) {
  const currentDate = new Date().toJSON().slice(0, 10)

  const btnRightText = () => {
    if (reservation_status_id === 1 && reservation_date > currentDate) return '重新付款' // 待付款狀態
    if (reservation_status_id === 2 && reservation_date > currentDate) return '取消訂單' // 已付款
    return ''
  }

  const isBtnRightHidden = () => {
    return ![1, 2].includes(reservation_status_id)
  }
  return (
    <div className={styles.reservationContainer}>
      <CardHeader
        title={reservation_date}
        btnRightText={btnRightText()}
        btnRightHidden={isBtnRightHidden()}
        btnRightOnClick={btnRightOnClick} // 從父層 reservation page 設定
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
            <OrderDetailRow label="付款日期" content={payment_date} />
          </div>
        </div>
      </div>
    </div>
  )
}
