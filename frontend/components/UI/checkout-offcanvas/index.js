import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
import {
  PRODUCT_IMG,
  CHECKOUT_GET_CART,
  CHECKOUT_UPDATE_CART,
} from '@/configs/api-path'
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
  const loginMemberId = 1 // 暫時性假資料，等登入功能做好再設定
  const [show, setShow] = useState(false)
  const [checkoutItems, setCheckoutItems] = useState([])
  const [checkoutTotal, setCheckoutTotal] = useState(0)
  const handleClose = () => setShow(false)
  const toggleShow = () => setShow((s) => !s)

  // 取得會員購物車資料
  const fetchMemberCart = async () => {
    try {
      const response = await fetch(
        `${CHECKOUT_GET_CART}?member_id=${loginMemberId}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch member cart')
      }

      const cartItems = await response.json()
      setCheckoutItems(cartItems.memberCart)

      console.log('fetch member cart', cartItems.memberCart)
    } catch (error) {
      console.log('Error fetching member cart:', error)
    }
  }

  // 取得訂單總金額
  useEffect(() => {
    let newCheckTotal = 0
    checkoutItems.forEach((item) => {
      newCheckTotal += item.cart_product_quantity * item.price
    })
    setCheckoutTotal(newCheckTotal)
  }, [checkoutItems])

  const handleQuantityChange = async (productId, newQuantity) => {
    const updatedItems = checkoutItems.map((item) =>
      item.product_id === productId
        ? { ...item, cart_product_quantity: newQuantity }
        : item
    )
    setCheckoutItems(updatedItems)
    console.log(updatedItems)

    const itemToUpdate = updatedItems.find(
      (item) => item.product_id === productId
    )

    console.log('itemToUpdate', itemToUpdate)

    try {
      const response = await axios.put(
        `${CHECKOUT_UPDATE_CART}/${itemToUpdate.cart_id}`,
        {
          cart_product_quantity: newQuantity,
        }
      )

      if (!response.data.success) {
        throw new Error('Failed to update cart item quantity')
      }

      fetchMemberCart()
    } catch (error) {
      console.log('Error updating cart item quantity:', error)
    }
  }

  useEffect(() => {
    fetchMemberCart()
  }, [])

  return (
    <>
      <IconButton aria-label="cart" onClick={toggleShow}>
        <StyledBadge
          badgeContent={checkoutItems.length}
          color="secondary"
          max={99}
        >
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
                  cartId={v.cart_id}
                  key={v.product_id}
                  productId={v.product_id}
                  productName={v.product_name}
                  productOriginalPrice={v.price}
                  productDiscountedPrice={v.price}
                  productImg={`${PRODUCT_IMG}/${v.product_img}`}
                  orderQty={v.cart_product_quantity}
                  onQuantityChange={handleQuantityChange}
                />
              ))
            )}

            <HDivider />

            <div className={styles.total}>
              <small>合計</small>
              <h5>$ {checkoutTotal}</h5>
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
