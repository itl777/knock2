import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment-timezone'
import IndexLayout from '@/components/layout'
import { useAuth } from '@/context/auth-context'

import AddChatForm from '@/pages/teams/add_chat'
import ChatDisplay from '@/pages/teams/display_chat'

import { ONE_TEAM } from '@/configs/api-path'

import styles from './teams.module.css'
import PdBtnContained from '@/components/UI/pd-btn-contained'

export default function TeamInfo() {
  const router = useRouter()

  const { login, logout, auth } = useAuth()

  const [oneTeam, setOneTeam] = useState({
    team_id: 0,
    theme_name: '',
    team_title: '',
    nick_name: '',
    difficulty: '',
    branch_name: '',
    reservation_date: '',
    themeTime: 0,
  })

  const [submissionCount, setSubmissionCount] = useState(0)

  const formatDateToTaiwan = (dateString) => {
    return moment(dateString).tz('Asia/Taipei').format('YYYY年MM月DD日')
  }

  const formatTime = (timeString) => {
    return moment(timeString, 'HH:mm:ss').format('A hh:mm')
  }

  const getDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return styles.diffeasy
      case 'MEDIUM':
        return styles.diffmedium
      case 'HARD':
        return styles.diffhard
      default:
        return styles.difficulty
    }
  }

  const getTeam = async (team_id) => {
    const url = ONE_TEAM + team_id

    try {
      const res = await fetch(url)
      //
      const resData = await res.json()

      // if (resData.status === 'success') {
      //   // 檢查是否為物件資料類型(基本保護)
      //   if (resData.data.oneTeam.team_id) {
      //     // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)
      //     setOneTeam(resData.data.oneTeam)
      //   }
      // }
      if (resData.success) {
        const teamData = resData.data
        if (teamData && teamData.team_id) {
          setOneTeam({
            branch_name: teamData.branch_name || '',
            difficulty: teamData.difficulty || '',
            end_time: teamData.end_time || '',
            nick_name: teamData.nick_name || '',
            reservation_date: teamData.reservation_date || '',
            start_time: teamData.start_time || '',
            team_id: teamData.team_id || 0,
            team_title: teamData.team_title || '',
            theme_name: teamData.theme_name || '',
            themeImg: teamData.theme_img || '',
            themeTime: teamData.theme_Time || '',
          })
          console.log('Team data set successfully', teamData)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query)
      const { team_id } = router.query
      getTeam(team_id)
      console.log(oneTeam)
    }
    //
  }, [router.isReady, submissionCount])

  const handleFormSubmit = () => {
    setSubmissionCount((prevCount) => prevCount + 1)
  }

  return (
    <>
      <IndexLayout title="糾團" background="dark">
        <div className={styles.teamsPage}>
          <div className="container">
            <div className={styles.pageTitle}>
              <h2>團隊內頁</h2>
            </div>
            <div className={`${styles.teamsSection} row`}>
              <div className={styles.borderbox} key={oneTeam.team_id}>
                <div className="row">
                  <div className="col-9">
                    <div className="teamTitle">
                      <h3>{oneTeam.theme_name}</h3>
                      <span className={`${getDifficulty(oneTeam.difficulty)}`}>
                        {oneTeam.difficulty}
                      </span>
                    </div>
                    <h5>團名：{oneTeam.team_title}</h5>
                    <p>
                      團長：{oneTeam.nick_name}
                      <br />
                      日期時間：{formatDateToTaiwan(
                        oneTeam.reservation_date
                      )}{' '}
                      {formatTime(oneTeam.start_time)}
                      <br />
                      時間長度：{oneTeam.themeTime} 分鐘
                      <br />
                      場次：{oneTeam.branch_name}
                      <br />
                      人數：2 / 6
                    </p>
                    <p>
                      團長的話
                      <br />
                    </p>
                  </div>
                  <div className="col-3">
                    {' '}
                    <div className="teamPhoto">
                      {/* <img src={catImage} alt="cat" /> */}
                      <img
                        src={`/themes-main/${oneTeam.themeImg}`}
                        alt=""
                        width={'100%'}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <PdBtnContained
                      btnText="申請加入 / 管理團員"
                      color="grey"
                    />
                  </div>
                </div>
              </div>
            </div>
            <>
              <AddChatForm
                chat_at={oneTeam.team_id}
                chat_by={auth.id}
                onSubmit={handleFormSubmit}
              />
            </>
            <>
              <ChatDisplay
                chat_at={oneTeam.team_id}
                submissionCount={submissionCount}
              />
            </>
          </div>
        </div>
      </IndexLayout>
    </>
  )
}
