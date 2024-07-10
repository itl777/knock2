import styles from './order-price-box.module.css'

export default function OrderPriceBox({
  discountedPrice,
  originalPrice,
}) {
  return (
    <div className={styles.itemPriceStyle}>
    <p>$ {discountedPrice}</p>
    <small>$ {originalPrice}</small>
  </div>
  )
}
