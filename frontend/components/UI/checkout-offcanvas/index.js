import React, { useState } from 'react'
import Drawer from '@mui/joy/Drawer'
import { FaCartShopping } from 'react-icons/fa6'
import styles from './checkout-offcanvas.module.css'
import { IoAdd, IoHeartOutline } from 'react-icons/io5'
import { IoIosRemove } from 'react-icons/io'

export default function CheckoutOffcanvas() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const toggleShow = () => setShow((s) => !s)

  return (
    <>
      <FaCartShopping onClick={toggleShow} />
      <Drawer
        open={show}
        onClose={handleClose}
        anchor="right"
        sx={{ width: '480px', padding: '2rem' }}
      >
        <div class={styles.checkoutTitle}>
          <h5>購物車</h5>
          <div class={styles.cartItemCount}>5</div>
        </div>

        <div className={styles.itemBox}>
          <div className="itemImgBox">
            <img src="/products/p1.png" alt="" />
          </div>
          <div className={styles.itemInfo}>
            <p>決戰大富翁</p>
            <div className={styles.itemPrice}>
              <p>$720</p>
              <small>$800</small>
            </div>
            <div className={styles.numberInput}>
              <button className={styles.stepper}>
                <IoAdd />
              </button>
              <div className={styles.stepperNumber}>1</div>
              <button className={styles.stepper}>
                <IoIosRemove />
              </button>
            </div>
          </div>
          <IoHeartOutline className={styles.addToFavoriteIcon} />
        </div>
      </Drawer>
    </>
  )
}
