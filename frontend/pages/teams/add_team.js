import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import IndexLayout from '@/components/layout'
import styles from './teams.module.css'
import moment from 'moment-timezone'

import { useAuth } from '@/context/auth-context'
import { R_CREATE_TEAM, CREATE_TEAM } from '@/configs/api-path'

import SubmitBtn from '@/pages/teams/submit-btn'

export default function TeamsAdd() {
  const { auth } = useAuth()
  const router = useRouter()

  const [reservationData, setReservationData] = useState(null)
  const [createTeam, setCreateTeam] = useState({
    success: false,
    reservation_id: 0,
    team_title: '',
    team_limit: '1',
    team_note: '',
  })

  const [error, setError] = useState('')

  const { reservation_id } = router.query

  useEffect(() => {
    if (reservation_id) {
      fetchData(reservation_id)
    }
  }, [reservation_id])

  const fetchData = async (reservationId) => {
    try {
      const response = await fetch(`${R_CREATE_TEAM}${reservationId}`)
      const result = await response.json()

      if (result.success) {
        setReservationData(result.rows[0])
        setCreateTeam((prev) => ({ ...prev, reservation_id: reservationId }))
      } else {
        console.error('Error fetching data:', result.message)
      }
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCreateTeam({ ...createTeam, [name]: value })

    if (name === 'team_limit' && reservationData) {
      const maxLimit = reservationData.max_players - 1
      if (parseInt(value, 10) > maxLimit) {
        setError(`此行程團員上限為${maxLimit}人`)
      } else {
        setError('')
      }
    }
    // setCreateTeam((prevCreateTeam) => ({
    //   ...prevCreateTeam,
    //   [name]: name === 'team_limit' ? parseInt(value) : value,
    // }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(CREATE_TEAM, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createTeam),
      })

      const result = await res.json()

      if (result.success) {
        alert('成功創建團隊')
        router.push('/teams')
      } else {
        console.error('創建團隊失敗:', result.error)
        alert('創建團隊失敗')
      }
    } catch (error) {
      console.error('創建團隊時發生錯誤:', error)
      alert('創建團隊時發生錯誤')
    }
  }

  return (
    <>
      <IndexLayout title="糾團" background="dark">
        <div>
          <h2>新增團隊</h2>
        </div>
        <div className={styles.teamsPage}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className={styles.borderbox}>
                  <h3 className="boxTitle">創立團隊</h3>
                  <form name="createTeam" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor={'lead_name'} className="form-label">
                        團長： {auth.nickname}
                      </label>
                    </div>
                    {reservationData ? (
                      <div className="mb-3">
                        <div className="displayDetail">
                          <p>主題名稱: {reservationData.theme_name}</p>
                          <p>
                            預約日期:{' '}
                            {moment(reservationData.reservation_date).format(
                              'YYYY年MM月DD日'
                            )}
                          </p>
                          <p>
                            時間: {reservationData.start_time} ~{' '}
                            {reservationData.end_time}
                          </p>
                          <p>
                            人數: {reservationData.min_players} ~{' '}
                            {reservationData.max_players} 人
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                    <hr />
                    <div className="mb-3">
                      <label htmlFor={'team_title'} className="form-label">
                        團隊名稱
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="team_title"
                        name="team_title"
                        value={createTeam.team_title}
                        onChange={handleInputChange}
                        aria-describedby="enterteamname"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor={'team_limit'} className="form-label">
                        募集人數
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="team_limit"
                        name="team_limit"
                        value={createTeam.team_limit}
                        onChange={handleInputChange}
                        aria-label="enterteamlimit"
                      />
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor={'team_note'} className="form-label">
                        開團備註（200字以內）
                      </label>
                      <textarea
                        className="form-control"
                        id="floatingTextarea"
                        name="team_note"
                        value={createTeam.team_note}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor={'exampleCheck1'}
                      >
                        我已閱讀<b>注意事項</b>
                      </label>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <SubmitBtn btnText="建立團隊" color="grey" />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className={styles.borderbox}>
                  <h3 className="boxTitle">注意事項</h3>
                  <ol>
                    <li>1. 請先完成預約行程手續，並支付訂金。</li>
                    <li>2. 選擇想揪團的行程後，填寫創團表單。</li>
                    <li>3. 創團後，團長可以審核是否讓申請入團的使用者加入。</li>
                    <li>
                      4.
                      確定成團後，團隊狀態將會變為「已成團」。成團之後團長無法任意更改團員名單。
                    </li>
                    <li></li>
                    <li></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IndexLayout>
    </>
  )
}
