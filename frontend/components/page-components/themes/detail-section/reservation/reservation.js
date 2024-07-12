import React, { useState, useContext, useEffect } from 'react'
import myStyle from './reservation.module.css'
import Input02 from '@/components/UI/form-item/input02'
import Select03 from '@/components/UI/form-item/select03'
import { DateContext } from '@/context/date-context'
import Box from '@mui/joy/Box'
import Checkbox from '@mui/joy/Checkbox'
import FormControl from '@mui/joy/FormControl'
import Autocomplete from '@mui/joy/Autocomplete'

export default function Reservation() {
  const { selectedDate } = useContext(DateContext)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [date, setDate] = useState('')

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

  // 場次時間
  // One time slot every 30 minutes.
  const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) =>
      `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${
        index % 2 === 0 ? '00' : '30'
      }`
  )

  return (
    <div className={myStyle.reservationrBg}>
      <div className={myStyle.form}>
        <div className={myStyle.p}>
          <Input02
            className={myStyle.p}
            name="name"
            type="text"
            value={name}
            placeholder="姓名"
            onChange={handleNameChange}
          />
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
        </div>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Checkbox label=" 同會員資料" sx={{ color: ' #B99755', mt: 3 }} />
        </Box>
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

        <FormControl id="disabled-options-demo" className={myStyle.p}>
          <Autocomplete
            options={timeSlots}
            placeholder="選擇場次時間"
            getOptionDisabled={(option) =>
              option === timeSlots[0] || option === timeSlots[2]
            }
            sx={{
              width: 500,
              border: '2px solid #B99755',
              height: 40,
              background: '#222222',
              color: '#B99755',
            }}
          />
        </FormControl>
        <Select03 />
      </div>
    </div>
  )
}
