// 會員資料 第二層選單 components
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './user-tab-sec.module.css'

export default function UserTabSec({ tabItems=[] }) {

  const router = useRouter()

  return (
    <ul className={styles.userTabSec}>
      {tabItems.map((v, i) => (
        <li
          key={v.key}
          className={router.asPath.includes(v.path) ? styles.active : ''}
        >
          <Link href={v.path}>
            <span>{v.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

// 引入時記得設定 tab 的內容
// const tabItems = [
//   { key: 'ongoing', name: '處理中', path: '/user/orders/ongoing' },
//   { key: 'canceled', name: '已取消', path: '/user/orders/canceled' },
//   { key: 'completed', name: '已完成', path: '/user/orders/completed' },
// ]
