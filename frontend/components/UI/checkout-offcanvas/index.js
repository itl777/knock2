import React, { useState } from 'react'
import styles from './checkout-offcanvas.module.css'
// mui
import Drawer from '@mui/material/Drawer'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles'
// context
import { useCart } from '@/context/cart-context'
// components
import CheckoutTotalTable from '@/components/page-components/checkout/checkout-total-table'
import BlackBtn from '../black-btn'
import OrderItemCheckout from '@/components/page-components/orders/order-item-checkout'
import EmptyCart from '@/components/page-components/checkout/empty-cart'
// icons
import { FaCartShopping } from 'react-icons/fa6'
// api path
import { PRODUCT_IMG } from '@/configs/api-path'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: -3,
    color: 'white',
    backgroundColor: 'var(--sec-1)',
  },
}))

const drawerTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: '40%',
          maxWidth: '480',
          minWidth: '352px',
          backgroundColor: 'white',
          '@media (max-width:400px)': {
            width: '90%',
          },
        },
      },
    },
  },
})

export default function CheckoutOffcanvas() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const toggleShow = () => setShow((s) => !s)

  // 取得會員購物車資料、更新訂單總金額、接收商品數量變化
  const {
    checkoutItems,
    checkoutTotal,
    deliverFee,
    cartBadgeQty,
    handleQuantityChange,
  } = useCart()

  return (
    <>
      <IconButton aria-label="cart" onClick={toggleShow}>
        <StyledBadge badgeContent={cartBadgeQty} color="secondary" max={99}>
          <FaCartShopping />
        </StyledBadge>
      </IconButton>
      <ThemeProvider theme={drawerTheme}>
        <Drawer open={show} onClose={handleClose} anchor="right">
          {/* drawer header */}

          <div className={styles.drawerContainer}>
            {/* drawer top (title + checkout items list) */}
            <div>
              {/* title */}
              <div className={styles.checkoutTitle}>
                <h5>購物車</h5>
                <div className={styles.cartItemCount}>{cartBadgeQty}</div>
              </div>

              {/* 如果購物車「無」商品： */}
              {cartBadgeQty <= 0 && <EmptyCart />}

              {/* 如果購物車有商品： */}
              {cartBadgeQty > 0 && (
                <div className={styles.checkoutList}>
                  {checkoutItems.map((v, i) => (
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
                  ))}
                </div>
              )}
            </div>

            {cartBadgeQty > 0 && (
              <div className={styles.checkoutBottom}>
                <CheckoutTotalTable
                  subtotal={checkoutTotal}
                  deliverFee={deliverFee}
                  totalDiscount={0}
                />
                <BlackBtn
                  btnText="前往結帳"
                  href="/checkout"
                  paddingType="medium"
                />
              </div>
            )}
          </div>
        </Drawer>
      </ThemeProvider>
    </>
  )
}
