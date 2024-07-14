import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import IndexLayout from '@/components/layout'
import UserLayout from '@/components/layout/user-layout'
import UserTab from '@/components/UI/user-tab'
import UserTabSec from '@/components/UI/user-tab-sec'
import OrderListLayout from '@/components/page-components/orders/order-list-layout'

export default function OrdersPage() {
  const router = useRouter()
  const { status, page = 1 } = router.query // 取得動態路由參數

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
        return 5 // 預設處理中狀態
    }
  }

  const orderStatusId = getOrderStatusId(status)

  return (
    <IndexLayout title="商品訂單" background="light">
      <UserLayout
        userTab={<UserTab />}
        userTabSec={<UserTabSec tabItems={tabItems} />}
        sectionRight={
          <OrderListLayout
            orderStatusId={orderStatusId}
            initialPage={parseInt(page)}
          />
        }
      />
    </IndexLayout>
  )
}
