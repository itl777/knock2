import styles from './order-price-box.module.css'
import { formatPrice } from '@/hooks/numberFormat'

export default function OrderPriceBox({
  discountedPrice,
  originalPrice,
}) {
  return (
    <div className={styles.itemPriceStyle}>
    <p>{formatPrice(discountedPrice)}</p>
    <small>{formatPrice(originalPrice)}</small>
  </div>
  )
}
