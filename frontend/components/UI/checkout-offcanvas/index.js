import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
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
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={true}
        placement="end"
        style={{ width: '480px', padding: '1rem' }}
      >
        {/* <Offcanvas.Header closeButton> */}
        <Offcanvas.Header>
          <div class={styles.checkoutTitle}>
            <h5>購物車</h5>
            <div class={styles.cartItemCount}>5</div>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
