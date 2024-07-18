import React, { useEffect, useState } from 'react'
import IndexLayout from '@/components/layout'
import styles from './teams.module.css'
import moment from 'moment-timezone'

import { useAuth } from '@/context/auth-context'
import { NO_TEAM } from '@/configs/api-path'

import SubmitBtn from '@/pages/teams/submit-btn'

export default function TeamsAdd() {
  const { login, logout, auth } = useAuth()

  const [userData, setUserData] = useState({
    success: false,
    rows: [],
  })

  const [noTeamData, setNoTeamData] = useState({
    success: false,
    rows: [],
  })
  const [selectedReservation, setSelectedReservation] = useState(null)

  useEffect(() => {
    const fetchNoTeamData = async () => {
      try {
        // const res = await fetch(`${GET_DATA}/${auth.id}`)
        const res = await fetch(`${NO_TEAM}${auth.id}`)
        if (!res.ok) {
          throw new Error('Fetch Failed')
        }

        const myData = await res.json()
        setNoTeamData(myData)
        // setIsLoading(false)
      } catch (error) {
        console.error('Fetch error:', error)
        // setIsLoading(false)
      }
    }
    fetchNoTeamData()
  }, [auth.id])

  const handleSelectChange = (e) => {
    const reservation_id = e.target.value
    const selectedReservation = noTeamData.rows.find(
      (r) => r.reservation_id === parseInt(reservation_id)
    )
    setSelectedReservation(selectedReservation)
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
                  <form>
                    <div className="mb-3">
                      <label htmlFor={'lead_name'} className="form-label">
                        團長： {auth.nickname}
                      </label>
                    </div>
                    <div className="mb-3">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="reservation_id"
                        onChange={handleSelectChange}
                      >
                        <option selected>請選擇已預約的行程</option>
                        {noTeamData.rows.map((r) => (
                          <option
                            key={r.reservation_id}
                            value={r.reservation_id}
                          >
                            {r.theme_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedReservation && (
                      <div className="displayDetail">
                        <p>主題名稱: {selectedReservation.theme_name}</p>
                        <p>
                          預約日期:{' '}
                          {moment(selectedReservation.reservation_date).format(
                            'YYYY年MM月DD日'
                          )}
                        </p>
                        <p>開始時間: {selectedReservation.start_time}</p>
                      </div>
                    )}
                    <hr />
                    <div className="mb-3">
                      <label htmlFor={'team_name'} className="form-label">
                        團隊名稱
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="team_name"
                        aria-describedby="enterteamname"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor={'team_name'} className="form-label">
                        募集人數
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="1" selected>
                          1人
                        </option>
                        <option value="2">2人</option>
                        <option value="3">3人</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor={'team_name'} className="form-label">
                        開團備註（200字以內）
                      </label>
                      <textarea
                        className="form-control"
                        id="floatingTextarea"
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
