import React, { useEffect, useState } from 'react'
import styles from '@/pages/teams/teams.module.css'

import { useAuth } from '@/context/auth-context'
import { GET_USER_DATA } from '@/configs/api-path'
import PreTeam from './preteam'

import Link from 'next/link'
import moment from 'moment-timezone'

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from './mui_style'

// import PdBtnContained from '@/components/UI/pd-btn-contained'

export default function UserTeam() {
  const { auth } = useAuth()

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
        const res = await fetch(`${GET_USER_DATA}${auth.id}`)
        if (!res.ok) {
          throw new Error('Fetch Failed')
        }

        const myData = await res.json()
        setUserData(myData)
      } catch (error) {
        console.error('Fetch error:', error)
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
          {/* <div className="row">
            目前登入者：{auth.nickname}
            <br />
            id = {auth.id}
          </div> */}
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
                  {userData.success ? (
                    <>
                      <div className="row">
                        <h4>您帶領的團隊</h4>
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
                                    <td>目前 / {r.team_limit}</td>
                                    <td>
                                      <Link href={`/teams/${r.team_id}`}>
                                        管理團隊
                                      </Link>
                                    </td>
                                  </tr>
                                </>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                      <p>&nbsp;</p>
                      <h4>您參加的團隊</h4>
                      <p>&nbsp;</p>
                    </>
                  ) : (
                    <p>
                      沒有參與隊伍的紀錄
                      <br />
                      <br />
                    </p>
                  )}

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
