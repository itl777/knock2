import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import styles from './coupon-promote.module.css'
import CouponPromoteButton from './coupon-promote-button'

export default function CouponPromote() {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  const goToDrawing = () => {
    router.push('/coupon')
  }

  return (
    <div className={styles.container}>
      <motion.div
        layout
        data-isOpen={isOpen}
        className={styles.parent}
        onClick={() => setIsOpen(!isOpen)}
        // onHoverStart={() => setIsOpen(!isOpen)}
      >
        <div className={styles.contentBox}>
          <div className={styles.contentLeft}>
            <div className={styles.title}>DISCOUNT</div>
            <div className={styles.validBox}>優惠券抽獎活動限時 8 小時</div>
            <div className={styles.actionButton}>
              <CouponPromoteButton
                btnText="前往抽獎活動"
                href={null}
                onClick={goToDrawing}
              />
            </div>
          </div>

          <div className={styles.contentRight}>
            <img src="/order/sales-banner-01.png" />
          </div>
        </div>

        <motion.div className={styles.child}>
          <motion.img
            src="/ghost/ghost_08.png"
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ ease: 'easeOut', duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
