import React, { useEffect, useState } from 'react'
import moment from 'moment-timezone'

import IndexLayout from '@/components/layout'
import styles from './teams.module.css'
import Link from 'next/link'

import { TEAM_ALL } from '@/configs/api-path'

import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'

import Card from '@/components/UI/teams-card'

import PdBtnContained from '@/components/UI/pd-btn-contained'
import { IoMdPeople } from 'react-icons/io'
import { MdSchedule } from 'react-icons/md'

export default function TeamListTest() {
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
        const updatedData = {
          ...myData,
          rows: myData.rows.map((row) => ({
            ...row,
            // reservation_date: moment
              // .tz(row.reservation_date, 'Asia/Taipei')
              // .format('YYYY-MM-DD'),
            start_time: moment(row.start_time, 'HH:mm:ss').format('A hh:mm'),
          })),
        }
        console.log(updatedData)
        setData(updatedData)
      })
      .catch((error) => {
        console.error('Fetch error:', error)
      })
  }, [])

  return (
    <>
      <IndexLayout title="糾團" background="dark">
        <div className={styles.teamsPage}>
          <div className={styles.pageTitle}>
            <h2>糾團頁面</h2>
          </div>
          <div className="container">
            <div className="row">
              <h4>團隊一覽</h4>
              <hr></hr>
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
      </IndexLayout>
    </>
  )
}
