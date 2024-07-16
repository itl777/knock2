import React, { useState, useEffect } from 'react'
import styles from './order-list-layout.module.css'
import { useRouter } from 'next/router'
// context
import { useLoginModal } from '@/context/login-context'
import { useAuth } from '@/context/auth-context'
// hooks
import useFetchAllOrders from '@/hooks/fetchAllOrder'
import usePayment from '@/hooks/usePayment'
// components
import OrderListCard from './order-list-card'
import NoData from '@/components/UI/no-data'
import UserPagination from '@/components/UI/user-pagination'
import RedirectionGuide from '@/components/UI/redirect-guide'

export default function OrderListLayout({ orderStatusId, initialPage = 1 }) {
  const [page, setPage] = useState(initialPage)
  const router = useRouter()
  const { auth, authIsReady } = useAuth()
  const { loginFormSwitch } = useLoginModal()
  const [isLogin, setIsLogin] = useState(false)
  const [updateAllOrders, setUpdateAllOrders] = useState(false)
  const { allOrderData, allOrderDetails, totalPages, fetchAllOrders } =
    useFetchAllOrders()
  const { handleCancel, handleEcpaySubmit } = usePayment()

  const handlePageChange = (newPage) => {
    setPage(newPage)
    // router.push({
    //   pathname: router.pathname,
    //   query: { ...router.query, page: newPage },
    // })
  }

  const btnLeftOnClick = (order_status_id, order_id, total_price) => {
    if (+order_status_id === 1) {
      return () => {
        handleEcpaySubmit(order_id, total_price)
        setUpdateAllOrders(true)
      }
    }
    if (+order_status_id === 2) {
      return () => {
        if (window.confirm('確定要取消訂單嗎？')) {
          handleCancel(order_id)
          setUpdateAllOrders(true)
        }
      }
    }
    return null
  }

  // 登入驗證
  useEffect(() => {
    if (router.isReady && authIsReady) {
      if (!auth.id) {
        setIsLogin(false)
        loginFormSwitch('Login')
      } else {
        fetchAllOrders(auth.id, orderStatusId, page)
        setIsLogin(true)
      }
    }
  }, [auth.id, router.isReady, authIsReady, orderStatusId, page])

  useEffect(() => {
    if (updateAllOrders && auth.id) {
      fetchAllOrders(auth.id, orderStatusId, page)
      setUpdateAllOrders(false)
    }
  }, [updateAllOrders, auth.id])

  return (
    <>
      {!isLogin && <RedirectionGuide />}

      {/* 如果沒有資料，顯示無訂單記錄圖示，有的話則進行 map */}
      {isLogin && allOrderData.length === 0 ? (
        <div className={styles.orderBox}>
          <NoData
            text="無訂單記錄"
            backgroundColor="transparent"
            borderRadius="0rem"
          />
        </div>
      ) : (
        allOrderData.map((v, i) => (
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
            orderDetailData={allOrderDetails}
            member_id={auth.id}
            page={page}
            btnLeftOnClick={btnLeftOnClick(
              v.order_status_id,
              v.order_id,
              v.total_price
            )}
          />
        ))
      )}

      {isLogin && allOrderData.length > 0 && (
        <UserPagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}
