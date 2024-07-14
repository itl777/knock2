import React, { useEffect, useState } from 'react'

import IndexLayout from '@/components/layout'
import styles from './teams.module.css'

import { TEAM_ALL } from '@/configs/api-path'
import Card from '@/components/UI/teams-card'


export default function TeamList() {
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
        setData(myData)
      })
      .catch((error) => {
        console.error('Fetch error:', error)
      })
  }, [])

  return (
    <>
      <div className={styles.teamsPage}>
        <div className="container">
          <div className="row">
            <h4>團隊一覽</h4>
            <hr />
          </div>
          <div className="row">
            {data.rows.map((r, i) => {
              return (
                <div className="col-12 col-md-6 col-lg-4" key={r.team_id}>
                  <Card
                    team_id={r.team_id}
                    key={r.team_id}
                    branchName={r.branch_name}
                    themeImg={r.theme_img}
                    themeName={r.theme_name}
                    difficulty={r.difficulty}
                    suitablePlayers={r.suitable_players}
                    themeTime={r.theme_Time}
                    rick_name={r.nick_name}
                    reservation_date={r.reservation_date}
                    start_time={r.start_time}
                    team_title={r.team_title}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
