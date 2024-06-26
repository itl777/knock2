import React, { useState } from 'react'
import Drawer from '@mui/joy/Drawer'
import { FaCartShopping } from 'react-icons/fa6'
import styles from './checkout-offcanvas.module.css'
import { IoHeartOutline } from 'react-icons/io5'
import InputStepper from '../input-stepper'

// import { IoAdd, IoHeartOutline } from 'react-icons/io5'
// import { IoIosRemove } from 'react-icons/io'

export default function CheckoutOffcanvas() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const toggleShow = () => setShow((s) => !s)

  return (
    <>
      <FaCartShopping onClick={toggleShow} />
      <Drawer open={show} onClose={handleClose} anchor="right">
        <div className={styles.offcanvasBody}>
          <div className={styles.checkoutTitle}>
            <h5>購物車</h5>
            <div className={styles.cartItemCount}>5</div>
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
              <InputStepper stepperValue="1" />
            </div>
            <IoHeartOutline className={styles.addToFavoriteIcon} />
          </div>
        </div>
      </Drawer>
    </>
  )
}
