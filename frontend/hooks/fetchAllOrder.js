import { useState } from 'react'
import { ORDER_LIST_GET } from '@/configs/api-path'

const useFetchAllOrders = () => {
  const [allOrderData, setAllOrderData] = useState([])
  const [allOrderDetails, setAllOrderDetails] = useState([])
  const [totalPages, setTotalPages] = useState(1)

  const fetchAllOrders = async (member_id, order_status, page) => {
    try {
      const response = await fetch(
        `${ORDER_LIST_GET}?member_id=${member_id}&order_status_id=${order_status}&page=${page}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch order data')
      }

      const data = await response.json()

      console.log(data)
      setAllOrderData(data.orders) // 取得訂單資料
      setAllOrderDetails(data.orderDetails) // 取得訂單所有商品資料（圖片）
      setTotalPages(data.totalPages)
    } catch (error) {
      console.log('Error fetching orders:', error)
    }
  }

  return { allOrderData, allOrderDetails, totalPages, fetchAllOrders }
}

export default useFetchAllOrders
