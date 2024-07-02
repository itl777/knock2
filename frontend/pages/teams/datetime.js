import React, { useEffect, useState } from 'react'
import IndexLayout from '@/components/layout'
import styles from './teams.module.css'

import { TEAM_ALL } from '@/configs/api-path'

export default function DateTime() {
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  useEffect(() => {
    fetch(`${TEAM_ALL}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error('Fetch Failed')
        }
        return r.json()
      })
      .then((myData) => {
        console.log(data)
        setData(myData)
      })
      .catch((error) => {
        console.error('Fetch error:', error)
      })
  }, [])

  return (
    <>
      <IndexLayout title="糾團">
        <div>
          <h2>糾團頁面</h2>
        </div>
        <div className={styles.teamsPage}>
          <div className="container">
            <div className="row">
              <h4>團隊一覽</h4>
              <hr></hr>
            </div>
            <div className={`${styles.teamsSection} row`}>
              <table>
                <thead>
                  <tr>
                    <th>行程</th>
                    <th>團長</th>
                    <th>日期</th>
                    <th>開始時間</th>
                    <th>結束時間</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((r, i) => {
                    return (
                      <tr key={r.team_id}>
                        <td>{r.theme_name}</td>
                        <td>{r.nick_name}</td>
                        <td>{r.reservation_date}</td>
                        <td>{r.start_time}</td>
                        <td>{r.end_time}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </IndexLayout>
    </>
  )
}
