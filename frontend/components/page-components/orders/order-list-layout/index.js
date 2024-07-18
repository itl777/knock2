import React, { useState, useEffect } from 'react'
import styles from './order-list-layout.module.css'
import { useRouter } from 'next/router'
// context
import { useLoginModal } from '@/context/login-context'
import { useAuth } from '@/context/auth-context'
import { useConfirmDialog } from '@/context/confirm-dialog-context'
import { useSnackbar } from '@/context/snackbar-context'
// hooks
import useFetchAllOrders from '@/hooks/fetchAllOrder'
import usePayment from '@/hooks/usePayment'
// components
import OrderListCard from './order-list-card'
import ConfirmDialog from '@/components/UI/confirm-dialog'
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
  const { handleOrderCancel, handleOrderPayment } = usePayment()
  const { openConfirmDialog } = useConfirmDialog()
  const { openSnackbar } = useSnackbar()
  const [cancelDialog, setCancelDialog] = useState('')

  const handlePageChange = (newPage) => {
    setPage(newPage)
    // router.push({
    //   pathname: router.pathname,
    //   query: { ...router.query, page: newPage },
    // })
  }

  const handleCancel = (order_id, order_status_id, merchant_trade_no) => {
    if (order_status_id === 1 || order_status_id === 2) {
      return async () => {
        setCancelDialog(`確定要取消訂單編號 ${merchant_trade_no} 嗎？`)

        openConfirmDialog(async () => {
          const result = await handleOrderCancel(order_id)
          if (result.success) {
            openSnackbar('已取消訂單', 'success')
          } else {
            openSnackbar('取消訂單失敗', 'error')
          }
          setUpdateAllOrders(true)
        })
      }
    }
  }

  const handlePayment = (order_id, payment_type, total_price) => {
    if (payment_type === '待付款') {
      return () => {
        handleOrderPayment(order_id, total_price)
        setUpdateAllOrders(true)
      }
    }
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
            handleCancel={handleCancel(v.order_id, v.order_status_id, v.merchant_trade_no)}
            handlePayment={handlePayment(v.order_id, v.payment_type, v.total_price)}
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

      <ConfirmDialog
        dialogTitle={cancelDialog}
        btnTextRight="確定取消"
        btnTextLeft="取消"
      />
    </>
  )
}
