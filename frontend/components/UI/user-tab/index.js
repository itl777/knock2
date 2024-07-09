// components > user-tab
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './user-tab.module.css'
import { FaGhost } from 'react-icons/fa'

export default function UserTab() {
  const router = useRouter()
  const isActive = (path) => {
    if (path === '/user/orders/ongoing') {
      return router.pathname.startsWith('/user/orders')
    }
    if (path === '/user/coupon/ongoing') {
      return router.pathname.startsWith('/user/coupon')
    }
    return router.pathname.startsWith(path)
  }

  const tabItems = [
    { key: 'profile', name: '會員資料', path: '/user/profile' },
    { key: 'reservation', name: '行程預約', path: '/user/reservation' },
    {
      key: 'group-reservation',
      name: '揪團行程',
      path: '/user/group-reservation',
    },
    { key: 'orders', name: '商品訂單', path: '/user/orders/ongoing' },
    { key: 'favorite', name: '我的收藏', path: '/user/favorite' },
    { key: 'coupons', name: '優惠券', path: '/user/coupon/ongoing' },
  ]

  return (
    <ul className={styles.userTab}>
      {tabItems.map((v, i) => (
        <li key={v.key} className={isActive(v.path) ? styles.active : ''}>
          <Link href={v.path}>
            <FaGhost />
            <span>{v.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
