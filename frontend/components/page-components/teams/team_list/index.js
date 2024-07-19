import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { GET_DATA } from '@/configs/api-path'

import styles from '@/pages/teams/teams.module.css'
import Card from '@/components/UI/teams-card'
import MyPagination from './pagination'

export default function TeamList() {
  const router = useRouter()

  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [branchId, setBranchId] = useState('')
  const [order, setOrder] = useState('')
  const [teamStatus, setTeamStatus] = useState('')
  // const [perPage] = useState(6)

  const fetchData = async () => {
    const params = new URLSearchParams({ page })

    if (branchId) {
      params.append('branch_id', branchId)
    }
    if (order) {
      params.append('order', order)
    }
    if (teamStatus) {
      params.append('team_status', teamStatus)
    }
    try {
      const response = await fetch(`${GET_DATA}?${params.toString()}`)
      const result = await response.json()
      const { rows, totalPages } = result
      setData({ success: true, rows })
      setTotalPages(totalPages)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [branchId, order, teamStatus, page])

  return (
    <>
      <div className={styles.teamsPage}>
        <div className="container">
          <div className="row">
            <h4>團隊一覽</h4>
            <hr />
          </div>

          {/* 篩選排序 */}
          <div className="row pb-5">
            <h4>篩選排序</h4>
            <div className="col-12 col-md-6 col-lg-4">
              <label>
                <select
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                >
                  {/* <select value={location} onChange={(e) => setLocation(e.target.value)}> */}
                  <option value="">館別篩選</option>
                  <option value="1">台北館</option>
                  <option value="2">台中館</option>
                  <option value="3">高雄館</option>
                </select>
              </label>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <label>
                <select
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                >
                  {/* <select value={location} onChange={(e) => setLocation(e.target.value)}> */}
                  <option value="">日期排序</option>
                  <option value="DESC">從新到舊</option>
                  <option value="ASC">從舊到新</option>
                </select>
              </label>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <label>
                <select
                  value={teamStatus}
                  onChange={(e) => setTeamStatus(e.target.value)}
                >
                  {/* <select value={location} onChange={(e) => setLocation(e.target.value)}> */}
                  <option value="">隊伍狀態</option>
                  <option value="1">募集中</option>
                  <option value="2">已成團</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row">
            {data.rows.map((r) => {
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
          <div>
            <MyPagination
              totalPages={totalPages}
              fetchData={fetchData}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}
