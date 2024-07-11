import styles from './card-header.module.css'
import IconButton from '@mui/material/IconButton'
import FilterBtn from '@/components/UI/filter-btn'
import HDivider from '@/components/UI/divider/horizontal-divider'
import { FaArrowLeftLong } from 'react-icons/fa6'

export default function CardHeader({
  title = '標題',
  btnHref = '/',
  btnText = '按鈕'
}) {

  return (
    <div>
      <div className={styles.orderDetailHeader}>
        <div className={styles.headerLeft}>
          <p className={styles.titleStyle}>{title}</p>
        </div>

        <FilterBtn btnText={btnText} href={btnHref} />
      </div>
      <HDivider margin="1.5rem 0" />
    </div>
  )
}
