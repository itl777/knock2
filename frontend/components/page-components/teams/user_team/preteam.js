import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import moment from 'moment-timezone'

// import { useAuth } from '@/context/auth-context';
import { NO_TEAM } from '@/configs/api-path'

import PdBtnContained from '@/components/UI/pd-btn-contained'

export default function PreTeam({ user_id = '' }) {
  const [noTeamData, setNoTeamData] = useState({
    success: false,
    rows: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  const formatDateToTaiwan = (dateString) => {
    return moment(dateString).tz('Asia/Taipei').format('YYYY年MM月DD日')
  }

  const formatTime = (timeString) => {
    return moment(timeString, 'HH:mm:ss').format('A hh:mm')
  }

  useEffect(() => {
    const fetchNoTeamData = async () => {
      try {
        const res = await fetch(`${NO_TEAM}${user_id}`)
        if (!res.ok) {
          throw new Error('Fetch Failed')
        }

        const myData = await res.json()
        setNoTeamData(myData)
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }

    const fetchData = async () => {
      await Promise.all([fetchNoTeamData()])
      setIsLoading(false)
    }

    fetchData()
  }, [user_id])

  if (isLoading) {
    return <div>Now Loading...</div>
  }

  return (
    <div className="row">
      <h4>已預約的行程</h4>
      {noTeamData.success ? (
        <table>
          <thead>
            <tr>
              <th>日期</th>
              <th>行程</th>
              <th>團名</th>
              <th>人數</th>
              <th>修改</th>
            </tr>
          </thead>
          <tbody>
            {noTeamData.rows.map((r) => (
              <tr key={r.reservation_id}>
                <td>
                  {formatDateToTaiwan(r.reservation_date)}{' '}
                  {formatTime(r.start_time)}
                </td>
                <td>{r.theme_name}</td>
                <td></td>
                <td></td>
                <td>
                  <Link
                    href={`/teams/add_team?reservation_id=${r.reservation_id}`}
                  >
                    <PdBtnContained btnText="我要開團" color="black" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>無資料</p>
      )}
    </div>
  )
}
