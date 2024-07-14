import { useState, useEffect } from 'react'
import styles from './coupon-container.module.css'
import axios from 'axios'
import { useAuth } from '@/context/auth-context'
import CouponCard from '../coupon-card'
import UserHeader from '@/components/UI/user-header'
import UserPagination from '@/components/UI/user-pagination'
import CouponMoreInfoModal from '../coupon-more-info-modal'
import NoData from '@/components/UI/no-data'
import { GET_MEMBER_COUPON, GET_COUPON_DETAIL } from '@/configs/api-path'

export default function CouponContainer() {
  const [coupons, setCoupons] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)
  const [couponDetails, setCouponDetails] = useState([])
  const { auth } = useAuth()

  useEffect(() => {
    fetchMemberCoupons(auth.id, currentPage)
  }, [auth.id, currentPage])

  const fetchMemberCoupons = async (memberId, page) => {
    try {
      const response = await axios.get(GET_MEMBER_COUPON, {
        params: {
          member_id: memberId,
          page: page,
        },
      })
      const { coupons, totalPages } = response.data
      setCoupons(coupons)
      setTotalPages(totalPages)
    } catch (error) {
      console.error('Error fetching member coupons: ', error)
    }
  }

  const fetchCouponDetail = async (coupon_id) => {
    try {
      const response = await axios.get(
        `${GET_COUPON_DETAIL}?coupon_id=${coupon_id}`
      )

      setCouponDetails(response.data.rows)
    } catch (error) {
      console.error('Error fetching coupon detail: ', error)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleCouponClick = (coupon_id, coupon) => {
    setSelectedCoupon(coupon)
    fetchCouponDetail(coupon_id)
    setIsCouponModalOpen(true)
    console.log('couponDetails', coupon_id, couponDetails)
  }

  const handleCloseModal = () => {
    setSelectedCoupon(null)
    setIsCouponModalOpen(false)
  }

  return (
    <>
      <section className={styles.couponSection}>
        <div>
          <UserHeader title="已領取的優惠券" btnHidden={true} />
        </div>
        <div className={styles.couponBox}>
          {coupons.length > 0 ? (
            coupons.map((v) => (
              <CouponCard
                key={v.coupon_id}
                coupon_name={v.coupon_name}
                restrict={v.minimum_order}
                expire_date={v.valid_until}
                onClick={() => handleCouponClick(v.coupon_id, v)}
              />
            ))
          ) : (
            <div className={styles.span2}>
              <NoData text="無優惠券資料" backgroundColor="white" />
            </div>
          )}
        </div>
      </section>

      {coupons.length > 0 && (
        <UserPagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      
      {selectedCoupon && (
        <CouponMoreInfoModal
          coupon={selectedCoupon}
          couponDetails={couponDetails}
          handleClose={handleCloseModal}
        />
      )}
    </>
  )
}
