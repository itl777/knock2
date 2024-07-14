import styles from './order-list-card.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
// hooks
import { formatPrice } from '@/hooks/numberFormat'
// components
import CardHeader from '../card-header'
import IconTextRow from '../icon-text-row'
import OrderStatusTag from '../../order-status-tag'
import OrderProductImgBox from '../../order-product-img-box'
// icons
import { HiOutlineCreditCard } from 'react-icons/hi'
import { HiOutlineCube } from 'react-icons/hi'
// api path
import { ECPAY_GET, PRODUCT_IMG } from '@/configs/api-path'
import { reload } from 'firebase/auth'

export default function OrderListCard({
  order_id,
  merchant_trade_no,
  order_date,
  total_price,
  payment_type,
  full_address,
  order_status_id,
  order_status_name,
  orderDetailData,
}) {
  const router = useRouter()

  const btnLeftText = () => {
    if (+order_status_id === 1) return '重新付款'
    if (+order_status_id === 2) return '取消訂單'
    return ''
  }

  const btnLeftOnClick = () => {
    if (+order_status_id === 1) return handleEcpaySubmit
    if (+order_status_id === 2) return handleCancel
    return null
  }

  const isBtnLeftHidden = () => {
    return ![1, 2].includes(+order_status_id)
  }

  const handleEcpaySubmit = async (e) => {
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
        // Step 3: 導向新的支付頁面
        router.push({
          pathname: '/ecpay-checkout',
          query: {
            html: encodeURIComponent(ecpayResponse.data.html),
          },
        })
        console.log('ECPay URL: ', ecpayResponse.data.html)
      }
    } catch (error) {
      console.error('提交表單時出錯', error)
    }
  }

  const handleCancel = async (e) => {
    try {
      const updateOrderStatus = await axios.post(
        `http://localhost:3001/orders/api/cancel_order?order_id=${order_id}`
      )

      if (updateOrderStatus.data.success) {
        alert('已取消')
      }
    } catch (error) {
      console.error('提交表單時出錯', error)
    }
  }

  return (
    <div className={styles.orderBox}>
      <CardHeader
        title={order_date}
        btnRightText="詳情"
        btnRightHref={`/user/orders/details/${order_id}`}
        btnLeftText={btnLeftText()}
        btnLeftHref={null}
        btnLeftHidden={isBtnLeftHidden()}
        btnLeftOnClick={btnLeftOnClick()}
      />
      <div className={styles.orderBody}>
        <div>
          <div className={styles.orderInfoRowBox}>
            <IconTextRow content={merchant_trade_no} />
            <IconTextRow
              content={`${formatPrice(total_price)} / ${payment_type}`}
              icon={HiOutlineCreditCard}
            />
            <IconTextRow content={full_address} icon={HiOutlineCube} />
          </div>

          <OrderStatusTag statusText={order_status_name} />
        </div>

        <div className={styles.imgListBox}>
          {orderDetailData
            .filter((detail) => detail.order_id === order_id)
            .map((detail, i) => (
              <OrderProductImgBox
                key={i}
                imgSrc={
                  detail.product_img
                    ? `${PRODUCT_IMG}/${detail.product_img}`
                    : ''
                }
              />
            ))}
        </div>
      </div>
    </div>
  )
}
