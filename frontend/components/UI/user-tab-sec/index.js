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
