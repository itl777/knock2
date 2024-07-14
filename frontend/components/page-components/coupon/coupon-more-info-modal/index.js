import styles from './coupon-more-info-modal.module.css'
// components
import ModalLayout from '../../checkout/address/modal-layout'
import CouponCard from '../coupon-card'
import CouponInfoRow from '../coupon-info-row'
import { formatIntlNumber } from '@/hooks/numberFormat'

export default function CouponMoreInfoModal({
  coupon,
  couponDetails,
  handleClose,
}) {
  return (
    <ModalLayout
      title="優惠卷使用說明"
      modalHeight="720px"
      btnLeftHidden={true}
      btnTextRight="關閉"
      isOpen
      onClickRight={handleClose}
    >
      <div className={styles.couponModalBody}>
        <CouponCard
          coupon_name={coupon.coupon_name}
          restrict={coupon.minimum_order}
          expire_date={coupon.valid_until}
          btnHidden={true}
        />
        <CouponInfoRow label="有效期限" content={coupon.valid_until} />
        <CouponInfoRow
          label="優惠內容"
          content={`結帳滿 ${formatIntlNumber(
            coupon.minimum_order
          )}元，即可折抵 ${formatIntlNumber(coupon.discount_amount)}元。`}
        />
        <CouponInfoRow label="適用商品" content={coupon.coupon_type_name} />
        <CouponInfoRow
          label="優惠詳情"
          content={`${coupon.coupon_type_name}滿 ${formatIntlNumber(
            coupon.minimum_order
          )}
        元（不含運費），即可折抵 ${formatIntlNumber(coupon.discount_amount)}
        元。請在購物車/結帳頁內全站優惠券入口輸入或選用，同一帳號/同一人限使用一次。`}
        />
        <div>
          <small>適用商品：</small>
          {couponDetails.map((v) => (
            <small key={v.product_id}>{v.product_name}, </small>
          ))}
        </div>
      </div>
    </ModalLayout>
  )
}
