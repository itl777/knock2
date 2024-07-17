import styles from './card-header.module.css'
import FilterBtn from '@/components/UI/filter-btn'
import HDivider from '@/components/UI/divider/horizontal-divider'

export default function CardHeader({
  title = '標題',
  btnRightHref = null,
  btnLeftHref = null,
  btnRightText = '按鈕',
  btnLeftText = '按鈕',
  btnRightHidden = false,
  btnLeftHidden = false,
  btnRightOnClick,
  btnLeftOnClick,
}) {
  return (
    <div>
      <div className={styles.orderDetailHeader}>
        <div className={styles.headerLeft}>
          <p className={styles.titleStyle}>{title}</p>
        </div>

        <div className={styles.btnStack}>
          {!btnLeftHidden && (
            <FilterBtn
              btnText={btnLeftText}
              href={btnLeftHref}
              onClick={btnLeftOnClick}
            />
          )}
          {!btnRightHidden && (
            <FilterBtn
              btnText={btnRightText}
              href={btnRightHref}
              onClick={btnRightOnClick}
            />
          )}
        </div>
      </div>
      <HDivider margin="1.5rem 0" />
    </div>
  )
}
