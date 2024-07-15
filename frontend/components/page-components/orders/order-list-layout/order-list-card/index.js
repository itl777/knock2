import styles from './order-list-card.module.css'
import { formatPrice } from '@/hooks/numberFormat'
import { PRODUCT_IMG } from '@/configs/api-path'
import CardHeader from '../card-header'
import IconTextRow from '../icon-text-row'
import OrderStatusTag from '../../order-status-tag'
import OrderProductImgBox from '../../order-product-img-box'
import { HiOutlineCreditCard, HiOutlineCube } from 'react-icons/hi'


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
  btnLeftOnClick,
}) {

  const btnLeftText = () => {
    if (+order_status_id === 1) return '重新付款'
    if (+order_status_id === 2) return '取消訂單'
    return ''
  }

  const isBtnLeftHidden = () => {
    return ![1, 2].includes(+order_status_id)
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
        btnLeftOnClick={btnLeftOnClick}
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
