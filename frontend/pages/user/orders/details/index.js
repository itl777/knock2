import React from 'react'
import IndexLayout from '@/components/layout'
import UserTab from '@/components/UI/user-tab'
import OrderListCards from '@/components/page-components/orders/order-list-cards'
import UserLayout from '@/components/layout/user-layout'

export default function OrderDetailsPage() {
  return (
    <>
      <IndexLayout title="訂單詳情" background="light">
        <UserLayout userTab={<UserTab />} sectionRight={<OrderListCards />} />
      </IndexLayout>
    </>
  )
}
