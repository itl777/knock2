import { useEffect, useState } from 'react'
import axios from 'axios'
import { ORDER_DETAILS_GET } from '@/configs/api-path'

const useFetchOrderData = (orderId) => {
  const [orderData, setOrderData] = useState({})
  const [orderDetails, setOrderDetails] = useState([])

  useEffect(() => {
    if (orderId) {
      const fetchOrderData = async () => {
        try {
          const response = await axios.get(`${ORDER_DETAILS_GET}/${orderId}`)
          if (response.data.status) {
            setOrderData(response.data.orders[0])
            setOrderDetails(response.data.orderDetails)
          }
        } catch (error) {
          console.error('Error fetching order data:', error)
        }
      }
      fetchOrderData()
    }
  }, [orderId])

  return { orderData, orderDetails }
}

export default useFetchOrderData
