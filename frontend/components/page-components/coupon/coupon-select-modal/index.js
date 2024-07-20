import styles from './coupon-select-modal.module.css'
import { useEffect, useState } from 'react'
// context
import { useCart } from '@/context/cart-context'
// components
import ModalLayout from '../../checkout/address/modal-layout'
import CouponCard from '@/components/page-components/coupon/coupon-card'
import { useSnackbar } from '@/context/snackbar-context'
import NoData from '@/components/UI/no-data'
import TinyButton from '@/components/UI/tiny-button'
import CheckoutCouponBtn from '../../checkout/checkout-coupon-btn'

export default function CouponSelectModal({ type = 'all', product_id = 0 }) {
  const {
    usableCoupons,
    usableProductCoupons,
    handleAddCouponToCart,
    handleRemoveCouponFromCart,
    selectedCoupons,
    selectedProductCoupons,
  } = useCart()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const {openSnackbar} = useSnackbar()
  const [itemCouponBtn, setItemCouponBtn] = useState('選擇優惠券')
  const [wholeSiteCouponContent, setWholeSiteCouponContent] =
    useState('選擇全站優惠券')

  // 傳遞指定 coupon 內容給優惠券詳情 modal
  const getCoupon = (coupon_id) => {
    if (type === 'product') {
      return usableProductCoupons.find((v) => v.coupon_id === coupon_id) || {}
    }
    return usableCoupons.find((v) => v.coupon_id === coupon_id) || {}
  }

  const modalCoupons = type === 'product' ? usableProductCoupons : usableCoupons

  const getInCartValue = (products) => {
    const product = products.find((v) => v.product_id === product_id)
    return product ? product.in_cart : 0
  }

  const isChecked = (products, in_cart) => {
    if (!products) {
      return in_cart === 1 ? true : false
    } else {
      return getInCartValue(products) === 1 ? true : false
    }
  }

  const handleToggleCoupon = (coupon_id, isChecked) => {
    if (isChecked) {
      handleRemoveCouponFromCart(coupon_id, product_id)
      openSnackbar('不套用優惠券', 'success')
    } else {
      handleAddCouponToCart(coupon_id, product_id)
      openSnackbar('已套用優惠券', 'success')

    }
  }

  const getItemCouponBtn = () => {
    let btnText
    if (product_id) {
      const findProductCoupon = selectedProductCoupons.find(
        (v) => v.product_id === product_id
      )
      btnText = findProductCoupon
        ? findProductCoupon.coupon_name
        : '請選擇優惠券'
    } else {
      btnText = '請選擇優惠券'
    }
    setItemCouponBtn(btnText)
  }

  const getWholeSiteCoupons = () => {
    if (selectedCoupons.length > 0) {
      const couponNames = selectedCoupons.map((v) => v.coupon_name).join(', ')
      setWholeSiteCouponContent(couponNames)
    } else {
      setWholeSiteCouponContent('請選擇全站優惠券')
    }
  }

  useEffect(() => {
    if (product_id !== null) {
      getItemCouponBtn()
    }
  }, [selectedProductCoupons, product_id])

  useEffect(() => {
    if (selectedCoupons) {
      getWholeSiteCoupons()
    }
  }, [selectedCoupons])

  return (
    <>
      {type === 'product' ? (
        <TinyButton
          type="button"
          btnText={itemCouponBtn}
          href={null}
          onClick={handleOpen}
        />
      ) : (
    
          <CheckoutCouponBtn
            onClick={handleOpen}
            content={wholeSiteCouponContent}
          />
      )}
      {modalCoupons.length >= 0 && (
        <>
          <ModalLayout
            title="選擇優惠券"
            modalHeight="720px"
            btnTextRight="關閉"
            btnLeftHidden={true}
            onClickRight={handleClose}
            isOpen={open}
          >
            <div className={styles.modalContentBox}>
              {modalCoupons.length === 0 ? (
                <NoData text="無優惠券" />
              ) : (
                modalCoupons.map((v) => (
                  <CouponCard
                    key={v.coupon_id}
                    status="ongoing"
                    coupon_id={v.coupon_id}
                    coupon_name={v.coupon_name}
                    minimum_order={v.minimum_order}
                    valid_until={v.valid_until}
                    isChecked={isChecked(v.products, v.in_cart)}
                    handelSelectedToggle={() =>
                      handleToggleCoupon(
                        v.coupon_id,
                        isChecked(v.products, v.in_cart)
                      )
                    }
                    coupon={getCoupon(v.coupon_id)} // 傳遞這張 coupon card 的單一優惠券資訊到子層（coupon more info modal）
                    disabled={false}
                  />
                ))
              )}
            </div>
          </ModalLayout>
        </>
      )}
    </>
  )
}
