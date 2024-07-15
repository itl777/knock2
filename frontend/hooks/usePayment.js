import { useRouter } from 'next/router'
import axios from 'axios'
import { ECPAY_GET, CANCEL_ORDER } from '@/configs/api-path'

const usePayment = () => {
  const router = useRouter()

  const handleCancel = async (order_id) => {
    try {
      const updateOrderStatus = await axios.post(
        `${CANCEL_ORDER}?order_id=${order_id}`
      )

      if (updateOrderStatus.data.success) {
        alert('已取消訂單')
      }
    } catch (error) {
      console.error('提交表單時出錯', error)
    }
  }

  const handleEcpaySubmit = async (order_id, total_price) => {
    try {
      const orderId = order_id
      const checkoutTotal = total_price

      const ecpayResponse = await axios.get(ECPAY_GET, {
        params: {
          orderId,
          checkoutTotal,
        },
      })

      if (ecpayResponse.data.success) {
        // Redirect to a new payment page
        router.push({
          pathname: '/ecpay-checkout',
          query: {
            html: encodeURIComponent(ecpayResponse.data.html),
          },
        })
      }
    } catch (error) {
      console.error('提交表單時出錯', error)
    }
  }

  return { handleCancel, handleEcpaySubmit }
}

export default usePayment
