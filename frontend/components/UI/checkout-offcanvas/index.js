import React, { useState } from 'react'
import styles from './checkout-offcanvas.module.css'
import Drawer from '@mui/joy/Drawer'
import InputStepper from '../input-stepper'
import OrderProductImgBox from '@/components/page-components/orders/order-product-img-box'
import HDivider from '../divider/horizontal-divider'
import BlackBtn from '../black-btn'
// for badge
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { FaCartShopping } from 'react-icons/fa6'
import { IoHeartOutline } from 'react-icons/io5'
import { color } from 'framer-motion'
// import { IoAdd, IoHeartOutline } from 'react-icons/io5'
// import { IoIosRemove } from 'react-icons/io'

const StyledBadge = styled(Badge)(({  }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: -3,
    color: 'white',
    backgroundColor: 'var(--sec-1)',
  },

}))


export default function CheckoutOffcanvas() {
  
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const toggleShow = () => setShow((s) => !s)

  return (
    <>
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={1} color="secondary" max={99} onClick={toggleShow}>
          <FaCartShopping />
        </StyledBadge>
      </IconButton>


      <Drawer open={show} onClose={handleClose} anchor="right">
        {/* drawer header */}

        <div className={styles.drawerContainer}>
          {/* drawer product list */}
          <div className={styles.drawerTop}>
            {/* drawer title */}
            <div className={styles.checkoutTitle}>
              <h5>購物車</h5>
              <div className={styles.cartItemCount}>5</div>
            </div>

            {/* checkout item list */}

            <div className="itemBoxS">
              <OrderProductImgBox />
              <div className={styles.itemInfo}>
                <p>決戰大富翁</p>
                <div className="itemPriceS">
                  <p>$720</p>
                  <small>$800</small>
                </div>
                <InputStepper stepperValue="1" />
              </div>
              <IoHeartOutline className={styles.addToFavoriteIcon} />
            </div>

            <div className="itemBoxS">
              <OrderProductImgBox />
              <div className={styles.itemInfo}>
                <p>決戰大富翁</p>
                <div className="itemPriceS">
                  <p>$720</p>
                  <small>$800</small>
                </div>
                <InputStepper stepperValue="1" />
              </div>
              <IoHeartOutline className={styles.addToFavoriteIcon} />
            </div>

            <HDivider />

            <div className={styles.total}>
              <small>合計</small>
              <h5>$ 2100</h5>
            </div>
          </div>

          <div className={styles.alignEnd}>
            <BlackBtn btnText='前往結帳' href='/checkout' paddingType='medium'/>
          </div>
        </div>
      </Drawer>
    </>
  )
}
