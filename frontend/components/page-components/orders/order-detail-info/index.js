import styles from './order-detail-info.module.css'
import { formatPrice } from '@/hooks/numberFormat'
import OrderDetailRow from '../order-detail-row'

export default function OrderDetailInfo({
  order_date,
  merchant_trade_no,
  subtotal_price,
  deliver_fee,
  total_price,
  payment_date,
  full_address,
  order_status_name,
  order_status_id,
}) {
  return (
    <div className={styles.orderInfoBox}>
      <OrderDetailRow label="訂單日期" content={order_date} />

      {!!merchant_trade_no && (
        <OrderDetailRow label="訂單編號" content={merchant_trade_no} />
      )}

      <OrderDetailRow label="折扣" content={formatPrice(0)} />

      <OrderDetailRow label="運費" content={formatPrice(deliver_fee)} />
      <OrderDetailRow label="合計" content={formatPrice(total_price)} />

      {!!payment_date && (
        <OrderDetailRow label="付款時間" content={payment_date} />
      )}

      <OrderDetailRow label="地址" content={full_address} />

      <OrderDetailRow status={order_status_name} />
    </div>
  )
}
