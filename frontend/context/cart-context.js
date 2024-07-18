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
  GET_MEMBER_COUPON,
  UPDATE_MEMBER_COUPON_IN_CART,
  GET_MEMBER_COUPON_IN_CART,
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
  const [checkoutTotal, setCheckoutTotal] = useState(0) // 購物車總金額(含運費)
  const [discountTotal, setDiscountTotal] = useState(0) // 購物車總金額
  const [subtotal, setSubtotal] = useState(0) // 購物車總金額
  const [cartBadgeQty, setCartBadgeQty] = useState(0) // 購物車商品項目數量
  const [deliverFee, setDeliverFee] = useState(120)
  const [memberProfile, setMemberProfile] = useState([]) // 取得會員基本資料
  const [coupons, setCoupons] = useState([]) // 取得會員可使用優惠券
  const [usableCoupons, setUsableCoupons] = useState([]) // 取得會員可使用優惠券
  const [selectedCoupons, setSelectedCoupons] = useState([]) // 購物車使用的優惠券

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

  // 取得會員優惠券
  const fetchMemberCoupons = async () => {
    try {
      const response = await axios.get(
        `${GET_MEMBER_COUPON}?member_id=${auth.id}&page=1&status=ongoing`
      )
      setCoupons(response.data.rows)
    } catch (error) {
      console.error('Error fetching member coupons: ', error)
    }
  }

  // 取得會員購物車優惠券
  const fetchMemberCartCoupons = async () => {
    try {
      const response = await axios.get(
        `${GET_MEMBER_COUPON_IN_CART}?member_id=${auth.id}`
      )
      setSelectedCoupons(response.data.rows)
    } catch (error) {
      console.error('Error fetching member coupons: ', error)
    }
  }

  // 新增刪除會員購物車優惠券
  const handelSelectedToggle = async (coupon_id) => {
    try {
      await axios.post(UPDATE_MEMBER_COUPON_IN_CART, {
        member_id: auth.id,
        coupon_id: coupon_id,
      })
      fetchMemberCartCoupons()
      console.log('handelSelectedToggle')
    } catch (error) {
      console.error('Error updating coupons:', error)
    }
  }

  // 取得訂單總金額
  const calculateTotal = (items) => {
    let newCheckTotal = 0
    items.forEach((item) => {
      newCheckTotal += item.cart_product_quantity * item.price
    })

    newCheckTotal >= 1000 ? setDeliverFee(0) : setDeliverFee(120)
    setSubtotal(newCheckTotal)
    setCheckoutTotal(newCheckTotal + deliverFee - discountTotal)
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

  // 取得折扣金額
  const requirementChecked = () => {
    setDiscountTotal(0)
    let discountTotal = 0
    let specificDiscountTotal = 0
    let excludedTotal = 0

    selectedCoupons.forEach((v) => {
      if (v.coupon_type_id === 2) {
        // 指定商品
        // 檢查是否有符合的產品
        const eligibleProducts = checkoutItems.filter((item) =>
          v.products.some((p) => p.product_id === item.product_id)
        )

        // 計算符合優惠券條件的總價
        const eligibleTotal = eligibleProducts.reduce(
          (total, item) => total + item.price * item.cart_product_quantity,
          0
        )

        // 符合最低訂單金額
        if (eligibleTotal >= v.minimum_order) {
          if (v.discount_amount && eligibleTotal >= v.discount_amount) {
            specificDiscountTotal += v.discount_amount
          } else if (v.discount_percentage) {
            // 計算百分比
            const percentageSpecificDiscount = Math.floor(
              eligibleTotal * (1 - v.discount_percentage / 100)
            )
            specificDiscountTotal += percentageSpecificDiscount
          }
          if (v.discount_max) {
            specificDiscountTotal = Math.min(
              specificDiscountTotal,
              v.discount_max
            )
          }
          excludedTotal += eligibleTotal // 排除符合指定商品優惠券的商品總額
        }
      }
    })

    // 計算所有商品的折扣時排除符合指定商品優惠券的商品
    const adjustedSubtotal = subtotal - excludedTotal

    selectedCoupons.forEach((v) => {
      if (v.coupon_type_id === 1) {
        // 所有商品皆可以折扣
        if (adjustedSubtotal >= v.minimum_order) {
          // 所有商品大於最低總額
          if (v.discount_amount && adjustedSubtotal >= v.discount_amount) {
            discountTotal += v.discount_amount
          } else if (v.discount_percentage) {
            // 計算百分比
            const percentageDiscount = Math.floor(
              adjustedSubtotal * (1 - v.discount_percentage / 100)
            )
            discountTotal += percentageDiscount
          }
          if (v.discount_max) {
            discountTotal = Math.min(discountTotal, v.discount_max)
          }
        }
      }
    })

    setDiscountTotal(discountTotal + specificDiscountTotal)
    setCheckoutTotal(
      subtotal + deliverFee - discountTotal - specificDiscountTotal
    )
  }

  const deleteSelectedCoupon = async (coupon_id) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/coupons/delete_in_cart',
        {
          member_id: auth.id,
          coupon_id: coupon_id,
        }
      )
      console.log('Unusable coupons updated successfully:', response.data)
    } catch (error) {
      console.error('Error updating unusable coupons:', error)
    }
  }

  const couponChecked = () => {
    const updatedCoupons = coupons.map((coupon) => {
      let discountTotal = 0
      let specificTotal = 0 // 符合 coupon_type_id = 2 的商品總價
      let excludedTotal = 0 // 用於排除已計算的商品總價
      let usable = true // 初始假定可用

      if (coupon.coupon_type_id === 1) {
        // 所有商品皆可折扣

        // 檢查是否符合最低訂單金額條件
        if (subtotal < coupon.minimum_order) {
          usable = false // 不符合條件，設為不可用
          deleteSelectedCoupon(coupon.coupon_id)
        }

        // 檢查折扣金額
        if (coupon.discount_amount && subtotal >= coupon.minimum_order) {
          discountTotal += coupon.discount_amount
        }

        // 檢查折扣百分比
        if (coupon.discount_percentage && subtotal >= coupon.minimum_order) {
          const percentageDiscount = Math.floor(
            subtotal * (coupon.discount_percentage / 100)
          )
          discountTotal += percentageDiscount
        }
      }

      if (coupon.coupon_type_id === 2) {
        // 指定商品

        // 檢查是否有符合的產品
        const eligibleProducts = checkoutItems.filter((item) =>
          coupon.products.some((p) => p.product_id === item.product_id)
        )

        // 計算符合優惠券條件的總價
        const eligibleTotal = eligibleProducts.reduce(
          (total, item) => total + item.price * item.cart_product_quantity,
          0
        )

        // 符合指定商品的最低訂單金額條件
        if (eligibleTotal < coupon.minimum_order) {
          usable = false // 不符合條件，設為不可用
          deleteSelectedCoupon(coupon.coupon_id)
        }

        // 計算 specificTotal，用於後續計算 coupon_type_id = 1 的 subtotal
        specificTotal += eligibleTotal

        // 檢查折扣金額
        if (coupon.discount_amount && eligibleTotal >= coupon.minimum_order) {
          specificTotal -= coupon.discount_amount
        }

        // 檢查折扣百分比
        if (
          coupon.discount_percentage &&
          eligibleTotal >= coupon.minimum_order
        ) {
          const percentageSpecificDiscount = Math.floor(
            eligibleTotal * (coupon.discount_percentage / 100)
          )
          specificTotal -= percentageSpecificDiscount
        }
      }

      // 如果已經選擇了優惠券，檢查剩餘的 coupon_id 是否仍滿足 minimum_order 條件
      if (
        selectedCoupons.length > 0 &&
        selectedCoupons.some(
          (selected) => selected.coupon_id !== coupon.coupon_id
        )
      ) {
        // 模擬已經選擇的優惠券對應的商品總價（adjustedSubtotal）
        const adjustedSubtotal = subtotal - specificTotal

        // 如果這個 coupon 仍不符合條件，設置為不可用
        if (
          coupon.coupon_type_id === 1 &&
          adjustedSubtotal < coupon.minimum_order
        ) {
          usable = false
          deleteSelectedCoupon(coupon.coupon_id)
        }

        if (
          coupon.coupon_type_id === 2 &&
          specificTotal < coupon.minimum_order
        ) {
          usable = false
          deleteSelectedCoupon(coupon.coupon_id)
        }
      }

      // 返回更新後的 coupon 對象，包含 usable 屬性
      return {
        ...coupon,
        usable,
      }
    })
    setUsableCoupons(updatedCoupons)
  }


  // 登入後，更新 cart_member cart 將原本未登入的 device_id 改成 auth.id
  const handleLogin = async () => {
    const deviceId = +getDeviceId()
    const memberId = auth.id

    try {
      const updateResponse = await axios.post(
        'http://localhost:3001/checkout/api/update_cart',
        {
          memberId,
          deviceId,
        }
      )

      if (updateResponse.data.success) {
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
        fetchMemberCoupons()
        fetchMemberCartCoupons()
        couponChecked()
      }
      if (!auth.id) {
        clearCart()
        fetchMemberCart()
      }
    }
  }, [auth.id, router.isReady, authIsReady])

  useEffect(() => {
    setCartBadgeQty(checkoutItems.length)
    couponChecked()
  }, [checkoutItems])

  useEffect(() => {
    couponChecked()
    requirementChecked()
  }, [subtotal, checkoutItems])

  useEffect(() => {
    couponChecked()
    requirementChecked()
  }, [selectedCoupons])

  return (
    <CartContext.Provider
      value={{
        checkoutItems,
        setCheckoutItems,
        cartBadgeQty,
        subtotal,
        deliverFee,
        checkoutTotal,
        discountTotal,
        setDiscountTotal,
        coupons,
        selectedCoupons,
        usableCoupons,
        setSelectedCoupons,
        fetchMemberCoupons,
        fetchMemberCartCoupons,
        handelSelectedToggle,
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

// const deleteSelectedCoupon = async ()=> {
//   // 篩選出不可用的優惠券
//   const unusableCoupons = usableCoupons.filter((coupon) => !coupon.usable)

//   // 構造要傳送給後端的數據
//   const dataToSend = {
//     member_id: auth.id, // 替換成你的會員 ID
//     coupon_ids: unusableCoupons.map((coupon) => coupon.coupon_id),
//   }

//   if (dataToSend.length > 0) {
//     try {
//       const response = await axios.post(
//         'http://localhost:3001/coupons/delete_in_cart',
//         dataToSend
//       )
//       console.log('Unusable coupons updated successfully:', response.data)
//     } catch (error) {
//       console.error('Error updating unusable coupons:', error)
//     }
//   }
// }
