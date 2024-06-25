import React from 'react'
import IndexLayout from '@/components/layout'
import UserTab from '@/components/UI/user-tab'
import OrderDetailCards from '@/components/page-components/orders/order-detail-cards'
import UserLayout from '@/components/layout/user-layout'

export default function OrderDetailsPage() {
  return (
    <>
      <IndexLayout title="訂單詳情" background="light">
        <UserLayout userTab={<UserTab />} sectionRight={<OrderDetailCards />} />
      </IndexLayout>
    </>
  )
}
