import styles from './coupon-select-modal.module.css'
import { useState } from 'react'
// context
import { useCart } from '@/context/cart-context'
// components
import ModalLayout from '../../checkout/address/modal-layout'
import CouponCard from '@/components/page-components/coupon/coupon-card'
import FilterBtn from '@/components/UI/filter-btn'
import NoData from '@/components/UI/no-data'
import CouponTag from './coupon-tag'

export default function CouponSelectModal() {
  const {
    coupons,
    usableCoupons,
    // subtotal,
    // discountTotal,
    // checkoutItems,
    // setDiscountTotal,
    selectedCoupons,
    handelSelectedToggle,
  } = useCart()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // 傳遞指定 coupon 內容給優惠券詳情 modal
  const getCoupon = (coupon_id) => {
    return usableCoupons.find((v) => v.coupon_id === coupon_id) || {}
  }

  // coupons coupon_id 是否已存在 selectedCoupon coupon_id 裡面（回傳 true or false）
  // const isChecked = (coupon_id) => {
  //   return selectedCoupons.some((v) => v.coupon_id === coupon_id)
  // }


  const isChecked = (coupon_id) => {
    // 檢查是否存在可用的優惠券且已被選中
    return usableCoupons.some((coupon) => {
      return (
        coupon.coupon_id === coupon_id &&
        coupon.usable &&
        selectedCoupons.some((selected) => selected.coupon_id === coupon_id)
      )
    })
  }
  
  return (
    <>
      <div className={styles.couponBox}>
        {selectedCoupons.map((v) => (
          <CouponTag key={v.coupon_id} text={v.coupon_name} />
        ))}
      </div>

      <FilterBtn btnText="請選擇優惠券" href={null} onClick={handleOpen} />

      {usableCoupons.length >= 0 && (
        <ModalLayout
          title="選擇優惠券"
          modalHeight="720px"
          btnTextRight="關閉"
          btnLeftHidden={true}
          onClickRight={handleClose}
          isOpen={open}
        >
          <div className={styles.modalContentBox}>
            {usableCoupons.length === 0 ? (
              <NoData text="無優惠券" />
            ) : (
              usableCoupons.map((v) => (
                <CouponCard
                  key={v.coupon_id}
                  status="ongoing"
                  coupon_id={v.coupon_id}
                  coupon_name={v.coupon_name}
                  minimum_order={v.minimum_order}
                  valid_until={v.valid_until}
                  isChecked={isChecked(v.coupon_id)}
                  handelSelectedToggle={() => handelSelectedToggle(v.coupon_id)}
                  coupon={getCoupon(v.coupon_id)} // 傳遞這張 coupon card 的單一優惠券資訊到子層（coupon more info modal）
                  disabled={!v.usable}
                />
              ))
            )}
          </div>
        </ModalLayout>
      )}
    </>
  )
}
