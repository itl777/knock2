import React, { useEffect, useState } from 'react'
import IndexLayout from '@/components/layout'
import styles from './teams.module.css'
// import TeamList from '@/components/page-components/teams/teamlist'

import { TEAM_LIST } from '@/configs/team-api-path'

export default function TeamListTest() {
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  useEffect(() => {
    fetch(`${TEAM_LIST}`)
      .then((r) => r.json())
      .then((myData) => {
        console.log(data)
        setData(myData)
      })
  }, [])

  return (
    <>
      <IndexLayout title="糾團">
        <div>
          <h2>糾團頁面</h2>
        </div>
        <div className={styles.teamsPage}>
          {data.rows.map((r, i) => {
            return (
              <div key={r.team_id}>
                <h4>團隊名稱：{r.team_title}</h4>
                <p>
                  隊長：{r.leader_id}
                  <br />
                  行程編號：{r.tour}
                </p>
              </div>
            )
          })}
        </div>
      </IndexLayout>
    </>
  )
}
