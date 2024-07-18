import { useEffect, useState } from 'react'
import axios from 'axios'
import { ORDER_DETAILS_GET } from '@/configs/api-path'

const useFetchOrderData = () => {
  const [order, setOrder] = useState([])
  const [detail, setDetail] = useState([])
  // const [fetchTrigger, setFetchTrigger] = useState(shouldFetch) // 新增的觸發器狀態
  const [anyReviewed, setAnyReviewed] = useState(false)

  const fetchOrderData = async (orderId) => {
    try {
      const response = await axios.get(`${ORDER_DETAILS_GET}/${orderId}`)
      if (response.data.status) {
        // 檢查是否有任一 review_status 為 1
        const anyReviewed = response.data.orderDetails.find(
          (v) => v.review_status == 1
        )
        setAnyReviewed(!!anyReviewed)
        setOrder(response.data.orders[0])
        setDetail(response.data.orderDetails)
      }
    } catch (error) {
      console.error('Error fetching order and order detail data:', error)
    }
  }

  // useEffect(() => {
  //   if (fetchTrigger && orderId) {
  //     const fetchOrderData = async () => {
  //       try {
  //         const response = await axios.get(`${ORDER_DETAILS_GET}/${orderId}`)
  //         if (response.data.status) {
  //           setOrderData(response.data.orders[0])
  //           setOrderDetails(response.data.orderDetails)

  //           // 檢查是否有任一 review_status 為 1
  //           const anyReviewed = response.data.orderDetails.find(
  //             (v) => v.review_status == 1
  //           )
  //           setAnyReviewed(!!anyReviewed)

  //         }
  //       } catch (error) {
  //         console.error('Error fetching order data:', error)
  //       }
  //     }
  //     fetchOrderData()
  //     setFetchTrigger(false) // 當觸發完畢後，設置為 false，避免重複觸發
  //   }
  //   console.log('anyReviewed', anyReviewed);
  // }, [orderId, fetchTrigger]) // 監聽 fetchTrigger 變化

  return { order, detail, anyReviewed, fetchOrderData }
}

export default useFetchOrderData
