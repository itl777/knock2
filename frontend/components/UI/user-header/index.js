import styles from './user-header.module.css'
import IconButton from '@mui/material/IconButton'
import FilterBtn from '../filter-btn'
import HDivider from '../divider/horizontal-divider'
import { FaArrowLeftLong } from 'react-icons/fa6'

export default function UserHeader({
  type = 'def',
  title = '標題',
  btnHref = '/',
}) {

  return (
    <div>
      <div className={styles.orderDetailHeader}>
        <div className={styles.headerLeft}>
          {type === 'icon' && (
            <IconButton href="/user/orders/ongoing">
              <FaArrowLeftLong className={styles.iconStyles} />
            </IconButton>
          )}

          <h5>{title}</h5>
        </div>

        <FilterBtn btnText="發票" href={btnHref} />
      </div>
      <HDivider margin="1.5rem 0" />
    </div>
  )
}
