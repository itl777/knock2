import React, { useEffect, useState } from 'react'
import styles from './coupon-card.module.css'
import { motion } from 'framer-motion'
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

  useEffect(() => {
    setCheckedBoolean(isChecked)
  }, [isChecked])

  return (
    <>
      <motion.div
        className="box"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
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

            <img
              src="/ghost/ghost_11.png"
              alt=""
              className={styles.webGhostImg}
            />
          </div>

          <div
            className={`${styles.couponCardRight} ${
              isChecked ? styles.couponCardRightChecked : ''
            }`}
          >
            <div className={styles.couponInfo}>
              <p>{coupon_name}</p>
              <div className={styles.textBox}>
                <small>最低消費：{formatPrice(minimum_order)}</small>
                <small>有效期限：{valid_until}</small>
              </div>
              {!btnHidden && <MoreInfoBtn onClick={handleMoreInfoClick} />}
              <img
                src="/ghost/ghost_11.png"
                alt=""
                className={styles.appGhostImg}
              />
            </div>
          </div>
        </div>

        {isModalOpen && (
          <CouponMoreInfoModal
            coupon_id={coupon_id} // 將 coupon card 的 coupon_id, coupon 內容傳遞給 CouponMoreInfoModal
            coupon={coupon}
            handleClose={handleCloseModal}
          />
        )}
      </motion.div>
    </>
  )
}
