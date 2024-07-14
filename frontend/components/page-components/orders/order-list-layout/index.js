// 我的訂單頁面
import React, { useState, useEffect } from 'react'
import styles from './order-list-layout.module.css'
import { useRouter } from 'next/router'
// context
import { useLoginModal } from '@/context/login-context'
import { useAuth } from '@/context/auth-context'
// components
import OrderListCard from './order-list-card'
import NoData from '@/components/UI/no-data'
import UserPagination from '@/components/UI/user-pagination'
import RedirectionGuide from '@/components/UI/redirect-guide'
// api path
import { ORDER_LIST_GET } from '@/configs/api-path'

export default function OrderListLayout({ orderStatusId, initialPage = 1 }) {
  const [orderData, setOrderData] = useState([])
  const [orderDetailData, setOrderDetailData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const router = useRouter()
  const { auth, authIsReady } = useAuth()
  const { loginFormSwitch } = useLoginModal()
  const [isLogin, setIsLogin] = useState()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${ORDER_LIST_GET}?member_id=${auth.id}&order_status_id=${orderStatusId}&page=${page}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch order data')
        }

        const data = await response.json()

        console.log(data)
        setOrderData(data.orders) // 取得訂單資料
        setOrderDetailData(data.orderDetails) // 取得訂單所有商品資料（圖片）
        setTotalPages(data.totalPages)
      } catch (error) {
        console.log('Error fetching orders:', error)
      }
    }

    fetchOrders()
  }, [auth.id, orderStatusId, page])

  const handlePageChange = (newPage) => {
    setPage(newPage)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    })
  }

  // 登入驗證
  useEffect(() => {
    if (router.isReady && authIsReady) {
      if (!auth.id) {
        setIsLogin(false)
        loginFormSwitch('Login')
      }
      if (auth.id) {
        setIsLogin(true)
      }
    }
  }, [auth.id, router.isReady, authIsReady])

  return (
    <>
      {!isLogin && <RedirectionGuide />}

      {/* 如果沒有資料，顯示無訂單記錄圖示，有的話則進行 map */}
      {isLogin && orderData.length === 0 ? (
        <div className={styles.orderBox}>
          <NoData
            text="無訂單記錄"
            backgroundColor="transparent"
            borderRadius="0rem"
          />
        </div>
      ) : (
        orderData.map((v, i) => (
          <OrderListCard
            key={v.order_id}
            order_id={v.order_id}
            merchant_trade_no={v.merchant_trade_no}
            order_date={v.order_date}
            total_price={v.total_price}
            payment_type={v.payment_type}
            full_address={v.full_address}
            order_status_id={v.order_status_id}
            order_status_name={v.order_status_name}
            orderDetailData={orderDetailData}
          />
        ))
      )}

      {isLogin && orderData.length > 0 && (
        <UserPagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}
