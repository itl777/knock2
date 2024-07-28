import React from 'react'
import Link from 'next/link'
import moment from 'moment-timezone'
import styles from '@/components/page-components/teams/teams.module.css'
import { useFetch } from '@/hooks/useTeamFetch'
import { NO_TEAM } from '@/configs/api-path'

export default function PreTeam({ user_id = '' }) {
  const formatDateToTaiwan = (dateString) => {
    return moment(dateString).tz('Asia/Taipei').format('YYYY年MM月DD日')
  }

  const formatTime = (timeString) => {
    return moment(timeString, 'HH:mm:ss').format('A hh:mm')
  }

  const { data: noTeamData, isLoading: isNoTeamDataLoading } = useFetch(
    `${NO_TEAM}${user_id}`
  )
  if (isNoTeamDataLoading) {
    return <div>Now Loading...</div>
  }

  return (
    <>
      <div className="row">
        <h4 className={styles.teamPaTitle}>已預約的行程</h4>
        <div className={styles.titleBL}></div>
      </div>

      <div className="row">
        {noTeamData.success ? (
          <>
            {noTeamData.rows.map((r) => (
              <div
                className={`col-lg-6 col-12 ${styles.preteamcard}`}
                key={r.reservation_id}
              >
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
                    <button className={styles.teamButton}>我要開團</button>
                  </Link>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className={styles.noDataInfo}>
              沒有預訂行程，要不要<Link href="/themes">趕快預訂</Link>呢？
            </div>
          </>
        )}
      </div>
    </>
  )
}
