import styles from './coupon-select-modal.module.css'
import { useEffect, useState } from 'react'
// context
import { useCart } from '@/context/cart-context'
// components
import ModalLayout from '../../checkout/address/modal-layout'
import CouponCard from '@/components/page-components/coupon/coupon-card'
import FilterBtn from '@/components/UI/filter-btn'
import NoData from '@/components/UI/no-data'

export default function CouponSelectModal() {
  const { coupons, selectedCoupons, handelSelectedToggle } = useCart()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // 傳遞指定 coupon 內容給優惠券詳情 modal
  const getCoupon = (coupon_id) => {
    return coupons.find((v) => v.coupon_id === coupon_id) || {}
  }

  // coupons coupon_id 是否已存在 selectedCoupon coupon_id 裡面（回傳 true or false）
  const isChecked = (coupon_id) => {
    return selectedCoupons.some((v) => v.coupon_id === coupon_id)
  }

  return (
    <>
      {selectedCoupons.map((v, i) => {
        return <div key={v.coupon_id}>{v.coupon_name}</div>
      })}

      <FilterBtn btnText="請選擇優惠券" href={null} onClick={handleOpen} />
      {coupons.length >= 0 && (
        <ModalLayout
          title="選擇優惠券"
          modalHeight="720px"
          btnTextRight="關閉"
          btnLeftHidden={true}
          onClickRight={handleClose}
          isOpen={open}
        >
          {coupons.length === 0 ? (
            <NoData text="無優惠券" />
          ) : (
            coupons.map((v) => {
              return (
                <CouponCard
                  key={v.coupon_id}
                  status="ongoing"
                  coupon_id={v.coupon_id}
                  coupon_name={v.coupon_name}
                  minimum_order={v.minimum_order}
                  valid_until={v.expire_date}
                  isChecked={isChecked(v.coupon_id)}
                  handelSelectedToggle={() => handelSelectedToggle(v.coupon_id)}
                  coupon={getCoupon(v.coupon_id)} // 傳遞這張 coupon card 的單一優惠券資訊到子層（coupon more info modal）
                />
              )
            })
          )}
          <div className={styles.modalContentBox}></div>
        </ModalLayout>
      )}
    </>
  )
}
