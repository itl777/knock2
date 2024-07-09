import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import IndexLayout from '@/components/layout'
import UserLayout from '@/components/layout/user-layout'
import UserTab from '@/components/UI/user-tab'
import UserTabSec from '@/components/UI/user-tab-sec'
import CouponContainer from '@/components/page-components/coupon/coupon-container'

export default function CouponPage() {
  const router = useRouter()
  const { status } = router.query // 取得動態路由參數

  const tabItems = [
    { key: 'ongoing', name: '未使用', path: '/user/coupon/ongoing' },
    { key: 'canceled', name: '歷史記錄', path: '/user/coupon/history' },
  ]

  // 根據 status 設置 order_status_id
  const getOrderStatusId = (status) => {
    switch (status) {
      case 'ongoing':
        return 5
      case 'history':
        return 4
      default:
        return 5
    }
  }

  useEffect(() => {
    if (!status) {
      router.push('/user/coupon/ongoing') // 如果沒有狀態，默認跳轉到 ongoing
    }
  }, [status])

  const orderStatusId = getOrderStatusId(status)

  return (
    <>
      <IndexLayout title="商品訂單" background="light">
        <UserLayout
          userTab={<UserTab />}
          userTabSec={<UserTabSec tabItems={tabItems} />}
          sectionRight={<CouponContainer orderStatusId={orderStatusId} />}
        />
      </IndexLayout>
    </>
  )
}
