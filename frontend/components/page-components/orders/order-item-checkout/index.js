// order item component for checkout page
import styles from './order-item-checkout.module.css'
import InputStepper from '@/components/UI/input-stepper'
import OrderProductImgBox from '../order-product-img-box'
import { IoHeartOutline } from 'react-icons/io5'

export default function OrderItemCheckout({
  productId = 0,
  productName = '產品名稱',
  productOriginalPrice = 0,
  productDiscountedPrice = 0,
  productImg = '',
  orderQty = 1,
}) {
  return (
    <div className="itemBoxS">
      <OrderProductImgBox imgSrc={productImg}/>
      <div className={styles.itemInfo}>
        <div className="item-name-price">
          <p className={styles.productName}>{productName}</p>
          <div className="itemPriceS">
            <p>$ {productDiscountedPrice}</p>
            <small>$ {productOriginalPrice}</small>
          </div>
        </div>
        <InputStepper stepperValue={orderQty} />
      </div>
      <IoHeartOutline className={styles.addToFavoriteIcon} />
    </div>
  )
}
