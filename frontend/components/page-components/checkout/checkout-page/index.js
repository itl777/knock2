import styles from './checkout-page.module.css'
import FilterBtn from '@/components/UI/filter-btn'
import OrderItemCheckout from '../../orders/order-item-checkout'
import BlackBtn from '@/components/UI/black-btn'
import { IoIosArrowForward } from 'react-icons/io'

export default function CheckOutPage() {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.h2Style}>結帳</h2>
      <form className={styles.contentContainer}>
        {/* LEFT ORDER INFO START */}
        <div className={styles.checkoutLeft}>
          <h5>訂購資訊</h5>

          <OrderItemCheckout
            productName="哈利波特的奶油啤酒"
            productOriginalPrice={1000}
            productDiscountedPrice={800}
            productImg="/products/p1.png"
            orderQty=""
          />

          <FilterBtn btnText="使用優惠券" />

          <div className={styles.totalBox}>
            <div className={styles.totalRow}>
              <div className={styles.totalHeader}>小計</div>
              <div className={styles.totalContent}>$1000</div>
            </div>
            <div className={styles.totalRow}>
              <div className={styles.totalHeader}>折扣</div>
              <div className={styles.totalContent}>$1000</div>
            </div>
            <div className={styles.totalRow}>
              <div className={styles.totalHeader}>運費</div>
              <div className={styles.totalContent}>$1000</div>
            </div>
            <div className="horizontalDividerS" />
            <div className={styles.totalRow}>
              <div className={styles.totalHeader}>合計</div>
              <div className={styles.totalContent}>$1000</div>
            </div>
          </div>
        </div>
        {/* LEFT ORDER INFO END */}

        <div className="verticalDividerS" />

        {/* RIGHT RECIPIENT INFO START */}
        <div className={styles.checkoutRight}>
          <div className={styles.checkoutRightMain}>
            <h5>收件資料</h5>
            <div className="recipient-form">
              <div className="recipient-desc">
                <div className="recipient-label">收件人</div>
                <button className="recipient-content">
                  <p className="recipient-name">請選擇收件人資料</p>
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>

          <BlackBtn btnText="前往結帳" href="/checkout/success" />
        </div>
      </form>
    </section>
  )
}
