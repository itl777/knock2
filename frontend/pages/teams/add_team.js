import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import IndexLayout from '@/components/layout'
import styles from '@/components/page-components/teams/teams.module.css'
import moment from 'moment-timezone'
import LINK from 'next/link'
import { useAuth } from '@/context/auth-context'
import { R_CREATE_TEAM, CREATE_TEAM } from '@/configs/api-path'

import BasicModal02 from '../../components/page-components/teams/team-modal-1'
import TeamsNotice from '@/components/page-components/teams/add_team/add_notice'

import SubmitBtn from '@/pages/teams/submit-btn'

export default function TeamsAdd() {
  const { auth } = useAuth()
  const router = useRouter()

  const [modalOpen, setModalOpen] = useState(false)
  const [reservationData, setReservationData] = useState(null)
  const [createTeam, setCreateTeam] = useState({
    success: false,
    reservation_id: 0,
    team_title: '',
    team_limit: '1',
    team_note: '',
  })

  const [titleError, setTitleError] = useState('')
  const [limitError, setLimitError] = useState('')
  const [checkboxError, setCheckboxError] = useState('')

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

    if (name === 'team_title') {
      if (value.length <= 2) {
        setTitleError('團隊名稱需大於3個字')
      } else {
        setTitleError('')
      }
    }

    if (name === 'team_limit' && reservationData) {
      const maxLimit = reservationData.max_players - 1
      if (parseInt(value, 10) > maxLimit) {
        setLimitError(`此行程團員上限為${maxLimit}人`)
      } else {
        setLimitError('')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const checkbox = document.getElementById('readCheck')

    if (!checkbox.checked) {
      setCheckboxError('請閱讀注意事項')
      return
    } else {
      setCheckboxError('')
    }

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
  const openModal = () => {
    if (window.innerWidth < 992) {
      setModalOpen(true)
    }
  }
  const closeModal = () => {
    setModalOpen(false)
    document.getElementById('readCheck').checked = true
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
              <div className="col-12 col-lg-6">
                <div className={styles.borderbox}>
                  <h3 className={styles.teamTitle}>創立團隊</h3>
                  <form name="createTeam" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor={'lead_name'} className="form-label">
                        團長： {auth.nickname}
                      </label>
                    </div>
                    {reservationData ? (
                      <div className="mb-3">
                        <div className="displayDetail">
                          <div>主題名稱: {reservationData.theme_name}</div>
                          <div>
                            預約日期:{' '}
                            {moment(reservationData.reservation_date).format(
                              'YYYY年MM月DD日'
                            )}
                          </div>
                          <div>
                            時間: {reservationData.start_time} ~{' '}
                            {reservationData.end_time}
                          </div>
                          <div>
                            人數: {reservationData.min_players} ~{' '}
                            {reservationData.max_players} 人
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>Loading...</div>
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
                      <div style={{ color: 'red' }}>
                        {titleError && titleError}
                      </div>
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
                      <div style={{ color: 'red' }}>
                        &nbsp;{limitError && limitError}
                      </div>
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
                        id="readCheck"
                      />
                      <label className={styles.formCheck} htmlFor={'readCheck'}>
                        我已閱讀
                        <LINK href="#" onClick={openModal}>
                          <b>注意事項</b>
                        </LINK>
                      </label>
                      <div style={{ color: 'red' }}>{checkboxError}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <SubmitBtn btnText="建立團隊" color="grey" />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 d-none d-lg-block">
                <div className={styles.borderbox}>
                  <TeamsNotice />
                </div>
              </div>
            </div>
          </div>
        </div>
      </IndexLayout>
      <BasicModal02
        open={modalOpen}
        onClose={closeModal}
        modalTitle="注意事項"
        modalBody={<TeamsNotice />}
      ></BasicModal02>
    </>
  )
}
