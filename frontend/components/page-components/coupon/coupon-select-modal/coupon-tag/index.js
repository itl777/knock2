import styles from './coupon-tag.module.css'

export default function CouponTag({text=''}) {
  return (
    <div className={styles.couponTag}>
      <small>{text}</small>
    </div>
  )
}
