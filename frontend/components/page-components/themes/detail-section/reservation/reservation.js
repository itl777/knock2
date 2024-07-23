// reservation.js
import { useTheme } from '@/context/theme-context'
import { useRouter } from 'next/router'
import { DateContext } from '@/context/date-context'
import { useLoginModal } from '@/context/login-context'
import { useAuth } from '@/context/auth-context'
import React, { useState, useContext, useEffect } from 'react'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useSession } from '@/context/sessionContext'

import myStyle from './reservation.module.css'
import Input02 from '@/components/UI/form-item/input02'
import Select03 from '@/components/UI/form-item/select03'
import Box from '@mui/joy/Box'
import Checkbox from '@mui/joy/Checkbox'
import Textarea01 from '@/components/UI/form-item/textarea01'
import Radio02 from '@/components/UI/form-item/radio02'
import { FaGhost } from 'react-icons/fa'
import BasicModal02 from '@/components/UI/basic-modal02'
import schemaForm from './schemaForm'

export default function Reservation() {
  const { dateSessionsStatus } = useSession()
  const { selectedDate } = useContext(DateContext)
  const [name, setName] = useState('')
  const [mobile_phone, setMobilePhone] = useState('')
  const [date, setDate] = useState('')
  const [radioValue, setRadioValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [errors, setErrors] = useState({})
  const [timeSlot, setTimeSlot] = useState('')
  const [people, setPeople] = useState('')
  const [discount, setDiscount] = useState('')
  const [remark, setRemark] = useState('')

  const { themeDetails, getThemeDetails } = useTheme()
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { loginFormSwitch } = useLoginModal()
  const { auth } = useAuth()
  const [useProfileData, setUseProfileData] = useState(false)
  const { userProfile, loading: profileLoading } = useUserProfile(auth?.id)
  const [showProfileCheckbox, setShowProfileCheckbox] = useState(false)

  // 在 useEffect 中檢查用戶是否已登入
  useEffect(() => {
    if (auth?.id && userProfile) {
      setShowProfileCheckbox(true)
    } else {
      setShowProfileCheckbox(false)
      setUseProfileData(false)
    }
  }, [auth?.id, userProfile])

  // 帶入資料
  useEffect(() => {
    const { branch_themes_id } = router.query
    console.log('branch_themes_id changed:', branch_themes_id)

    if (branch_themes_id && !loading) {
      setLoading(true)
      getThemeDetails(branch_themes_id)
        .then(() => {
          setLoading(false)
          updateDateFromSelection()
        })
        .catch((error) => {
          console.error('Error fetching theme details:', error)
          setLoading(false)
        })
    }
  }, [router.query.branch_themes_id])

  // 選單
  useEffect(() => {
    updateDateFromSelection()
  }, [selectedDate])

  const updateDateFromSelection = () => {
    if (selectedDate) {
      const formattedDate = `${selectedDate.year}-${String(
        selectedDate.month + 1
      ).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`
      setDate(formattedDate)
      setErrors((prev) => ({ ...prev, date: undefined }))
    } else {
      setDate('')
    }
  }

  useEffect(() => {
    updateDateFromSelection()
  }, [selectedDate])

  // 修改 handleCheckboxChange 函數
  const handleCheckboxChange = (event) => {
    const checked = event.target.checked
    setUseProfileData(checked)
    if (checked && userProfile) {
      setName(userProfile.name || userProfile.nickname || '')
      setMobilePhone(userProfile.mobile_phone || '')
    } else {
      setName('')
      setMobilePhone('')
    }
  }

  // 姓名、電話、select資料驗證
  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)
    const result = schemaForm.safeParse({ name: value })
    if (!result.success) {
      setErrors((prev) => ({ ...prev, name: result.error.format().name }))
    } else {
      setErrors((prev) => ({ ...prev, name: undefined }))
    }
  }

  const handleMobileChange = (e) => {
    const value = e.target.value
    setMobilePhone(value)
    const result = schemaForm.safeParse({ mobile_phone: value })
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        mobile_phone: result.error.format().mobile_phone,
      }))
    } else {
      setErrors((prev) => ({ ...prev, mobile_phone: undefined }))
    }
  }

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value)
    setModalOpen(true)
  }

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSelectChange = (e, field) => {
    const value = e.target.value
    switch (field) {
      case 'timeSlot':
        setTimeSlot(value.toString())
        break
      case 'people':
        setPeople(value.toString())
        break
      case 'discount':
        setDiscount(value.toString())
        break
      default:
        break
    }
    clearError(field)
  }

  // 提交表單
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!auth.id) {
      loginFormSwitch('Login')
      return
    }

    const formData = {
      user_id: auth.id,
      branch_themes_id: themeDetails.branch_themes_id,
      reservation_date: date,
      session_id: parseInt(timeSlot),
      participants: parseInt(people),
      remark,
    }

    const nameResult = schemaForm.shape.name.safeParse(name)
    const mobileResult = schemaForm.shape.mobile_phone.safeParse(
      mobile_phone.toString()
    )
    const timeSlotResult = schemaForm.shape.timeSlot.safeParse(timeSlot)
    const peopleResult = schemaForm.shape.people.safeParse(people.toString())
    const discountResult = schemaForm.shape.discount.safeParse(discount)

    let dateResult
    if (!date) {
      dateResult = {
        success: false,
        error: { format: () => ({ _errors: ['請選取預約日期'] }) },
      }
    } else {
      dateResult = schemaForm.shape.date.safeParse(date)
    }

    const radioResult = radioValue
      ? { success: true }
      : {
          success: false,
          error: { format: () => ({ _errors: ['請閱讀並同意注意事项'] }) },
        }

    const newErrors = {}
    if (!nameResult.success) newErrors.name = nameResult.error.format()
    if (!mobileResult.success)
      newErrors.mobile_phone = mobileResult.error.format()
    if (!dateResult.success) newErrors.date = dateResult.error.format()
    if (!timeSlotResult.success)
      newErrors.timeSlot = timeSlotResult.error.format()
    if (!peopleResult.success) newErrors.people = peopleResult.error.format()
    if (!discountResult.success)
      newErrors.discount = discountResult.error.format()
    if (!radioResult.success) newErrors.readNotice = radioResult.error.format()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      setErrors({})

      fetch('http://localhost:3001/themes/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          if (data.success) {
            // 找到選中的時間段
            const selectedSession = themeDetails.sessions.find(
              (session) => session.sessions_id.toString() === timeSlot
            )

            router.push({
              pathname: '/themes/checkout',
              query: {
                ...formData,
                deposit: data.deposit,
                name,
                mobile_phone,
                timeSlot,
                sessionTime: selectedSession
                  ? `${selectedSession.start_time} - ${selectedSession.end_time}`
                  : '',
                people,
                discount: themeDetails.coupon_name,
                themeName: themeDetails.theme_name,
                branchName: themeDetails.branch_name,
                themeImage: themeDetails.theme_img,
                remark,
              },
            })
          } else {
            throw new Error(data.message || '預約創建失敗')
          }
        })
        .catch((error) => {
          console.error('預約提交失敗:', error)
          alert('預約提交失敗，請稍後再試。錯誤詳情：' + error.message)
        })
    }
  }

  // 視窗彈出
  const closeModal = () => {
    setModalOpen(false)
    // 隐藏警告信息
    setErrors((prev) => ({ ...prev, readNotice: undefined }))
  }

  return (
    <div className={myStyle.reservationrBg}>
      <div className={myStyle.form}>
        <div className={myStyle.title}>
          <FaGhost />
          &ensp; 請先 登入/註冊會員 再預約
        </div>
        <form onSubmit={handleSubmit}>
          <div className={myStyle.p}>
            <Input02
              className={myStyle.p}
              name="name"
              type="text"
              value={name}
              placeholder="姓名"
              onChange={handleNameChange}
            />
            {(errors.name?._errors || []).map((error, index) => (
              <span key={index} className={myStyle.error}>
                {error}
              </span>
            ))}
          </div>
          <div className={myStyle.p}>
            <Input02
              className={myStyle.p}
              name="mobile_phone"
              type="text"
              value={mobile_phone}
              placeholder="手機"
              onChange={handleMobileChange}
            />
            {(errors.mobile_phone?._errors || []).map((error, index) => (
              <span key={index} className={myStyle.error}>
                {error}
              </span>
            ))}
          </div>
          {showProfileCheckbox && (
            <Box>
              <Checkbox
                label="同會員資料"
                sx={{ color: '#B99755', mt: 3 }}
                checked={useProfileData}
                onChange={handleCheckboxChange}
              />
            </Box>
          )}
          <div className={myStyle.p}>
            <Input02
              className={myStyle.p}
              name="date"
              type="text"
              value={date}
              placeholder="預約日期(請點選日曆)"
              readOnly
            />
            {errors.date &&
              errors.date._errors &&
              errors.date._errors.map((error, index) => (
                <span key={index} className={myStyle.error}>
                  {error}
                </span>
              ))}
          </div>
          <div className={myStyle.p}>
            <div className={myStyle.p}>
              <div className={myStyle.p}>
                <Select03
                  name="timeSlot"
                  value={timeSlot}
                  placeholder="選擇場次"
                  options={
                    themeDetails?.sessions
                      ?.filter(
                        (session) =>
                          !dateSessionsStatus.some(
                            (s) =>
                              s.sessions_id === session.sessions_id &&
                              s.is_booked === 1
                          )
                      )
                      .map((session) => ({
                        text: `${session.start_time} - ${session.end_time}`,
                        value: session.sessions_id,
                      })) || []
                  }
                  onChange={(e) => handleSelectChange(e, 'timeSlot')}
                />
                {errors.timeSlot &&
                  errors.timeSlot._errors &&
                  errors.timeSlot._errors.map((error, index) => (
                    <span key={index} className={myStyle.error}>
                      {error}
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className={myStyle.p}>
            <Select03
              name="people"
              value={people} // 確保這裡使用了狀態變量來保存選中的人數
              placeholder="請選擇人數"
              options={Array.from(
                {
                  length:
                    themeDetails?.max_players - themeDetails?.min_players + 1,
                },
                (_, index) => ({
                  text: `${themeDetails?.min_players + index} 人`,
                  value: themeDetails?.min_players + index,
                })
              )}
              onChange={(e) => handleSelectChange(e, 'people')} // 更新所選的人數狀態
            />
            {errors.people &&
              errors.people._errors &&
              errors.people._errors.map((error, index) => (
                <span key={index} className={myStyle.error}>
                  {error}
                </span>
              ))}
          </div>

          <div className={myStyle.p}>
            <Select03
              name="discount"
              value={discount}
              placeholder="優惠項目"
              options={
                themeDetails.coupon_name && themeDetails.discount_percentage
                  ? [
                      {
                        text: `${themeDetails.coupon_name} ${themeDetails.discount_percentage}折`,
                        value: themeDetails.coupon_name,
                      },
                    ]
                  : []
              }
              onChange={(e) => handleSelectChange(e, 'discount')}
            />
          </div>
          <div className={myStyle.p}>
            <Textarea01
              value={remark}
              onChange={(e) => setRemark(e.target.value)} // 更新 remark
            />
          </div>
          <div className={myStyle.p}>
            <Radio02
              radios={[{ value: 'check', label: '請閱讀注意事項' }]}
              name="readNotice"
              value={radioValue}
              onChange={handleRadioChange}
            />
            {errors.readNotice &&
              errors.readNotice._errors &&
              errors.readNotice._errors.map((error, index) => (
                <span key={index} className={myStyle.error}>
                  {error}
                </span>
              ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button className={myStyle.booking} type="submit">
              我要預約
            </button>
          </div>
        </form>
      </div>

      {/* 注意事項彈跳視窗 */}
      <BasicModal02
        open={modalOpen}
        onClose={closeModal}
        modalTitle="注意事項"
        modalBody={
          <div>
            <p>1. 活動採包場制，不協助並團，預約須達「遊戲最低人數」。</p>
            <p>
              2.
              變更或取消預訂日期，請於預約日前一日來電通知。臨時取消將會影響您下次預約的優先權利。
            </p>
            <p>
              3.
              在遊戲人數範圍內可以臨時追加人數，不需與客服聯繫，當日將以現場人數收費。遇天災或不可抗力因素取消或變更場次，以網站公告為準。
            </p>
            <p>
              4. 請「準時到場」集合報到，現場以{' '}
              <span style={{ color: '#B99755', fontWeight: 'bold' }}>
                現金收費
              </span>{' '}
              並進行事前說明。超過表定時間未報到入場，即取消場次，開放給現場玩家預約。
            </p>
            <p>
              5.
              活動流程包含事前說明、進行密室逃脫、遊戲後故事解說（無全程謎題講解）。
            </p>
            <p>
              6.
              遊玩人數低於建議人數時難度較高，不足開場人數時將導致活動無法進行。本遊戲因場景及遊戲設計，{' '}
              <span style={{ color: '#B99755', fontWeight: 'bold' }}>
                未滿12歲、孕婦及行動不便者不得入場
              </span>
              。
            </p>
            <p>
              8.
              如因年齡未達遊戲主題限制，本工作室有權拒絕玩家入場，並不得將未成年孩童托管在場館內。如有特殊需求（嬰兒車、寵物等），請先來電詢問。
            </p>
            <p>9. 遊戲期間請勿飲食、攝影及錄音。</p>
            <p>10. 場內設置各項活動機關，請「穿著方便活動的衣物」。</p>
            <p style={{ color: '#B99755', fontWeight: 'bold' }}>
              遊戲過程中如有毀損道具及場景之行為，造成本工作室損失，將提出求償。（包含道具維修、場景修復、營業損失之費用等等）。
            </p>
          </div>
        }
        buttonLabel="我已閱讀"
        onButtonClick={closeModal}
      />
    </div>
  )
}
