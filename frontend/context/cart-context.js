import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './auth-context'
import { useSnackbar } from './snackbar-context'
import { useRouter } from 'next/router'

import {
  CHECKOUT_GET_CART,
  CHECKOUT_UPDATE_CART,
  CART_POST,
  CHECKOUT_GET_PROFILE,
} from '@/configs/api-path'

const CartContext = createContext()

export const useCart = () => {
  return useContext(CartContext)
}

// 取得 local storage KKDevice id
const getDeviceId = () => {
  let deviceId = localStorage.getItem('kkDeviceId')
  if (!deviceId) {
    deviceId = Date.now() + parseInt(Math.random() * 9998 + 1)
    localStorage.setItem('kkDeviceId', deviceId)
  }
  return deviceId
}

export const CartProvider = ({ children }) => {
  const { auth, authIsReady } = useAuth() // 取得 auth.id, authIsReady
  const router = useRouter()
  const { openSnackbar } = useSnackbar() // success toast
  const [checkoutItems, setCheckoutItems] = useState([]) // 購物車內容
  const [checkoutTotal, setCheckoutTotal] = useState(0) // 購物車總金額
  const [cartBadgeQty, setCartBadgeQty] = useState(0) // 購物車商品項目數量
  const [deliverFee, setDeliverFee] = useState(120)
  const [memberProfile, setMemberProfile] = useState([]) // 取得會員基本資料
    // order submit form 內容
    const [formData, setFormData] = useState({
      memberId: 0,
      recipientName: '',
      recipientMobile: '',
      recipientDistrictId: 1,
      recipientAddress: '',
      memberInvoice: 0,
      mobileInvoice: '',
      recipientTaxId: '',
      orderItems: [],
    })

  useEffect(() => {
    setCartBadgeQty(checkoutItems.length)
  }, [checkoutItems])


  // 取得會員基本資料
  const fetchMemberProfile = async () => {
    try {
      const response = await axios.get(
        `${CHECKOUT_GET_PROFILE}?member_id=${auth.id}`
      )
      if (response.data.status) {
        const results = response.data.rows[0]
        setMemberProfile(results)
        // 根據 profile 更新 formData
        setFormData((v) => ({
          ...v,
          mobileInvoice: results.invoice_carrier_id,
          recipientTaxId: results.tax_id,
        }))
      }
    } catch (error) {
      console.log('Error fetching member profile:', error)
    }
  }


  // 取得會員購物車 cart_member 資料
  const fetchMemberCart = async () => {
    const deviceId = +getDeviceId()
    const memberId = auth.id ? auth.id : deviceId

    try {
      const response = await fetch(`${CHECKOUT_GET_CART}?member_id=${memberId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch member cart')
      }

      const data = await response.json()
      setCheckoutItems(data.rows)
      calculateTotal(data.rows)
    } catch (error) {
      console.log('Error fetching member cart:', error)
    }
  }

  // 取得訂單總金額
  const calculateTotal = (items) => {
    let newCheckTotal = 0
    items.forEach((item) => {
      newCheckTotal += item.cart_product_quantity * item.price
    })
    setCheckoutTotal(newCheckTotal)

    newCheckTotal >= 1000 ? setDeliverFee(0) : setDeliverFee(120)
  }

  // 記錄商品數量異動
  const handleQuantityChange = async (productId, newQuantity) => {
    const updatedItems = checkoutItems.map((v) =>
      v.product_id === productId
        ? { ...v, cart_product_quantity: newQuantity }
        : v
    )

    const itemToUpdate = updatedItems.find((v) => v.product_id === productId)

    const deviceId = getDeviceId()
    const memberId = auth.id ? auth.id : deviceId

    try {
      const response = await axios.put(
        `${CHECKOUT_UPDATE_CART}/${itemToUpdate.cart_id}`,
        {
          member_id: memberId,
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

  // 點擊「加入購物車」（actionType = buy 直接購買 or add 加入購物車）
  const handleAddToCart = async (
    selectedProductId,
    selectedProductName,
    cartProductQuantity,
    actionType
  ) => {
    if (!cartProductQuantity || cartProductQuantity < 0) {
      alert('請選擇商品數量')
      return
    }

    const deviceId = +getDeviceId()
    const memberId = auth.id ? auth.id : deviceId

    try {
      const response = await axios.post(CART_POST, {
        memberId: memberId,
        productId: selectedProductId,
        cartQty: cartProductQuantity,
      })

      if (response.data.success) {
        fetchMemberCart()
        openSnackbar(
          `商品「${selectedProductName}」（共${cartProductQuantity}個）已加入購物車！`,
          'success'
        )
      } else {
        console.error('Failed to add item to cart')
      }
    } catch (error) {
      console.error('Error adding item to cart:', error)
    }

    if (actionType === 'buy') {
      window.location.href = '/checkout'
    }
  }

  // 初始化購物車
  const clearCart = () => {
    setCheckoutItems([])
    setCheckoutTotal(0)
    setDeliverFee(120)
    // localStorage.removeItem('kkCart')
  }

  // 登入後，更新 cart_member cart 將原本未登入的 device_id 改成 auth.id
  const handleLogin = async () => {
    const deviceId = +getDeviceId()
    const memberId = auth.id

    try {
      const updateResponse = await axios.post(
        'http://127.0.0.1:3001/checkout/api/update_cart',
        {
          memberId,
          deviceId,
        }
      )

      if (updateResponse.data.success) {
        console.log('Successfully updated cart_member_id')
        // Update auth state and fetch member cart
        // setAuth({ id: memberId })
        fetchMemberCart()
      } else {
        console.error('Failed to update cart_member_id')
      }
    } catch (error) {
      console.error('Failed to update cart_member_id')
    }
  }

  // 登入判斷
  useEffect(() => {
    if (router.isReady && authIsReady) {
      if (auth.id) {
        handleLogin()
        fetchMemberCart()
      }
      if (!auth.id) {
        clearCart()
        fetchMemberCart()
      }
    }
  }, [auth.id, router.isReady, authIsReady])

  return (
    <CartContext.Provider
      value={{
        checkoutItems,
        setCheckoutItems,
        cartBadgeQty,
        checkoutTotal,
        deliverFee,
        handleAddToCart,
        handleQuantityChange,
        clearCart,
        memberProfile,
        fetchMemberProfile,
        formData,
        setFormData,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
