import styles from './order-list-card.module.css'
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
import { PRODUCT_IMG } from '@/configs/api-path'

export default function OrderListCard({
  order_id,
  order_date,
  total_price,
  payment_method,
  full_address,
  order_status_name,
  orderDetailData,
}) {
  return (
    <div className={styles.orderBox}>
      <CardHeader
        title={order_date}
        btnText="詳情"
        btnHref={`/user/orders/details/${order_id}`}
      />
      <div className={styles.orderBody}>
        <div>
          <div className={styles.orderInfoRowBox}>
            <IconTextRow content={order_id} />
            <IconTextRow
              content={`${formatPrice(total_price)} / ${payment_method}`}
              icon={HiOutlineCreditCard}
            />
            <IconTextRow content={full_address} icon={HiOutlineCube} />
          </div>

          <OrderStatusTag status={order_status_name} />
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
