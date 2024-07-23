import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import moment from 'moment-timezone'
import styles from '@/pages/teams/teams.module.css'

// import { useAuth } from '@/context/auth-context';
import { NO_TEAM } from '@/configs/api-path'

// import PdBtnContained from '@/components/UI/pd-btn-contained'

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
      <h4 style={{ textAlign: 'center' }}>已預約的行程</h4>
      {noTeamData.success ? (
        <>
          {noTeamData.rows.map((r) => (
            <div className="col-sm-4 col-12" key={r.reservation_id}>
              <div className="row">
                <div className="col-9">
                  日期時間
                  <br />
                  {formatDateToTaiwan(r.reservation_date)}{' '}
                  {formatTime(r.start_time)}
                </div>
                <div className="col-3">
                  行程
                  <br />
                  {r.theme_name}
                </div>
              </div>
              <div
                style={{ textAlign: 'center', marginTop: '12px' }}
                className="row"
              >
                <Link
                  href={`/teams/add_team?reservation_id=${r.reservation_id}`}
                >
                  <button className={styles.buttonBrown}>我要開團</button>
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>沒有其他預定行程</p>
      )}
    </div>
  )
}
