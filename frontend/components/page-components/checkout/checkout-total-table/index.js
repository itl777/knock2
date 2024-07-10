import styles from './checkout-total-table.module.css'
import HDivider from '@/components/UI/divider/horizontal-divider'

export default function CheckoutTotalTable({
  subtotal,
  deliverFee,
  totalDiscount,
}) {
  return (
    <div className={styles.totalBox}>
      <div className={styles.totalRow}>
        <p>小計</p>
        <p>$ {subtotal}</p>
      </div>
      <div className={styles.totalRow}>
        <p>折扣</p>
        <p>$ {totalDiscount}</p>
      </div>
      <div className={styles.totalRow}>
        <p>運費</p>
        <p>$ {deliverFee}</p>
      </div>
      <HDivider margin="0.75rem 0" />
      <div className={styles.totalRow}>
        <p>合計</p>
        <p>$ {subtotal+deliverFee-totalDiscount}</p>
      </div>
    </div>
  )
}
