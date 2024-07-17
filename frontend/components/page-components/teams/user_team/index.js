import React, { useEffect, useState } from 'react'
import styles from '@/pages/teams/teams.module.css'

import { useAuth } from '@/context/auth-context'
import { GET_DATA } from '@/configs/api-path'
import { GET_USER_DATA } from '@/configs/api-path'
import PreTeam from './preteam'

import Link from 'next/link'
import moment from 'moment-timezone'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'

import PdBtnContained from '@/components/UI/pd-btn-contained'

export default function UserTeam() {
  const { login, logout, auth } = useAuth()

  const [userData, setUserData] = useState({
    success: false,
    rows: [],
  })

  const formatDateToTaiwan = (dateString) => {
    return moment(dateString).tz('Asia/Taipei').format('YYYY年MM月DD日')
  }
  const formatTime = (timeString) => {
    return moment(timeString, 'HH:mm:ss').format('A hh:mm')
  }

  const [isLoading, setIsLoading] = useState(true)

  // 登入者的團隊
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${GET_USER_DATA}/${auth.id}`)
        if (!res.ok) {
          throw new Error('Fetch Failed')
        }

        const myData = await res.json()
        setUserData(myData)
        // setIsLoading(false)
      } catch (error) {
        console.error('Fetch error:', error)
        // setIsLoading(false)
      }
    }

    const fetchData = async () => {
      await Promise.all([fetchUserData()])
      setIsLoading(false)
    }

    fetchData()
  }, [auth.id])

  if (isLoading) {
    return <div>Now Loading...</div>
  }

  return (
    <>
      <div className={styles.teamsPage}>
        <div className="container">
          <div className="row">
            目前登入者：{auth.nickname}
            <br />
            id = {auth.id}
          </div>
          {/* User Teams */}
          <div className="row pb-3">
            <Accordion>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>您的團隊</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="row">
                    {/* <h4>您的團隊</h4> */}
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
                        {userData.rows.map((r, i) => {
                          return (
                            <>
                              <tr key={r.team_id}>
                                <td>
                                  {formatDateToTaiwan(r.reservation_date)}{' '}
                                  {formatTime(r.start_time)}
                                </td>
                                <td>{r.theme_name}</td>
                                <td>{r.team_title}</td>
                                <td></td>
                                <td>
                                  <Link href={`/teams/${r.team_id}`}>
                                    <PdBtnContained
                                      btnText="查看詳情"
                                      color="black"
                                    />
                                  </Link>
                                </td>
                              </tr>
                            </>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <PreTeam user_id={auth.id} />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}
