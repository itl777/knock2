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
  reservation_status_id = 0,
  handleCancel,
  handlePayment,
}) {
  const currentDate = new Date().toJSON().slice(0, 10)
  
  if (reservation_status_id === 3) {
    payment_date = '已取消'
  } 
  const new_payment_date = payment_date ? payment_date : '待付款'

  const getPaymentDate = () => {
    let payment_date_content = payment_date
    if (!payment_date && reservation_status_id !== 3) {
      if (reservation_date < currentDate) {
        payment_date_content = '已逾期'
      } else {
        payment_date_content = '待付款'
      }
    }
    if (reservation_status_id === 3) {
      payment_date_content = '已取消'
    }
    return payment_date_content
  }

  // 是否顯示取消訂單
  const showCancelBtn = () => {
    return reservation_status_id !== 3 && reservation_date > currentDate
      ? false
      : true
  }

  // 是否顯示重新付款
  const showPaymentBtn = () => {
    return payment_date === '' &&
      reservation_status_id !== 3 &&
      reservation_date > currentDate
      ? false
      : true
  }

  return (
    <div className={styles.reservationContainer}>
      <CardHeader
        title={reservation_date}
        btn1Text={'取消訂單'}
        btn1Hidden={showCancelBtn()}
        btn1OnClick={handleCancel} // 從父層 reservation page 設定
        btn2Text={'重新付款'}
        btn2Hidden={showPaymentBtn()}
        btn2OnClick={handlePayment} // 從父層 reservation page 設定
        btn3Hidden={true}
      />

      <div className={styles.reservationContent}>
        <div className={styles.reservationLeft}>
          <div className={styles.themeImgBox}>
            <img src={theme_img} />
          </div>
        </div>

        <div className={styles.reservationRight}>
          <div className={styles.reservationInfoBox}>
            <OrderDetailRow label="行程日期" content={reservation_date} />
            <OrderDetailRow label="密室主題" content={theme_name} />
            <OrderDetailRow label="預約場次" content={session} />
            <OrderDetailRow label="預約人數" content={`${participants} 人`} />
            <OrderDetailRow label="訂金金額" content={deposit} />
            <OrderDetailRow label="成立日期" content={created_at} />
            <OrderDetailRow label="付款日期" content={getPaymentDate()} />
          </div>
        </div>
      </div>
    </div>
  )
}
