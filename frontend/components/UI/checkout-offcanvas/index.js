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
import { PRODUCT_IMG, CHECKOUT_GET_CART, CHECKOUT_UPDATE_CART } from '@/configs/api-path'
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
  const handleClose = () => setShow(false)
  const toggleShow = () => setShow((s) => !s)

  // const initialCheckoutItems = [
  //   {
  //     order_id: 2,
  //     product_id: 1,
  //     product_name: '科學實驗室',
  //     order_unit_price: 950,
  //     order_quantity: 2,
  //     product_img: 'p1-1.jpg',
  //   },
  //   {
  //     order_id: 2,
  //     product_id: 2,
  //     product_name: '冒險之路',
  //     order_unit_price: 650,
  //     order_quantity: 1,
  //     product_img: 'p2-1.jpg',
  //   },
  // ]
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

  // const handleQuantityChange = (productId, newQuantity) => {
  //   setCheckoutItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.product_id === productId
  //         ? { ...item, order_quantity: newQuantity }
  //         : item
  //     )
  //   )
  // }

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
