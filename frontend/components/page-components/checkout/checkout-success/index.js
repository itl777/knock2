// page components checkout success
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import useFetchOrderData from '@/hooks/fetchOrderDetails'
import BlackBtn from '@/components/UI/black-btn'
import styles from './checkout-success.module.css'
import OrderProductImgBox from '../../orders/order-product-img-box'
import { PRODUCT_IMG } from '@/configs/api-path'

export default function CheckoutSuccess() {
  const router = useRouter()
  const { order_id } = router.query
  const { orderData, orderDetails } = useFetchOrderData(order_id)
  
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.h2Styles}>訂單付款完成</h2>
      <img
        className={styles.checkoutSuccessImg}
        src="/ghost/ghost_03.png"
        alt=""
      />
      <div className={styles.contentContainer}>
        {orderDetails.map((detail) => (
          <div className="itemBoxS" key={detail.product_id}>
            <OrderProductImgBox
              imgSrc={`${PRODUCT_IMG}/${detail.product_img}`}
            />
            <div className={styles.itemInfo}>
              <p className={styles.productName}>{detail.product_name}</p>
              <div className={styles.itemQtyPriceBox}>
                <p>x {detail.order_quantity}</p>
                <div className="itemPriceS">
                  <p>${detail.order_unit_price}</p>
                  <small>
                    ${detail.order_unit_price * detail.order_quantity}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="horizontalDividerS" />
        <div className={styles.total}>
          <small>合計 {orderData.total_price}</small>
          <h5>$ {orderData.total_price}</h5>
        </div>
      </div>
      <div className={styles.btnHorizontal}>
        <BlackBtn btnText="繼續購物" href="/product" paddingType="medium" />
        <BlackBtn
          btnText="檢視訂單"
          href={`/user/orders/details/${order_id}`}
          paddingType="medium"
        />
      </div>
    </section>
  )
}
