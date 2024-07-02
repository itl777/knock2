import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { CHECKOUT_GET_CART, CHECKOUT_UPDATE_CART } from '@/configs/api-path'

const CartContext = createContext()

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children, loginMemberId }) => {
  const [checkoutItems, setCheckoutItems] = useState([])
  const [checkoutTotal, setCheckoutTotal] = useState(0)

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
      calculateTotal(cartItems.memberCart)
    } catch (error) {
      console.log('Error fetching member cart:', error)
    }
  }

  const calculateTotal = (items) => {
    let newCheckTotal = 0
    items.forEach((item) => {
      newCheckTotal += item.cart_product_quantity * item.price
    })
    setCheckoutTotal(newCheckTotal)
  }

  const handleQuantityChange = async (productId, newQuantity) => {
    const updatedItems = checkoutItems.map((item) =>
      item.product_id === productId
        ? { ...item, cart_product_quantity: newQuantity }
        : item
    )
    setCheckoutItems(updatedItems)
    calculateTotal(updatedItems)

    const itemToUpdate = updatedItems.find(
      (item) => item.product_id === productId
    )

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
  }, [loginMemberId])

  return (
    <CartContext.Provider
      value={{
        checkoutItems,
        checkoutTotal,
        fetchMemberCart,
        handleQuantityChange,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
