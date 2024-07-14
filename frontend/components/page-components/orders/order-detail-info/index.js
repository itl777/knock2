import styles from './order-detail-info.module.css'
import { formatPrice } from '@/hooks/numberFormat'
import OrderDetailRow from '../order-detail-row'

export default function OrderDetailInfo({
  order_date,
  order_date_hidden = false,
  merchant_trade_no,
  merchant_trade_no_hidden = false,
  total_price,
  total_price_hidden = false,
  payment_date,
  payment_date_hidden = false,
  full_address,
  full_address_hidden = false,
  order_status_name,
  order_status_name_hidden = false,
  order_status_id,
}) {
  return (
    <div className={styles.orderInfoBox}>
      {!order_date_hidden && (
        <OrderDetailRow label="訂單日期" content={order_date} />
      )}
      {!merchant_trade_no_hidden && (
        <OrderDetailRow label="訂單編號" content={merchant_trade_no} />
      )}
      {!total_price_hidden && (
        <OrderDetailRow label="總金額" content={formatPrice(total_price)} />
      )}
      {!payment_date_hidden && (+order_status_id === 2 || +order_status_id === 3 ) && (
        <OrderDetailRow label="付款時間" content={payment_date} />
      )}
      {!full_address_hidden && (
        <OrderDetailRow label="地址" content={full_address} />
      )}
      {!order_status_name_hidden && (
        <OrderDetailRow status={order_status_name} />
      )}
    </div>
  )
}
