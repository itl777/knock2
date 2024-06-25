// Order Status Component
import styles from './order-status-tag.module.css'

export default function OrderStatusTag({ status }) {
  let statusClass = ''
  let statusText = ''

  switch (status) {
    case '處理中':
      statusClass = styles.orderStatusOrange
      statusText = '處理中'
      break
    case '已出貨':
      statusClass = styles.orderStatusBlue
      statusText = '已出貨'
      break
    case '已完成':
      statusClass = styles.orderStatusGreen
      statusText = '已完成'
      break
    default:
      statusClass = styles.orderStatusOrange
      statusText = ''
      break
  }

  return (
    <div className={`${styles.orderStatusTag} ${statusClass}`}>
      {statusText}
    </div>
  )
}
