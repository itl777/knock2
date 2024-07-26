import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import IndexLayout from '@/components/layout'
import { useAuth } from '@/context/auth-context'
import Image from 'next/image'
import { AspectRatio } from '@mui/joy'

import BasicModal02 from '../../components/page-components/teams/team-modal-2'

import TeamMemberComponent from '../../components/page-components/teams/member'
import ChatArea from '@/components/page-components/teams/chat_area'

import { API_SERVER, ONE_TEAM, GET_MEMBER, JOIN_TEAM } from '@/configs/api-path'

import styles from '@/components/page-components/teams/teams.module.css'
import useDateFormatter from '@/hooks/useDateFormatter'
import Link from 'next/link'

export default function TeamInfo() {
  const router = useRouter()
  const { auth } = useAuth()
  const [teamData, setTeamData] = useState([])
  const [isMember, setIsMember] = useState(false)
  const [showMembers, setShowMembers] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [memberCount, setMemberCount] = useState(0)
  const [memberData, setMemberData] = useState([])
  const { formatDateToTaiwan, formatTime } = useDateFormatter()

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
        setMemberCount(data.data.length)
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

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  if (!teamData) {
    return <div>Loading...</div>
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
                  <div className="col-12 col-md-3">
                    <div className={styles.teamTitle}>
                      <h3>
                        <Link
                          href={`/themes/themes-details/${teamData.theme_id}`}
                        >
                          {teamData.theme_name}
                        </Link>
                      </h3>
                    </div>
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
                  <div
                    className={`col-12 ${
                      showMembers ? 'col-md-6' : 'col-md-9'
                    }`}
                  >
                    <h5>團名：{teamData.team_title}</h5>
                    <p>
                      冒險時間：
                      {formatDateToTaiwan(teamData.reservation_date)}{' '}
                      {formatTime(teamData.start_time)}
                      <br />
                      冒險長度：{teamData.theme_Time} 分鐘
                      <br />
                      地區：{teamData.branch_name}
                      <br />
                      申請人數/人數上限：{memberCount}/ {teamData.team_limit}
                    </p>
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
                  {showMembers && (
                    <div className="col-12 col-md-3">
                      <TeamMemberComponent
                        team_id={router.query.team_id}
                        team_limit={teamData.team_limit}
                        onMemberCountChange={setMemberCount}
                      />
                    </div>
                  )}
                </div>

                <div className="row">
                  {!auth.id ? (
                    <></>
                  ) : (
                    <div style={{ textAlign: 'center', paddingTop: '24px' }}>
                      {auth.id === teamData.user_id ? (
                        <>
                          <button
                            // onClick={openModal}
                            onClick={handleTeamSetting}
                            className={styles.buttonBrown}
                          >
                            管理團員
                          </button>
                        </>
                      ) : isMember ? (
                        <div>您已申請加入此團隊</div>
                      ) : (
                        <>
                          <button
                            onClick={handleJoinTeam}
                            className={styles.buttonBrown}
                          >
                            申請加入
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <>
            <div className="container">
              <ChatArea chat_at={teamData.team_id} chat_by={auth.id} />
            </div>
          </>
        </div>
      </IndexLayout>
    </>
  )
}
