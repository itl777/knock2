import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import IndexLayout from '@/components/layout'
import UserLayout from '@/components/layout/user-layout'
import UserTab from '@/components/UI/user-tab'
import OrderReviewsPage from '@/components/page-components/orders/order-reviews-page'


export default function OrderDetailsPage() {
  // 取得 order id
  const router = useRouter()
  const orderId = router.query
  console.log('order id: ', orderId);


  return (
    <>
      <IndexLayout title="訂單評價" background="light">
        <UserLayout
          userTab={<UserTab />}
          sectionRight={<OrderReviewsPage orderId={orderId}/>}
        />
      </IndexLayout>
    </>
  )
}
