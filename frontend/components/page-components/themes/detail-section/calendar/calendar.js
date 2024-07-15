import React, { useState, useEffect, useContext } from 'react'
import dayjs from 'dayjs'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'
import { FaCircle, FaFacebook, FaInstagram } from 'react-icons/fa'
import Reservation from '../reservation/reservation'
import myStyle from './calendar.module.css'
import { DateContext } from '@/context/date-context'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [daysInMonth, setDaysInMonth] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [month, setMonth] = useState(currentDate.month())
  const [year, setYear] = useState(currentDate.year())
  const { updateSelectedDate } = useContext(DateContext)

  useEffect(() => {
    const updateDaysInMonth = () => {
      const startOfMonth = currentDate.startOf('month')
      const endOfMonth = currentDate.endOf('month')
      const startDayOfWeek = startOfMonth.day()
      const endDayOfWeek = endOfMonth.day()
      const days = []

      // 加入上個月的天數
      for (let i = startDayOfWeek; i > 0; i--) {
        days.push({
          day: startOfMonth.subtract(i, 'day').date(),
          currentMonth: false,
          status: 'prev-month',
        })
      }

      // 加入當月的天數
      for (let i = 1; i <= endOfMonth.date(); i++) {
        const date = dayjs(`${year}-${month + 1}-${i}`)
        days.push({
          day: i,
          currentMonth: true,
          status: date.isBefore(dayjs(), 'day') ? 'disabled' : 'open',
        })
      }

      // 加入下個月的天數
      for (let i = 1; i < 7 - endDayOfWeek; i++) {
        days.push({
          day: i,
          currentMonth: false,
          status: 'next-month',
        })
      }

      setDaysInMonth(days)
    }

    updateDaysInMonth()
  }, [currentDate, month, year])

  const handlePrevMonth = () => {
    const newDate = currentDate.subtract(1, 'month')
    setCurrentDate(newDate)
    setMonth(newDate.month())
    setYear(newDate.year())
  }

  const handleNextMonth = () => {
    const newDate = currentDate.add(1, 'month')
    setCurrentDate(newDate)
    setMonth(newDate.month())
    setYear(newDate.year())
  }

  const handleKeyPress = (event, handler) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handler()
    }
  }

  const handleDateClick = (day) => {
    setSelectedDate(day)
    updateSelectedDate({
      day: day.day,
      month: currentDate.month(),
      year: currentDate.year(),
    })
  }

  const renderDay = (day, index) => {
    const classes = [myStyle.date]
    if (day.status === 'prev-month') classes.push(myStyle.prevMonth)
    if (day.status === 'next-month') classes.push(myStyle.nextMonth)
    if (day.status === 'disabled') classes.push(myStyle.disabled)
    if (day.status === 'open') classes.push(myStyle.open)
    if (day.status === 'partial') classes.push(myStyle.partial)
    if (day.status === 'full') classes.push(myStyle.full)
    if (
      day.currentMonth &&
      day.day === dayjs().date() &&
      currentDate.month() === dayjs().month()
    ) {
      classes.push(myStyle.currentDay)
    }
    if (selectedDate && selectedDate.day === day.day && day.currentMonth) {
      classes.push(myStyle.selected)
    }

    return (
      <td key={index} className={classes.join(' ')}>
        <div
          onClick={() => handleDateClick(day)}
          onKeyPress={(e) => handleKeyPress(e, () => handleDateClick(day))}
          role="button"
          tabIndex="0"
          className={myStyle.dateContent}
        >
          {day.day}
        </div>
      </td>
    )
  }

  const renderWeeks = () => {
    const weeks = []
    let days = []

    daysInMonth.forEach((day, index) => {
      days.push(renderDay(day, index))
      if (days.length === 7) {
        weeks.push(<tr key={index}>{days}</tr>)
        days = []
      }
    })

    if (days.length > 0) {
      weeks.push(<tr key={days.length}>{days}</tr>)
    }

    return weeks
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-evenly">
        <div className={myStyle.calendarBg}>
          <div className={myStyle.calendar}>
            <div className="d-flex justify-content-evenly align-items-center mb-3">
              <div
                onClick={handlePrevMonth}
                onKeyPress={(e) => handleKeyPress(e, handlePrevMonth)}
                role="button"
                tabIndex="0"
              >
                <IoIosArrowDropleft className={myStyle.icon} />
              </div>
              <div>
                <h4>{dayjs(new Date(year, month)).format('MMMM YYYY')}</h4>
              </div>
              <div
                onClick={handleNextMonth}
                onKeyPress={(e) => handleKeyPress(e, handleNextMonth)}
                role="button"
                tabIndex="0"
              >
                <IoIosArrowDropright className={myStyle.icon} />
              </div>
            </div>

            <table className={myStyle.table}>
              <thead>
                <tr>
                  <td>Mo</td>
                  <td>Tu</td>
                  <td>We</td>
                  <td>Th</td>
                  <td>Fr</td>
                  <td>Sa</td>
                  <td>Su</td>
                </tr>
              </thead>
              <tbody>{renderWeeks()}</tbody>
            </table>

            <div className="mt-5 d-flex align-items-center justify-content-end mb-5">
              <div className="d-flex align-items-center justify-content-end">
                <FaCircle className={myStyle.icon2} />
                <span>場次已額滿</span>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <FaCircle className={myStyle.icon3} />
                <span>剩部分場次</span>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <FaCircle className={myStyle.icon4} />
                <span>開放預約</span>
              </div>
            </div>

            <hr className={myStyle.hr} />

            <div className="d-flex justify-content-between">
              <div className={`${myStyle.info}`}>
                <div className="mb-3">預約當日場次請來電 (･∀･)</div>
                <div>For international travelers, </div>
                <div>please send a direct message</div>
                <div>to our FB or Instagram.</div>
              </div>
              <div className="d-flex justify-content-end align-items-end">
                <FaFacebook className={myStyle.icon5} />
                <FaInstagram className={myStyle.icon5} />
              </div>
            </div>
          </div>
        </div>
        <Reservation />
      </div>
    </div>
  )
}

export default Calendar
