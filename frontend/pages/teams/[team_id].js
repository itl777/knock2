import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment-timezone'
import IndexLayout from '@/components/layout'
import { useAuth } from '@/context/auth-context'
import Image from 'next/image'
import { AspectRatio } from '@mui/joy'

import ChatArea from '@/components/page-components/teams/chat_area'

import { API_SERVER, ONE_TEAM, GET_MEMBER, JOIN_TEAM } from '@/configs/api-path'

import styles from './teams.module.css'
import PdBtnContained from '@/components/UI/pd-btn-contained'

export default function TeamInfo() {
  const router = useRouter()
  const { auth } = useAuth()
  const [teamData, setTeamData] = useState([])
  const [memberData, setMemberData] = useState([])
  const [showMembers, setShowMembers] = useState(false)
  const [isMember, setIsMember] = useState(false)

  const fetchTeamData = async (team_id) => {
    const url = ONE_TEAM + team_id
    try {
      const res = await fetch(url)
      const data = await res.json()

      if (data.success) {
        setTeamData(data.data)
        console.log('成功取得團隊資料', data.data)
      } else {
        console.error('取得團隊資料失敗:', data.error)
      }
    } catch (error) {
      console.error('取得團隊資料時發生錯誤:', error)
    }
  }

  const fetchMemberData = async (team_id) => {
    const url = GET_MEMBER + team_id
    try {
      const res = await fetch(url)
      const data = await res.json()

      if (data.success) {
        setMemberData(data.data)
        console.log('成功取得團員資料', data.data)

        const isUserMember = data.data.some(
          (member) => member.join_user_id === auth.id
        )
        setIsMember(isUserMember)
      } else {
        console.error('團員資料取得失敗:', data.error)
      }
    } catch (error) {
      console.error('取得團員資料時發生錯誤:', error)
    }
  }
  const handleTeamSetting = () => {
    setShowMembers(!showMembers)
  }

  const handleJoinTeam = async () => {
    const { team_id } = router.query

    const joinData = {
      join_team_id: team_id,
      join_user_id: auth.id,
    }

    try {
      const res = await fetch(JOIN_TEAM, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(joinData),
      })

      const result = await res.json()

      if (result.success) {
        // 更新成員資料
        await fetchMemberData(team_id)
        alert('成功加入團隊')
      } else {
        console.error('加入團隊失敗:', result.error)
        alert('加入團隊失敗')
      }
    } catch (error) {
      console.error('Error joining team:', error)
      alert('加入團隊時發生錯誤')
    }
  }
  useEffect(() => {
    if (router.isReady) {
      const { team_id } = router.query
      if (team_id) {
        fetchTeamData(team_id)
        fetchMemberData(team_id)
      }
    }
  }, [router.isReady])

  const formatDateToTaiwan = (dateString) => {
    return moment(dateString).tz('Asia/Taipei').format('YYYY年MM月DD日')
  }

  const formatTime = (timeString) => {
    return moment(timeString, 'HH:mm:ss').format('A hh:mm')
  }
  if (!teamData) {
    return <p>Loading...</p>
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
              <div className={styles.borderbox} key={teamData.team_id}>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="teamTitle">
                      <h3>{teamData.theme_name}</h3>
                      {/* <span className={`${getDifficulty(teamData.difficulty)}`}>
                        {teamData.difficulty}
                      </span> */}
                    </div>
                    <h5>團名：{teamData.team_title}</h5>
                    <p>
                      冒險時間：{formatDateToTaiwan(teamData.reservation_date)}{' '}
                      {formatTime(teamData.start_time)}
                      <br />
                      冒險長度：{teamData.theme_Time} 分鐘
                      <br />
                      地區：{teamData.branch_name}
                      <br />
                      人數/上限：{memberData.length}/ {teamData.team_limit}
                    </p>
                    {showMembers && (
                      <div>
                        團員：
                        {memberData.map((member) => (
                          <span key={member.join_user_id}>
                            {member.nick_name} ,
                          </span>
                        ))}
                      </div>
                    )}
                    <hr />
                    <p>
                      團長
                      <br />
                      {teamData.nick_name}
                      <br />
                      <Image
                        src={
                          teamData.avatar
                            ? `${API_SERVER}/avatar/${teamData.avatar}`
                            : ''
                        }
                        height={40}
                        width={40}
                        alt={`${teamData.nick_name} avatar`}
                      />
                      ：{teamData.team_note}
                    </p>
                  </div>
                  <div className="col-12 col-md-6">
                    {' '}
                    <div className="teamPhoto">
                      <AspectRatio ratio="375/240">
                        <Image
                          src={`/themes-main/${teamData.theme_img}`}
                          alt=""
                          width={'579'}
                          height={'415'}
                        />
                      </AspectRatio>
                    </div>
                  </div>
                  {!auth.id ? (
                    <></>
                  ) : (
                    <div style={{ textAlign: 'center', paddingTop: '24px' }}>
                      {auth.id === teamData.user_id ? (
                        <PdBtnContained
                          btnText="管理團員"
                          color="grey"
                          onClick={handleTeamSetting}
                        />
                      ) : isMember ? (
                        <p>您已申請加入此團隊</p>
                      ) : (
                        <PdBtnContained
                          btnText="申請加入"
                          color="grey"
                          onClick={handleJoinTeam}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <>
              <ChatArea chat_at={teamData.team_id} chat_by={auth.id} />
            </>
          </div>
        </div>
      </IndexLayout>
    </>
  )
}
