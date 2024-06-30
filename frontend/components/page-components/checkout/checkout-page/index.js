// PAGE Checkout Page Body
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from './checkout-page.module.css'
import OrderItemCheckout from '../../orders/order-item-checkout'
import BlackBtn from '@/components/UI/black-btn'
import HDivider from '@/components/UI/divider/horizontal-divider'
import VDivider from '@/components/UI/divider/vertical-divider'
import RecipientButton from '../recipient-button'
import RecipientButtonSelected from '../recipient-button-selected'
import BasicModal from '@/components/UI/basic-modal'
import RecipientModalBody from '../recipient-modal-body'
import OrderInputBox from '../../orders/order-input-box'
import {
  PRODUCT_IMG,
  CHECKOUT_GET,
  CHECKOUT_POST,
  CHECKOUT_GET_CART,
  CHECKOUT_UPDATE_CART,
} from '@/configs/api-path'
import NoData from '@/components/UI/no-data'

export default function CheckOutPage() {
  const router = useRouter()
  const loginMemberId = 1 // 暫時性假資料，等登入功能做好再設定
  const [checkoutItems, setCheckoutItems] = useState([])
  const [memberAddress, setMemberAddress] = useState([])
  // 送出的表單欄位 insert into orders and order_details table
  const [formData, setFormData] = useState({
    memberId: loginMemberId,
    recipientName: '',
    recipientMobile: '',
    recipientDistrictId: 1,
    recipientAddress: '',
    paymentMethod: 'credit-card',
    memberInvoice: 0,
    mobileInvoice: '',
    recipientTaxId: '',
    orderItems: [],
  })

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
  // const [checkoutItems, setCheckoutItems] = useState(initialCheckoutItems)

  // 接收商品數量變化 (inputStepper > orderItemCheckout > CheckoutPage )
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

  // 取得會員地址
  const fetchMemberAddress = async () => {
    try {
      const response = await fetch(`${CHECKOUT_GET}?member_id=${loginMemberId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch member address')
      }

      const data = await response.json()
      console.log(data)
      const updatedMemberAddress = data.memberAddresses.map((v) => ({
        ...v,
        selected: false,
      }))

      // 取得預設地址（type='1'）
      const defaultAddress =
        updatedMemberAddress.find((v) => v.type == 1) || updatedMemberAddress[0]
      defaultAddress.selected = true

      const defaultIndex = updatedMemberAddress.findIndex(
        (v, i) => v.type === 1
      )

      setMemberAddress(updatedMemberAddress)

      console.log('updatedMemberAddress', updatedMemberAddress)
    } catch (error) {
      console.log('Error member address:', error)
    }
  }

  useEffect(() => {
    fetchMemberAddress()
  }, [loginMemberId])

  // 更新已經選擇的地址
  const handleAddressSelected = (address) => {
    setMemberAddress(address)
    console.log('CheckOutPage receive selected address array: ', address)
  }

  // 控制表單輸入欄位，更新 formData
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // 送出表單
  const handleSubmit = async (e) => {
    e.preventDefault()
    // 取得收件人資料
    const recipientData = memberAddress.filter((v) => v.selected === true)
    console.log('recipientData', recipientData)

    // 將 checkoutItems 轉換為 orderItems 格式
    const orderItems = checkoutItems.map((item) => ({
      productId: item.product_id,
      productOriginalPrice: item.price,
      orderQty: item.cart_product_quantity,
    }))

    const dataToSubmit = {
      ...formData,
      recipientName: recipientData[0].recipient_name, // 收件人姓名
      recipientMobile: recipientData[0].mobile_phone, // 收件人手機號碼
      recipientDistrictId: recipientData[0].district_id, // 收件人區域 ID
      recipientAddress: recipientData[0].address, // 收件人地址
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

  // 關閉 recipientModalBody
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
          {/* OrderItemCheckout */}
          <div className={styles.itemList}>
            {checkoutItems.length === 0 ? (
              <NoData />
            ) : (
              checkoutItems.map((v, i) => (
                <OrderItemCheckout
                  key={v.product_id}
                  cartId={v.cart_id}
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
          </div>

          {/* 訂單金額 */}
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

        <VDivider margin="2rem 0" />
        {/* RIGHT RECIPIENT INFO START */}
        <div className={styles.checkoutRight}>
          <h5>收件資料</h5>

          {/* RecipientButton */}
          <div className={styles.checkoutRightMain}>
            {memberAddress.length === 0 ? (
              <RecipientButton onClick={openModal} />
            ) : (
              memberAddress
                .filter((v) => v.selected === true)
                .map((address) => (
                  <RecipientButtonSelected
                    key={address.id}
                    recipientName={address.recipient_name}
                    recipientMobile={address.mobile_phone}
                    address={address.address}
                    onClick={openModal}
                  />
                ))
            )}

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

      {/* RecipientModalBody */}
      <BasicModal
        modalTitle="請選擇收件人資料"
        open={isModalOpen}
        handleClose={closeModal}
        modalBody={
          <RecipientModalBody
            handleClose={closeModal}
            memberId={loginMemberId}
            memberAddress={memberAddress}
            fetchMemberAddress={fetchMemberAddress}
            onSelectedAddress={handleAddressSelected}
          />
        }
      />
    </section>
  )
}
