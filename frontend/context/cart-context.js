import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAuth, authState } from './auth-context'
import {
  CHECKOUT_GET_CART,
  CHECKOUT_UPDATE_CART,
  CART_GUEST_GET,
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
  const { auth, authState } = useAuth() // 取得 auth.id, authState

  const [checkoutItems, setCheckoutItems] = useState([]) // 購物車內容
  const [checkoutTotal, setCheckoutTotal] = useState(0) // 購物車總金額

  // 取得會員購物車 cart_member 資料
  const fetchMemberCart = async () => {
    try {
      const response = await fetch(`${CHECKOUT_GET_CART}?member_id=${auth.id}`)

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

    // 如果有登入，更新 cart_member table data
    if (auth.id) {
      const itemToUpdate = updatedItems.find((v) => v.product_id === productId)

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
    } else {
      // 如果沒有登入，更新 kkCart local storage data
      if (newQuantity === 0) {
        const newCheckoutItems = updatedItems.filter(
          (item) => item.product_id !== productId
        )
        localStorage.setItem('kkCart', JSON.stringify(newCheckoutItems))
        setCheckoutItems(newCheckoutItems)
        calculateTotal(newCheckoutItems)
      } else {
        const newCheckoutItems = updatedItems.map((item) =>
          item.product_id === productId
            ? { ...item, cart_product_quantity: newQuantity }
            : item
        )
        localStorage.setItem('kkCart', JSON.stringify(newCheckoutItems))
        setCheckoutItems(newCheckoutItems)
        calculateTotal(newCheckoutItems)
      }
    }
  }

  // 取得 local storage kkCart 的 product details
  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `${CART_GUEST_GET}?product_id=${productId}`
      )
      if (response.data.status) {
        return response.data.rows[0]
      } else {
        throw new Error('Failed to fetch product details')
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
      return null
    }
  }

  // 點擊「直接購買」
  const handleBuyClick = async (selectedProductId) => {
    // 有登入
    if (auth.id) {
      try {
        const response = await axios.post(CART_POST, {
          memberId: auth.id,
          productId: selectedProductId,
          cartQty: 1,
        })
        if (response.data.success) {
          window.location.href = '/checkout'
        } else {
          console.error('Failed to add item to cart')
        }
      } catch (error) {
        console.error('Error adding item to cart:', error)
      }
    } else {
      // 「沒」有登入
      const kkDeviceId = getDeviceId()
      let guestCart = JSON.parse(localStorage.getItem('kkCart')) || []
      const existingItemIndex = guestCart.findIndex(
        (v) => v.product_id === selectedProductId
      )

      // local storage 已存在此商品
      if (existingItemIndex > -1) {
        guestCart[existingItemIndex].cart_product_quantity += 1
      } else {
        // local storage 「不」存在此商品
        guestCart.push({
          // deviceId: kkDeviceId,
          product_id: selectedProductId,
          cart_product_quantity: 1,
        })
      }

      // 更新 localStorage
      localStorage.setItem('kkCart', JSON.stringify(guestCart))

      // 取得商品完整訊息並更新 checkoutItems
      const productDetails = await fetchProductDetails(selectedProductId)
      if (productDetails) {
        if (existingItemIndex > -1) {
          const updatedCheckoutItems = checkoutItems.map((item) =>
            item.product_id === selectedProductId
              ? {
                  ...item,
                  cart_product_quantity: item.cart_product_quantity + 1,
                }
              : item
          )
          setCheckoutItems(updatedCheckoutItems)
          calculateTotal(updatedCheckoutItems)
        } else {
          const newProductItem = {
            product_id: productDetails.product_id,
            product_name: productDetails.product_name,
            price: productDetails.price,
            product_img: productDetails.product_img,
            cart_product_quantity: 1,
          }

          const updatedCheckoutItems = [...checkoutItems, newProductItem]
          setCheckoutItems(updatedCheckoutItems)
          calculateTotal(updatedCheckoutItems)
        }
      }
    }
  }

  // 點擊「加入購物車」
  const handleAddToCart = async (selectedProductId, cartProductQuantity) => {
    if (auth.id) {
      try {
        const response = await axios.post(CART_POST, {
          memberId: auth.id,
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
    } else {
      // 「沒」有登入
      let guestCart = JSON.parse(localStorage.getItem('kkCart')) || []
      const existingItemIndex = guestCart.findIndex(
        (v) => v.product_id === selectedProductId
      )

      // local storage 已存在此商品
      if (existingItemIndex > -1) {
        guestCart[existingItemIndex].cart_product_quantity += 1
      } else {
        // local storage 「不」存在此商品
        guestCart.push({
          // deviceId: kkDeviceId,
          product_id: selectedProductId,
          cart_product_quantity: 1,
        })
      }

      // 更新 localStorage
      localStorage.setItem('kkCart', JSON.stringify(guestCart))

      // 取得商品完整訊息並更新 checkoutItems
      const productDetails = await fetchProductDetails(selectedProductId)
      if (productDetails) {
        if (existingItemIndex > -1) {
          const updatedCheckoutItems = checkoutItems.map((item) =>
            item.product_id === selectedProductId
              ? {
                  ...item,
                  cart_product_quantity: item.cart_product_quantity + 1,
                }
              : item
          )
          setCheckoutItems(updatedCheckoutItems)
          calculateTotal(updatedCheckoutItems)
        } else {
          const newProductItem = {
            product_id: productDetails.product_id,
            product_name: productDetails.product_name,
            price: productDetails.price,
            product_img: productDetails.product_img,
            cart_product_quantity: 1,
          }

          const updatedCheckoutItems = [...checkoutItems, newProductItem]
          setCheckoutItems(updatedCheckoutItems)
          calculateTotal(updatedCheckoutItems)
        }
      }
    }
  }

  // 初始化購物車
  const clearCart = () => {
    setCheckoutItems([])
    setCheckoutTotal(0)
    localStorage.removeItem('kkCart')
  }

  useEffect(() => {
    if (auth.id) {
      fetchMemberCart()
      console.log('cart context: auth.id & authState', auth.id, authState)
    } else {
      clearCart()
      console.log('cart context: auth.id & authState ', auth.id, authState)
    }
  }, [auth.id])

  return (
    <CartContext.Provider
      value={{
        checkoutItems,
        setCheckoutItems,
        checkoutTotal,
        handleBuyClick,
        handleAddToCart,
        handleQuantityChange,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
