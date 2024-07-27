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
import Input01 from '@/components/UI/form-item/input01'
import FilterBtn from '@/components/UI/filter-btn'

export default function OrderListLayout({ status, initialPage = 1 }) {
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
  const [searchTerm, setSearchTerm] = useState('')

  const handlePageChange = (newPage) => {
    setPage(newPage)
    fetchAllOrders(auth.id, status, newPage, searchTerm)
  }

  const handleCancel = (order_id, merchant_trade_no) => {
    if (status === 'ongoing') {
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

  const handleSearch = () => {
    fetchAllOrders(auth.id, status, 1, searchTerm)
  }

  const clearSearch = () => {
    setSearchTerm('')
    fetchAllOrders(auth.id, status, 1, '')
  }

  // 登入驗證
  useEffect(() => {
    if (router.isReady && authIsReady) {
      if (!auth.id) {
        setIsLogin(false)
        loginFormSwitch('Login')
      } else {
        fetchAllOrders(auth.id, status, page, searchTerm)
        setIsLogin(true)
      }
    }
  }, [auth.id, router.isReady, authIsReady, status, page])

  useEffect(() => {
    if (updateAllOrders && auth.id) {
      fetchAllOrders(auth.id, status, page, searchTerm)
      setUpdateAllOrders(false)
    }
  }, [updateAllOrders, auth.id])

  useEffect(() => {
    setPage(1)
    setSearchTerm('')
    fetchAllOrders(auth.id, status, page, searchTerm)
  }, [status])

  return (
    <>
      {!isLogin && <RedirectionGuide />}

      <div className={styles.searchBox}>
        <Input01
          placeholder="請輸入商品名稱"
          inputStyles="line"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={styles.btnStack}>
          <FilterBtn btnText="搜尋" href={null} onClick={handleSearch} />
          <FilterBtn btnText="清空" href={null} onClick={clearSearch} />
        </div>
      </div>

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
            total_price={v.subtotal_price - v.discountTotal + v.deliver_fee}
            payment_type={v.payment_type}
            full_address={v.full_address}
            status={status}
            // order_status_name={v.order_status_name}
            orderDetailData={allOrderDetails}
            member_id={auth.id}
            page={page}
            handleCancel={handleCancel(v.order_id, v.merchant_trade_no)}
            handlePayment={handlePayment(
              v.order_id,
              v.payment_type,
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

      <ConfirmDialog
        dialogTitle={cancelDialog}
        btnTextRight="確定取消"
        btnTextLeft="取消"
      />
    </>
  )
}
