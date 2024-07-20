import styles from './checkout-coupon-btn.module.css'
import CouponBtn from './couponBtn'

export default function CheckoutCouponBtn({
  content = '請選擇優惠券',
  btnText = '全站優惠券',
  onClick,
}) {
  return (
    <div className={styles.couponBox}>
      <div className={styles.content}>{content}</div>
      <CouponBtn btnText={btnText} onClick={onClick} />
    </div>
  )
}
