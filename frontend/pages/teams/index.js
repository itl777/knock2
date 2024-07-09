import React, { useEffect, useState } from 'react'
import moment from 'moment-timezone'

import IndexLayout from '@/components/layout'
import styles from './teams.module.css'
import Link from 'next/link'

import { useAuth } from '@/context/auth-context'
import { TEAM_ALL } from '@/configs/api-path'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'

import Card from '@/components/UI/teams-card'

export default function TeamListTest() {
  
  const { login, logout, auth } = useAuth()

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
        // console.log(data)
        setData(myData)
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
          <div className='row'>
            目前登入者：{auth.nickname}
          </div>

            <div className='row'>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography>我想開團</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>a
                  <Card />
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>篩選團隊</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>b
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>

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

            <div className='row'>
            </div>
          </div>
        </div>
      </IndexLayout>
    </>
  )
}
