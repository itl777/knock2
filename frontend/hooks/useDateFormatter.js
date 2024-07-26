import { useCallback } from 'react'
import moment from 'moment-timezone'

const useDateFormatter = () => {
  const formatDateToTaiwan = useCallback((dateString) => {
    return moment(dateString).tz('Asia/Taipei').format('YYYY年MM月DD日')
  }, [])

  const formatTime = useCallback((timeString) => {
    return moment(timeString, 'HH:mm:ss').format('A hh:mm')
  }, [])

  return { formatDateToTaiwan, formatTime }
}

export default useDateFormatter
