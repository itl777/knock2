import React from 'react'
import Link from 'next/link'
import styles from '@/components/page-components/teams/teams.module.css'

import { formatDateToTaiwan, formatTime } from '@/hooks/useDateFormatter.js'

const TeamTable = ({ Data, MemberCount }) => {
  return (
    <table className={styles.teamTable}>
      <thead>
        <tr>
          <th>團名</th>
          <th>行程</th>
          <th>日期時間</th>
          <th>人數</th>
        </tr>
      </thead>
      <tbody>
        {Data.map((r) => (
          <tr key={r.team_id}>
            <td>
              <Link href={`/teams/${r.team_id}`}>{r.team_title}</Link>
            </td>
            <td>{r.theme_name}</td>
            <td style={{ minWidth: '150px' }}>
              {formatDateToTaiwan(r.reservation_date)}{' '}
              {formatTime(r.start_time)}
            </td>
            <td>
              {MemberCount[r.team_id] || 0} / {r.team_limit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TeamTable
