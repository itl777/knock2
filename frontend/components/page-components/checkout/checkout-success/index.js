// page components checkout success
import styles from './checkout-success.module.css'
import { useRouter } from 'next/router'
// hooks
import useFetchOrderData from '@/hooks/fetchOrderDetails'
// components
import BlackBtn from '@/components/UI/black-btn'
import OrderItemDetail from '../../orders/order-item-detail'
import CheckoutTotalTable from '../checkout-total-table'
// api path
import { PRODUCT_IMG } from '@/configs/api-path'

export default function CheckoutSuccess() {
  const router = useRouter()
  const { order_id } = router.query
  const { orderData, orderDetails } = useFetchOrderData(order_id)

  return (
    <section className={styles.sectionContainer}>
      <h3 className={styles.titleStyles}>訂單已成立</h3>

      <div className={styles.contentContainer}>
        <img className={styles.ghostImg} src="/ghost/ghost_03.png" alt="" />
        {orderDetails.map((detail) => (
          <OrderItemDetail
            key={detail.product_id}
            productName={detail.product_name}
            originalPrice={detail.order_unit_price}
            discountedPrice={detail.order_unit_price}
            productImg={`${PRODUCT_IMG}/${detail.product_img}`}
            orderQty={detail.order_quantity}
          />
        ))}

        <CheckoutTotalTable
          subtotal={orderData.total_price}
          deliverFee={0}
          totalDiscount={0}
        />
      </div>

      <div className={styles.btnStack}>
        <BlackBtn btnText="繼續購物" href="/product" paddingType="medium" />
        <BlackBtn
          btnText="檢視訂單"
          href={`/user/orders/details/${order_id}`}
          paddingType="medium"
        />
      </div>
      
    </section>
  )
}
