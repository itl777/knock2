// checkout success page components

import BlackBtn from '@/components/UI/black-btn'
import styles from './checkout-success.module.css'
import OrderProductImgBox from '../../orders/order-product-img-box'

export default function CheckoutSuccess() {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.h2Styles}>訂單付款完成</h2>
      <img
        className={styles.checkoutSuccessImg}
        src="/ghost/ghost_03.png"
        alt=""
      />
      <div className={styles.contentContainer}>
        <div className="itemBoxS">
          <OrderProductImgBox />
          <div className={styles.itemInfo}>
            <p className={styles.productName}>決戰大富翁</p>
            <div className={styles.itemQtyPriceBox}>
              <p>x 1</p>
              <div className="itemPriceS">
                <p>$720</p>
                <small>$800</small>
              </div>
            </div>
          </div>
        </div>

        <div className="horizontalDividerS" />

        <div className={styles.total}>
          <small>合計</small>
          <h5>$ 2100</h5>
        </div>
      </div>
      <div className={styles.btnHorizontal}>
        <BlackBtn btnText="繼續購物" href="/product-list" paddingType='medium' />
        <BlackBtn btnText="檢視訂單" href="/user/orders/ongoing" paddingType='medium' />
      </div>
    </section>
  )
}
