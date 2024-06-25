// pages > orders
import React from 'react'
import IndexLayout from '@/components/layout'
import UserTab from '@/components/UI/user-tab'
import UserTabSec from '@/components/UI/user-tab-sec'
import OrderListCards from '@/components/page-components/orders/order-list-cards'
import UserLayout from '@/components/layout/user-layout'

export default function OrdersPage() {
  return (
    <>
      <IndexLayout title="商品訂單">
        <UserLayout
          userTab={<UserTab />}
          userTabSec={<UserTabSec />}
          sectionRight={<OrderListCards />}
        />
      </IndexLayout>
    </>
  )
}
