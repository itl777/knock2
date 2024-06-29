// PAGE Checkout Page Body
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from './checkout-page.module.css'
import FilterBtn from '@/components/UI/filter-btn'
import OrderItemCheckout from '../../orders/order-item-checkout'
import BlackBtn from '@/components/UI/black-btn'
import HDivider from '@/components/UI/divider/horizontal-divider'
import VDivider from '@/components/UI/divider/vertical-divider'
import RecipientButton from '../recipient-button'
import RecipientButtonSelected from '../recipient-button-selected'
import BasicModal from '@/components/UI/basic-modal'
import RecipientModalBody from '../recipient-modal-body'
import OrderInputBox from '../../orders/order-input-box'
import { PRODUCT_IMG, CHECKOUT_POST } from '@/configs/api-path'

export default function CheckOutPage() {
  const router = useRouter()
  
  const checkoutItems = [
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

  const [formData, setFormData] = useState({
    memberId: 1,
    recipientName: '假資料測試',
    recipientMobile: '0900000000',
    recipientDistrictId: 1,
    recipientAddress: '自由路49號',
    paymentMethod: 'credit-card',
    memberInvoice: 0,
    mobileInvoice: '',
    recipientTaxId: '',
    orderItems: [],
  })


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 將 checkoutItems 轉換為 orderItems 格式
    const orderItems = checkoutItems.map((item) => ({
      productId: item.product_id,
      productOriginalPrice: item.order_unit_price,
      orderQty: item.order_quantity,
    }))

    const dataToSubmit = {
      ...formData,
      orderItems, // 將 orderItems 加入到要提交的數據中
    }

    try {
      const response = await axios.post(CHECKOUT_POST, dataToSubmit)
      console.log(response.data)
      if (response.data.success) {
        router.push('/checkout/success') // 跳轉至付款成功畫面
      }
    } catch (error) {
      console.error('提交表單時出錯', error)
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.h2Style}>結帳</h2>

      <form
        name="checkoutForm"
        onSubmit={handleSubmit}
        className={styles.contentContainer}
      >
        {/* LEFT ORDER INFO START */}
        <div className={styles.checkoutLeft}>
          <h5>訂購資訊</h5>

          <div className={styles.itemList}>
            {checkoutItems.map((v, i) => (
              <OrderItemCheckout
                key={i}
                productId={v.product_id}
                productName={v.product_name}
                productOriginalPrice={v.order_unit_price}
                productDiscountedPrice={v.order_unit_price}
                productImg={`${PRODUCT_IMG}/${v.product_img}`}
                orderQty={v.order_quantity}
              />
            ))}
          </div>
        </div>

        <VDivider margin="2rem 0" />

        {/* RIGHT RECIPIENT INFO START */}
        <div className={styles.checkoutRight}>
          <h5>收件資料</h5>

          <div className={styles.checkoutRightMain}>
            <RecipientButton onClick={openModal} />
            <RecipientButtonSelected onClick={openModal} />

            <OrderInputBox
              name="invoiceType"
              label="發票形式"
              value={formData.invoiceType}
              onChange={handleInputChange}
            />
            <OrderInputBox
              name="mobileInvoice"
              label="手機載具"
              value={formData.mobileInvoice}
              onChange={handleInputChange}
            />
            <OrderInputBox
              name="paymentMethod"
              label="付款方式"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            />
          </div>

          <BlackBtn
            btnText="前往結帳"
            type="submit"
            href={null}
            paddingType="medium"
          />
        </div>
      </form>

      <BasicModal
        modalTitle="請選擇收件人資料"
        open={isModalOpen}
        handleClose={closeModal}
        modalBody={
          <RecipientModalBody
            handleClose={closeModal}
            memberId={formData.memberId}
          />
        }
      />
    </section>
  )
}


{
  /* <FilterBtn btnText="使用優惠券" margin="2rem 0" />

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
</div> */
}
