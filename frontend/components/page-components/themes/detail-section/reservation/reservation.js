import React, { useState, useContext, useEffect } from 'react'
import myStyle from './reservation.module.css'
import Input02 from '@/components/UI/form-item/input02'
import Select03 from '@/components/UI/form-item/select03'
import { DateContext } from '@/context/date-context'
import Box from '@mui/joy/Box'
import Checkbox from '@mui/joy/Checkbox'
import Textarea01 from '@/components/UI/form-item/textarea01'
import Radio02 from '@/components/UI/form-item/radio02'
import { FaGhost } from 'react-icons/fa'
import { z } from 'zod'

const schemaForm = z.object({
  name: z
    .string()
    .min(2, {
      message: '請填寫姓名，長度為 2 ~ 20 個字元',
    })
    .max(20, {
      message: '請填寫姓名，長度為 2 ~ 20 個字元',
    }),
  mobile: z
    .string({
      message: '請填寫正確電話號碼',
    })
    .nullable()
    .transform((val) => (val ? val.replace(/-/g, '') : ''))
    .refine(
      (val) => {
        if (val === '') return true
        const mobilePattern = /^09\d{2}\d{3}\d{3}$/
        return mobilePattern.test(val)
      },
      {
        message: '請填寫正確電話號碼',
      }
    ),
})

export default function Reservation() {
  const { selectedDate } = useContext(DateContext)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [date, setDate] = useState('')
  const [radioValue, setRadioValue] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = `${selectedDate.year}-${selectedDate.month + 1}-${
        selectedDate.day
      }`
      setDate(formattedDate)
    }
  }, [selectedDate])

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleMobileChange = (e) => {
    setMobile(e.target.value)
  }

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value)
    console.log(`Name: ${e.target.name}, Value: ${e.target.value}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = { name, mobile }
    const result = schemaForm.safeParse(formData)

    if (!result.success) {
      const formattedErrors = result.error.format()
      setErrors(formattedErrors)
    } else {
      setErrors({})
      console.log('表單數據:', formData)
      // 提交表單數據
    }
  }

  const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) =>
      `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${
        index % 2 === 0 ? '00' : '30'
      }`
  )

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
            {errors.name && (
              <span className={myStyle.error}>
                {errors.name._errors.join(', ')}
              </span>
            )}
          </div>
          <div className={myStyle.p}>
            <Input02
              className={myStyle.p}
              name="mobile"
              type="text"
              value={mobile}
              placeholder="手機號碼"
              onChange={handleMobileChange}
            />
            {errors.mobile && (
              <span className={myStyle.error}>
                {errors.mobile._errors.join(', ')}
              </span>
            )}
          </div>
          <div>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Checkbox label="同會員資料" sx={{ color: '#B99755', mt: 3 }} />
            </Box>
          </div>
          <div className={myStyle.p}>
            <Input02
              className={myStyle.p}
              name="date"
              type="text"
              value={date}
              placeholder="預約日期(請點選日曆)"
              readOnly
            />
          </div>
          <div className={myStyle.p}>
            <Select03
              name="timeSlot"
              value=""
              placeholder="選擇場次"
              options={timeSlots}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className={myStyle.p}>
            <Select03
              name="people"
              value=""
              placeholder="請選擇人數"
              options={[1, 2, 3, 4, 5]}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className={myStyle.p}>
            <Select03
              name="discount"
              value=""
              placeholder="優惠項目"
              options={['無', '學生', '會員', 'VIP']}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className={myStyle.p}>
            <Textarea01 />
          </div>
          <div className={myStyle.p}>
            <Radio02
              radios={[{ value: 'check', label: '請閱讀注意事項' }]}
              name="readNotice"
              value={radioValue}
              onChange={handleRadioChange}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button className={myStyle.booking} type="submit">
              我要預約
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
