import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import IndexLayout from '@/components/layout'
import UserTab from '@/components/UI/user-tab'
import UserTabSec from '@/components/UI/user-tab-sec'
import OrderListCards from '@/components/page-components/orders/order-list-cards'
import UserLayout from '@/components/layout/user-layout'

export default function OrdersPage() {
  const router = useRouter()
  const { status } = router.query // 取得動態路由參數

  const tabItems = [
    { key: 'ongoing', name: '處理中', path: '/user/orders/ongoing' },
    { key: 'canceled', name: '已取消', path: '/user/orders/canceled' },
    { key: 'completed', name: '已完成', path: '/user/orders/completed' },
  ]

  // 根據 status 設置 order_status_id
  const getOrderStatusId = (status) => {
    switch (status) {
      case 'ongoing':
        return 5
      case 'canceled':
        return 4
      case 'completed':
        return 9
      default:
        return 5
    }
  }

  useEffect(() => {
    if (!status) {
      router.push('/user/orders/ongoing') // 如果沒有狀態，默認跳轉到 ongoing
    }
  }, [status])

  const orderStatusId = getOrderStatusId(status)

  return (
    <>
      <IndexLayout title="商品訂單" background="light">
        <UserLayout
          userTab={<UserTab />}
          userTabSec={<UserTabSec tabItems={tabItems} />}
          sectionRight={<OrderListCards orderStatusId={orderStatusId} />}
        />
      </IndexLayout>
    </>
  )
}
