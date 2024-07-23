// order item component for checkout page
import styles from './order-item-checkout.module.css'
import { useCart } from '@/context/cart-context'
import InputStepper from '@/components/UI/input-stepper'
import OrderProductImgBox from '../order-product-img-box'
import OrderPriceBox from '../order-price-box'
import CartFavoriteIcon from '../../products/cart-favorite-icon'
import CouponSelectModal from '../../coupon/coupon-select-modal'
import { PRODUCT_IMG } from '@/configs/api-path'
import { useEffect } from 'react'

export default function OrderItemCheckout({ type = 'def' }) {
  const { checkoutItems, usableProductCoupons, handleQuantityChange, calculateProductDiscount } =
    useCart()

  // const calculateProductDiscount = (
  //   price,
  //   cart_product_quantity,
  //   coupon_type_id,
  //   discount_amount,
  //   discount_percentage,
  //   minimum_order,
  //   discount_max
  // ) => {
  //   let discountPrice = 0
  //   const productOriginalTotal = price * cart_product_quantity
  //   if (coupon_type_id === 2) {
  //     if (discount_amount) {
  //       if (
  //         productOriginalTotal >= minimum_order &&
  //         productOriginalTotal >= discount_amount
  //       ) {
  //         discountPrice = price - discount_amount
  //         discountPrice = discountPrice >= discount_max ? discountPrice : price
  //       }
  //     } else if (discount_percentage) {
  //       if (productOriginalTotal >= minimum_order) {
  //         discountPrice = Math.floor(price * (1 - discount_percentage / 100))
  //         // discountPrice = discountPrice >= discount_max ? discountPrice : price
  //       }
  //     }
  //   }
  //   return discountPrice
  // }

  const itemInfoClass =
    type === 'small' ? styles.itemInfoSmall : styles.itemInfo

  useEffect(() => {
    calculateProductDiscount()
  }, [usableProductCoupons])

  return (
    <>
      {checkoutItems.map((v, i) => {
        const hasCoupon = usableProductCoupons.some(
          (coupon) =>
            coupon.coupon_type_id === 2 &&
            coupon.products.some(
              (product) => product.product_id === v.product_id
            )
        )
        return (
          <div>
            <div className={styles.itemBox} key={v.product_id}>
              <OrderProductImgBox
                imgSrc={`${PRODUCT_IMG}/${v.product_img}`}
                productId={v.product_id}
              />
              <div className={itemInfoClass}>
                <div className={styles.itemNamePriceBox}>
                  <p>{v.product_name}</p>
                  <OrderPriceBox
                    originalPrice={v.price}
                    discountedPrice={calculateProductDiscount(
                      v.price,
                      v.cart_product_quantity,
                      v.discount_amount,
                      v.discount_percentage,
                      v.minimum_order,
                      v.discount_max
                    )}
                  />
                </div>
                <InputStepper
                  stepperValue={v.cart_product_quantity}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(v.product_id, newQuantity)
                  }
                  productName={v.product_name} // 將商品名稱傳給子元件
                />
              </div>

              <CartFavoriteIcon product_id={v.product_id} />
            </div>
            {hasCoupon && (
              <CouponSelectModal type="product" product_id={v.product_id} />
            )}
          </div>
        )
      })}
    </>
  )
}
