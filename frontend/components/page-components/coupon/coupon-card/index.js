import React, { useEffect, useState } from 'react'
import styles from './coupon-card.module.css'
import MoreInfoBtn from './more-info-text-btn'
import { formatPrice } from '@/hooks/numberFormat'
import CouponCheckbox from './coupon-checkbox'
import CouponMoreInfoModal from '../coupon-more-info-modal'

export default function CouponCard({
  status = 'ongoing',
  coupon_id,
  coupon_name,
  minimum_order,
  valid_until,
  isChecked,
  handelSelectedToggle,
  coupon,
  selectable = true,
  btnHidden = false,
  disabled,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [checkedBoolean, setCheckedBoolean] = useState(isChecked)

  useEffect(() => {
    setCheckedBoolean(isChecked)
  }, [isChecked])

  const getStatusClass = (baseClass) => {
    switch (status) {
      case 'ongoing':
        return `${baseClass}`
      case 'used':
        return `${baseClass} ${styles.history}`
      case 'expired':
        return `${baseClass} ${styles.history}`
      default:
        return baseClass
    }
  }

  const handleMoreInfoClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCheckboxOnChange = () => {
    setCheckedBoolean(!checkedBoolean)
    handelSelectedToggle(coupon_id)
  }

  return (
    <>
      <div className={getStatusClass(styles.couponCard)}>
        <div
          className={`${styles.couponCardLeft} ${
            isChecked ? styles.couponCardLeftChecked : ''
          }`}
        >
          {selectable && (
            <div className={styles.checkboxContainer}>
              <CouponCheckbox
                checked={checkedBoolean}
                onChange={handleCheckboxOnChange}
                disabled={disabled}
              />
            </div>
          )}

          <img src="/ghost/ghost_11.png" alt="" />
        </div>

        <div
          className={`${styles.couponCardRight} ${
            isChecked ? styles.couponCardRightChecked : ''
          }`}
        >
          <div className={styles.couponInfo}>
            <p>{coupon_name}</p>
            <div className={styles.textBox}>
              <p>最低消費金額：{formatPrice(minimum_order)}</p>
              <p>有效期限：{valid_until}</p>
            </div>
          </div>
          {!btnHidden && <MoreInfoBtn onClick={handleMoreInfoClick} />}
        </div>
      </div>

      {isModalOpen && (
        <CouponMoreInfoModal
          coupon_id={coupon_id} // 將 coupon card 的 coupon_id, coupon 內容傳遞給 CouponMoreInfoModal
          coupon={coupon}
          handleClose={handleCloseModal}
        />
      )}
    </>
  )
}
