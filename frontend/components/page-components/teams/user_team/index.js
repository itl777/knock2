import React from 'react'
import styles from '@/components/page-components/teams/teams.module.css'

import {
  GET_DATA,
  GET_ALL_MEMBER,
  GET_USER_DATA,
  USER_JOIN_TEAM,
} from '@/configs/api-path'
import { useFetch } from '@/hooks/useTeamFetch'
import ReserDisplay from './reser_display'
import TeamTable from './team_table'

import Link from 'next/link'

import moment from 'moment-timezone'

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from './mui_style'

export default function UserTeam({ auth }) {
  const { data: allTeamData, isLoading: isAllTeamDataLoading } =
    useFetch(GET_DATA)
  const { data: userData, isLoading: isUserDataLoading } = useFetch(
    `${GET_USER_DATA}${auth.id}`
  )
  const { data: joinTeamData, isLoading: isJoinTeamDataLoading } = useFetch(
    `${USER_JOIN_TEAM}${auth.id}`
  )
  const { data: teamMemberData, isLoading: isTeamMemberDataLoading } =
    useFetch(GET_ALL_MEMBER)

  const formatDateToTaiwan = (dateString) => {
    return moment(dateString).tz('Asia/Taipei').format('YYYY/MM/DD')
  }
  const formatTime = (timeString) => {
    return moment(timeString, 'HH:mm:ss').format('A hh:mm')
  }

  if (
    isUserDataLoading ||
    isJoinTeamDataLoading ||
    isTeamMemberDataLoading ||
    isAllTeamDataLoading
  ) {
    return <div>Now Loading...</div>
  }

  // 加入的隊伍
  const filteredTeams =
    allTeamData?.rows?.filter((team) =>
      joinTeamData?.data?.some(
        (member) =>
          member.join_team_id === team.team_id &&
          member.join_user_id === auth.id
      )
    ) || []

  // 計算隊員數量
  const teamMemberCount = {}
  teamMemberData?.data?.forEach((member) => {
    if (teamMemberCount[member.join_team_id]) {
      teamMemberCount[member.join_team_id]++
    } else {
      teamMemberCount[member.join_team_id] = 1
    }
  })

  return (
    <>
      <div className={styles.teamsPage}>
        <div className="container">
          <div className="row pb-3">
            <Accordion>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="div">您的團隊</Typography>
              </AccordionSummary>
              <AccordionDetails component="div">
                <Typography component="div">
                  <div
                    className="row"
                    style={{
                      borderTop: '1px solid #B99755',
                      paddingTop: '10px',
                    }}
                  >
                    <div
                      className={`col-12 col-lg-6 ${styles.teamlistblock} ${styles.teamlistblock1}`}
                    >
                      <h4 className={styles.teamPaTitle}>您帶領的團隊</h4>

                      <div className={styles.titleBL}></div>
                      {userData.success ? (
                        <>
                          <TeamTable
                            Data={userData}
                            MemberCount={teamMemberCount}
                          />
                        </>
                      ) : (
                        <div className={styles.noDataInfo}>
                          您還沒有開團記錄
                        </div>
                      )}
                      <div className={styles.bb2}></div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <h4 className={styles.teamPaTitle}>您參加的團隊</h4>

                      <div className={styles.titleBL}></div>

                      {joinTeamData?.success && filteredTeams.length > 0 ? (
                        <table className={styles.teamTable}>
                          <thead>
                            <tr>
                              <th>團名</th>
                              <th>行程</th>
                              <th>日期時間</th>
                              <th>人數</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredTeams.map((r) => {
                              return (
                                <>
                                  <tr key={r.team_id}>
                                    <td>
                                      {' '}
                                      <Link href={`/teams/${r.team_id}`}>
                                        {r.team_title}
                                      </Link>
                                    </td>
                                    <td>{r.theme_name}</td>
                                    <td>
                                      {formatDateToTaiwan(r.reservation_date)}{' '}
                                      {formatTime(r.start_time)}
                                    </td>
                                    <td>
                                      {teamMemberCount[r.team_id] || 0} /{' '}
                                      {r.team_limit}
                                    </td>
                                  </tr>
                                </>
                              )
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <div className={styles.noDataInfo}>
                          您還沒有加入團隊
                        </div>
                      )}
                    </div>
                    <div className={styles.bb}></div>
                  </div>
                  <ReserDisplay user_id={auth.id} />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}
