import { useEffect, useState } from 'react'
import axios from 'axios'
import { ORDER_DETAILS_GET } from '@/configs/api-path'

const useFetchOrderData = (orderId, shouldFetch = true) => {
  const [orderData, setOrderData] = useState()
  const [orderDetails, setOrderDetails] = useState([])
  const [fetchTrigger, setFetchTrigger] = useState(shouldFetch) // 新增的觸發器狀態
  const [anyReviewed, setAnyReviewed] = useState(false)

  useEffect(() => {
    if (fetchTrigger && orderId) {
      const fetchOrderData = async () => {
        try {
          const response = await axios.get(`${ORDER_DETAILS_GET}/${orderId}`)
          if (response.data.status) {
            setOrderData(response.data.orders[0])
            setOrderDetails(response.data.orderDetails)

            // 檢查是否有任一 review_status 為 1
            const anyReviewed = response.data.orderDetails.find(
              (v) => v.review_status == 1
            )
            setAnyReviewed(!!anyReviewed)

          }
        } catch (error) {
          console.error('Error fetching order data:', error)
        }
      }
      fetchOrderData()
      setFetchTrigger(false) // 當觸發完畢後，設置為 false，避免重複觸發
    }
    console.log('anyReviewed', anyReviewed);
  }, [orderId, fetchTrigger]) // 監聽 fetchTrigger 變化

  return { orderData, orderDetails, setFetchTrigger, anyReviewed } // 返回 setFetchTrigger 以便在需要時手動觸發重新抓取
}

export default useFetchOrderData
