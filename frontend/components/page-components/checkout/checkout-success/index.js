// page components checkout success
import styles from './checkout-success.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// contexts
import { useAuth } from '@/context/auth-context'
// hooks
import useFetchOrderData from '@/hooks/fetchOrderDetails'
// components
import BlackBtn from '@/components/UI/black-btn'
import OrderItemDetail from '../../orders/order-item-detail'
import CheckoutTotalTable from '../checkout-total-table'
// api path
import { PRODUCT_IMG } from '@/configs/api-path'

export default function CheckoutSuccess() {
  const router = useRouter()
  const { order_id } = router.query
  const { orderData, orderDetails, setFetchTrigger } = useFetchOrderData(
    order_id,
    false
  )
  const { auth, authIsReady } = useAuth() // 取得 auth.id, authIsReady
  const [isLogin, setIsLogin] = useState()

  useEffect(() => {
    if (router.isReady && authIsReady && auth.id) {
      setIsLogin(true)
      setFetchTrigger(true)
    } else {
      setIsLogin(false)
      setFetchTrigger(false)
    }
  }, [auth.id, router.isReady, authIsReady])

  return (
    <>
      {isLogin && (
        <section className={styles.sectionContainer}>
          <h3 className={styles.titleStyles}>訂單已成立</h3>

          <div className={styles.contentContainer}>
            <img className={styles.ghostImg} src="/ghost/ghost_03.png" alt="" />
            {orderDetails.map((detail) => (
              <OrderItemDetail
                key={detail.product_id}
                productName={detail.product_name}
                originalPrice={detail.order_unit_price}
                discountedPrice={detail.order_unit_price}
                productImg={`${PRODUCT_IMG}/${detail.product_img}`}
                orderQty={detail.order_quantity}
              />
            ))}

            <CheckoutTotalTable
              subtotal={orderData.subtotal_price}
              checkoutTotal={orderData.total_price}
              deliverFee={orderData.deliver_fee}
              totalDiscount={0}
            />
          </div>

          <div className={styles.btnStack}>
            <BlackBtn btnText="繼續購物" href="/product" paddingType="medium" />
            <BlackBtn
              btnText="檢視訂單"
              href={`/user/orders/details/${order_id}`}
              paddingType="medium"
            />
          </div>
        </section>
      )}
    </>
  )
}
