import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './auth-context'
import {
  CHECKOUT_GET_CART,
  CHECKOUT_UPDATE_CART,
  CART_POST,
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
  const { auth } = useAuth() // 取得 auth.id
  const [checkoutItems, setCheckoutItems] = useState([]) // 購物車內容
  const [checkoutTotal, setCheckoutTotal] = useState(0) // 購物車總金額
  const [cartBadgeQty, setCartBadgeQty] = useState(0) // 購物車商品項目數量

  useEffect(() => {
    setCartBadgeQty(checkoutItems.length)
  }, [checkoutItems])

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
      newCheckTotal += item.cart_product_quantity * item.price // 這裡假設每個項目都有 price
    })
    setCheckoutTotal(newCheckTotal)
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
        alert(
          `成功加入購物車！！商品：${selectedProductId}，數量：${cartProductQuantity}`
        )
      } else {
        console.error('Failed to add item to cart')
      }
    } catch (error) {
      console.error('Error adding item to cart:', error)
    }

    if (actionType === 'buy') {
      if (auth.id) {
        window.location.href = '/checkout'
      } else {
        alert('請先登入')
      }
    }
  }

  // 初始化購物車
  const clearCart = () => {
    setCheckoutItems([])
    setCheckoutTotal(0)
    // localStorage.removeItem('kkCart')
  }

  // 登入後，更新 cart_member cart member_id > auth.id
  const handleLogin = async () => {
    if (!auth.id) {
      return
    }

    const deviceId = +getDeviceId()
    const memberId = auth.id

    try {
      const updateResponse = await axios.post(
        'http://127.0.0.1:3001/checkout/api/update_member',
        {
          memberId,
          deviceId,
        }
      )

      if (updateResponse.data.success) {
        console.log('Successfully updated cart_member_id')
        // Update auth state and fetch member cart
        setAuth({ id: memberId })
        fetchMemberCart()
      } else {
        console.error('Failed to update cart_member_id')
      }
    } catch (error) {
      console.error('Failed to update cart_member_id')
    }
  }

  useEffect(() => {
    fetchMemberCart()

    if (auth.id) {
      // moveLocalStorageItemsToCart()
      handleLogin()
    }
  }, [auth.id])

  return (
    <CartContext.Provider
      value={{
        checkoutItems,
        setCheckoutItems,
        checkoutTotal,
        cartBadgeQty,
        handleAddToCart,
        handleQuantityChange,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// const moveLocalStorageItemsToCart = async () => {
//   try {
//     // 獲取 guest cart 資料
//     let guestCart = JSON.parse(localStorage.getItem('kkCart')) || []

//     // 合併 guest cart 到 member cart
//     if (guestCart.length > 0) {
//       const response = await axios.post(`${CART_POST}/merge`, {
//         memberId: auth.id,
//         guestCart: guestCart,
//       })

//       if (response.data.success) {
//         // 清空 guest cart
//         localStorage.removeItem('kkCart')
//       } else {
//         console.error('Failed to merge guest cart to member cart')
//       }
//     }
//   } catch (error) {
//     console.error('Error adding item to cart:', error)
//   }
// }
