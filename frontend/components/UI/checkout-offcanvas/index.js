import React, { useState } from 'react'
import styles from './checkout-offcanvas.module.css'
import Drawer from '@mui/joy/Drawer'
// for badge
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
// components
import HDivider from '../divider/horizontal-divider'
import BlackBtn from '../black-btn'
import NoData from '../no-data'
import OrderItemCheckout from '@/components/page-components/orders/order-item-checkout'
import { PRODUCT_IMG } from '@/configs/api-path'
import { FaCartShopping } from 'react-icons/fa6'
// import { IoAdd, IoHeartOutline } from 'react-icons/io5'
// import { IoIosRemove } from 'react-icons/io'

const StyledBadge = styled(Badge)(({ theme }) => ({
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

  const initialCheckoutItems = [
    {
      order_id: 2,
      product_id: 1,
      product_name: '科學實驗室',
      order_unit_price: 950,
      order_quantity: 2,
      product_img: 'p1-1.jpg',
    },
    {
      order_id: 2,
      product_id: 2,
      product_name: '冒險之路',
      order_unit_price: 650,
      order_quantity: 1,
      product_img: 'p2-1.jpg',
    },
  ]

  const [checkoutItems, setCheckoutItems] = useState(initialCheckoutItems)

  const handleQuantityChange = (productId, newQuantity) => {
    setCheckoutItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId
          ? { ...item, order_quantity: newQuantity }
          : item
      )
    )
  }

  return (
    <>
      <IconButton aria-label="cart" onClick={toggleShow}>
        <StyledBadge badgeContent={checkoutItems.length} color="secondary" max={99}>
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
              <div className={styles.cartItemCount}>{checkoutItems.length}</div>
            </div>

            {/* checkout item list */}
            {checkoutItems.length === 0 ? (
              <NoData />
            ) : (
              checkoutItems.map((v, i) => (
                <OrderItemCheckout
                  type="small"
                  key={v.product_id}
                  productId={v.product_id}
                  productName={v.product_name}
                  productOriginalPrice={v.order_unit_price}
                  productDiscountedPrice={v.order_unit_price}
                  productImg={`${PRODUCT_IMG}/${v.product_img}`}
                  orderQty={v.order_quantity}
                  onQuantityChange={handleQuantityChange}
                />
              ))
            )}

            <HDivider />

            <div className={styles.total}>
              <small>合計</small>
              <h5>$ 2100</h5>
            </div>
          </div>

          <div className={styles.alignEnd}>
            <BlackBtn
              btnText="前往結帳"
              href="/checkout"
              paddingType="medium"
            />
          </div>
        </div>
      </Drawer>
    </>
  )
}
