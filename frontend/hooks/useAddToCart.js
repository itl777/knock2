import axios from 'axios'
import { CART_POST, CART_GUEST_POST } from '@/configs/api-path'


const getDeviceId = () => {
  let deviceId = localStorage.getItem('kkDeviceId');
  if (!deviceId) {
    deviceId = Date.now() + parseInt(Math.random() * 9998 + 1);
    localStorage.setItem('kkDeviceId', deviceId);
  }
  return deviceId;
};

const useAddToCart = (dbData, loginMemberId) => {
  const handleBuyClick = async () => {
    if (!loginMemberId) {
      console.log('未登入')
      const kkDeviceId = localStorage.getItem('kkDeviceId')
      // 未登入時存入 localStorage
      const guestCart = JSON.parse(localStorage.getItem('kkCart')) || []
      const existingItemIndex = guestCart.findIndex(
        (i) => i.productId === dbData.product_id
      )

      if (existingItemIndex > -1) {
        // 若 product_id 已存在，增加 cartQty
        guestCart[existingItemIndex].cartQty += 1
      } else {
        // 若 product_id 不存在，新增項目
        guestCart.push({
          deviceId: kkDeviceId,
          productId: dbData.product_id,
          cartQty: 1,
        })
      }

      localStorage.setItem('kkCart', JSON.stringify(guestCart))

      // 未登入時存入 cart_guest table
      try {
        const existingItem = guestCart.find(i => i.productId === dbData.product_id);
        const response = await axios.post(CART_GUEST_POST, {
          deviceId: kkDeviceId,
          productId: existingItem.productId,
          cartQty: existingItem.cartQty,
        })
        if (response.data.success) {
          console.log('Insert into cart_guest successfully')
        } else {
          console.error('Insert into cart_guest failed')
        }
      } catch (error) {
        console.error('Insert into cart_guest error:', error)
      }

      // window.location.href = '/#'
    } else {
      // 登入時存入 cart_member 表
      try {
        const response = await axios.post(CART_POST, {
          memberId: loginMemberId,
          productId: dbData.product_id,
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
    }
  }

  return { handleBuyClick }
}



const useLogin = () => {
  const handleLogin = async (loginData) => {
    try {
      const response = await axios.post('/api/login', loginData)
      if (response.data.success) {
        const memberId = response.data.memberId

        // 取得 localStorage 中的 cart items
        const guestCart = JSON.parse(localStorage.getItem('kkCart')) || []

        if (guestCart.length > 0) {
          // insert cart items into member's cart_member
          await axios.post('/api/cart/merge', { memberId, guestCart })

          // remove cart items from local storage
          localStorage.removeItem('kkCart')
        }

        // after login... go to...
        window.location.href = '/checkout'
      }
    } catch (error) {
      console.error('登入異常', error)
    }
  }

  return { handleLogin }
}

export { useAddToCart, useLogin, getDeviceId }
