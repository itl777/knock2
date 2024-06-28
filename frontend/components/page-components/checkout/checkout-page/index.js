// pages/checkout-page.jsx
import React, { useState } from 'react'
import styles from './checkout-page.module.css'
import FilterBtn from '@/components/UI/filter-btn'
import OrderItemCheckout from '../../orders/order-item-checkout'
import BlackBtn from '@/components/UI/black-btn'
import HDivider from '@/components/UI/divider/horizontal-divider'
import VDivider from '@/components/UI/divider/vertical-divider'
import RecipientButton from '../../orders/recipient-button'
import RecipientButtonSelected from '../../orders/recipient-button-selected'
import BasicModal from '@/components/UI/basic-modal'
import RecipientModalBody from '../../orders/recipient-modal-body'
import AddRecipientModalBody from '../../orders/add-recipient-modal-body'

export default function CheckOutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddRecipientModalOpen, setIsAddRecipientModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openAddRecipientModal = () => {
    setIsAddRecipientModalOpen(true)
  }

  const closeAddRecipientModal = () => {
    setIsAddRecipientModalOpen(false)
  }

  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.h2Style}>結帳</h2>
      <form className={styles.contentContainer}>
        {/* LEFT ORDER INFO START */}
        <div className={styles.checkoutLeft}>
          <h5>訂購資訊</h5>

          <div className={styles.itemList}>
            <OrderItemCheckout
              productName="哈利波特的奶油啤酒"
              productOriginalPrice={1000}
              productDiscountedPrice={800}
              productImg=""
              orderQty="1"
            />

            <OrderItemCheckout
              productName="桌遊名稱"
              productOriginalPrice={1000}
              productDiscountedPrice={800}
              productImg=""
              orderQty="1"
            />
          </div>

          <FilterBtn btnText="使用優惠券" margin="2rem 0" />

          <div className={styles.totalBox}>
            <div className={styles.totalRow}>
              <p>小計</p>
              <p>$1000</p>
            </div>
            <div className={styles.totalRow}>
              <p>折扣</p>
              <p>$1000</p>
            </div>
            <div className={styles.totalRow}>
              <p>運費</p>
              <p>$1000</p>
            </div>
            <HDivider margin="1rem 0" />
            <div className={styles.totalRow}>
              <p>合計</p>
              <p>$1000</p>
            </div>
          </div>
        </div>
        {/* LEFT ORDER INFO END */}

        <VDivider margin="2rem 0" />

        {/* RIGHT RECIPIENT INFO START */}
        <div className={styles.checkoutRight}>
          <h5>收件資料</h5>

          <div className={styles.checkoutRightMain}>
            <RecipientButton onClick={openModal} />
            <RecipientButtonSelected onClick={openModal} />
          </div>

          <BlackBtn btnText="前往結帳" href="/checkout/success" />
        </div>
      </form>

      <BasicModal
        modalTitle="請選擇收件人資料"
        open={isModalOpen}
        handleClose={closeModal}
        modalBody={<RecipientModalBody handleClose={closeModal} openAddRecipientModal={openAddRecipientModal} />}
      />
      
      <BasicModal
        modalTitle="新增收件人資料"
        open={isAddRecipientModalOpen}
        handleClose={closeAddRecipientModal}
        modalBody={<AddRecipientModalBody handleClose={closeAddRecipientModal} />}
      />
      
    </section>
  )
}
