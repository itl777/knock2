import styles from './checkout-total-table.module.css'
import CheckoutTotalRow from '../checkout-total-row'
import HDivider from '@/components/UI/divider/horizontal-divider'

export default function CheckoutTotalTable({
  subtotal,
  checkoutTotal,
  totalDiscount,
}) {
  return (
    <div className={styles.totalBox}>
      <CheckoutTotalRow label="訂金" content={subtotal} />
      <CheckoutTotalRow label="優惠項目" content={totalDiscount} />
      <CheckoutTotalRow label="總計" content={checkoutTotal} />
    </div>
  )
}
