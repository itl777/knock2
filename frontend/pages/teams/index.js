import React, { useEffect, useState } from 'react'

import IndexLayout from '@/components/layout'
import styles from './teams.module.css'

import { useAuth } from '@/context/auth-context'
import { TEAM_ALL } from '@/configs/api-path'

import Card from '@/components/UI/teams-card'

import TeamList from './teamlist'



import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'

export default function TeamPage() {
  const { login, logout, auth } = useAuth()

  const [userData, setUserData] = useState({
    success: false,
    rows: [],
  })

  const [isLoading, setIsLoading] = useState(true)

  // 登入者的團隊
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${TEAM_ALL}/${auth.id}`)
        if (!res.ok) {
          throw new Error('Fetch Failed')
        }

        const myData = await res.json()
        setUserData(myData)
        setIsLoading(false)
      } catch (error) {
        console.error('Fetch error:', error)
        setIsLoading(false)
      }
    }
    fetchUserData()
  }, [auth.id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <IndexLayout title="糾團" background="dark">
        <div className={styles.teamsPage}>
          <div className={styles.pageTitle}>
            <h2>糾團頁面</h2>
          </div>
          <div className="container">
            <div className="row">
              目前登入者：{auth.nickname}
              <br />
              id = {auth.id}
            </div>
            <div className="row">
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography>我想開團</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="row">
                      <h4>您的團隊</h4>
                      {userData.rows.map((r, i) => {
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
                              nick_name={r.nick_name}
                              reservation_date={r.reservation_date}
                              start_time={r.start_time}
                              team_title={r.team_title}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <TeamList />
        </div>
      </IndexLayout>
    </>
  )
}
