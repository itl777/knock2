import styles from './reservation-page.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
// context
import { useLoginModal } from '@/context/login-context'
import { useAuth } from '@/context/auth-context'
// hooks
import { formatPrice } from '@/hooks/numberFormat'
// components
import ReservationListCards from '../reservation-list-cards'
import RedirectionGuide from '@/components/UI/redirect-guide'
import UserPagination from '@/components/UI/user-pagination'
import { GET_RESERVATION_LIST } from '@/configs/api-path'

export default function ReservationPage({ status }) {
  const { auth, authIsReady } = useAuth()
  const { loginFormSwitch } = useLoginModal()
  const router = useRouter()
  const [isLogin, setIsLogin] = useState()
  const [reservationData, setReservationData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // 取得行程預約記錄
  const fetchReservation = async (member_id, page, status) => {
    try {
      const response = await axios.get(
        `${GET_RESERVATION_LIST}?member_id=${member_id}&page=${page}&status=${status}`
      )
      setReservationData(response.data.rows)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching member coupons: ', error)
    }
  }

  // 登入驗證
  useEffect(() => {
    if (router.isReady && authIsReady) {
      if (auth.id) {
        setIsLogin(true)
        fetchReservation(auth.id, currentPage, status)
      }
      if (!auth.id) {
        setIsLogin(false)
        loginFormSwitch('Login')
      }
    }
  }, [auth.id, router.isReady, authIsReady, currentPage, status])

  return (
    <>
      {!isLogin && <RedirectionGuide />}
      {isLogin && (
        <div className={styles.listContainer}>
          {reservationData.map((v) => (
            <ReservationListCards
              reservation_date={v.reservation_date}
              theme_name={`${v.theme_name} / ${v.branch_name}`}
              theme_img={`/themes-main/${v.theme_img}`}
              session={`${v.start_time} ~ ${v.end_time}`}
              participants={v.participants}
              deposit={formatPrice(v.deposit)}
              created_at={v.created_at}
            />
          ))}
        </div>
      )}

      {reservationData.length > 0 && (
        <UserPagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}
