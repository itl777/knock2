// order item component for checkout page
import styles from './order-item-checkout.module.css'
import InputStepper from '@/components/UI/input-stepper'
import OrderProductImgBox from '../order-product-img-box'
import OrderPriceBox from '../order-price-box'
import { IoHeartOutline } from 'react-icons/io5'

export default function OrderItemCheckout({
  type = 'def',
  productId = 0,
  productName = '產品名稱',
  productOriginalPrice = 0,
  productDiscountedPrice = 0,
  productImg = '',
  orderQty = 1,
  onQuantityChange, // 接收 input stepper 更新數值通知
}) {
  const itemInfoClass =
    type === 'small' ? styles.itemInfoSmall : styles.itemInfo

  return (
    <div className={styles.itemBox}>
      <OrderProductImgBox imgSrc={productImg} />
      <div className={itemInfoClass}>
        <div className={styles.itemNamePriceBox}>
          <p className={styles.itemNameStyle}>{productName}</p>
          <OrderPriceBox
            discountedPrice={productDiscountedPrice}
            originalPrice={productOriginalPrice}
          />
        </div>
        <InputStepper
          stepperValue={orderQty}
          onQuantityChange={(newQuantity) =>
            onQuantityChange(productId, newQuantity)
          }
          productName={productName} // 將商品名稱傳給子元件
        />
      </div>
      <IoHeartOutline className={styles.addToFavoriteIcon} />
    </div>
  )
}
