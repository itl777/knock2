import React from 'react'
import Link from 'next/link'
import styles from './order-detail-cards.module.css'
import { FaArrowLeftLong } from 'react-icons/fa6'
import FilterBtn from '@/components/UI/filter-btn'
import OrderStatusTag from '../order-status-tag'

export default function OrderDetailCards() {
  return (
    <div className={styles.orderDetailBox}>
      <Link className={styles.orderDetailHeader} href="/user/orders/ongoing">
        <div className={styles.titleBox}>
          <FaArrowLeftLong />
          <h5>訂單明細</h5>
        </div>
        <FilterBtn btnText="發票" href="https://mui.com/" />
      </Link>

      <div className="horizontalDividerS" />
      <div className={styles.orderDetailContent}>
        <div className={styles.orderDetailLeft}>
          <div className="itemBoxS">
            <div className="itemImgBoxS">
              <img src="/products/p1.png" alt="" />
            </div>
            <div className="itemInfoS">
              <p className="product-name">決戰大富翁</p>
              <div className="itemQtyPriceBoxS">
                <p>x 1</p>
                <div className="itemPriceS">
                  <p>$720</p>
                  <small>$800</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.orderDetailRight}>
          <div className={styles.orderInfoBox}>
            <div className={styles.orderInfoRow}>
              <p>訂單日期</p>
              <p>2024.05.22</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>訂單編號</p>
              <p>202405220001</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>總金額</p>
              <p>$ 32,000</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>付款方式</p>
              <p>信用卡</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>付款時間</p>
              <p>2024.05.22 16:30:30</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>地址</p>
              <p>台北市大安區天堂路38號</p>
            </div>
            <div className={styles.orderInfoRow}>
              <p>到貨時間</p>
              <p>2024.05.25 16:30:30</p>
            </div>
            <OrderStatusTag status="ongoing" />
          </div>

          <div className={styles.orderReviewHintBox}>
            <img src="/ghost/ghost_05.png" alt="" />
            <div className={styles.orderReviewDialog}>
              <p>
                喜歡您的商品嗎？
                <br />
                請留下您大大的讚賞！
              </p>
              <FilterBtn btnText="評價" href="https://mui.com/" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
