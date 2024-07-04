import React, { useEffect, useState } from 'react'
import IndexLayout from '@/components/layout'
import styles from './teams.module.css'
import Link from 'next/link'

import { TEAM_ALL } from '@/configs/api-path'

import PdBtnContained from '@/components/UI/pd-btn-contained'
import { IoMdPeople } from 'react-icons/io'
import { MdSchedule } from 'react-icons/md'

export default function TeamListTest() {
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  const exampleData = {
    success: true,
    rows: [
      {
        nick_name: '示例團長1',
        theme_name: 'Ex主題',
        difficulty: '難度',
        team_id: 1,
        team_title: '範例團',
        reservation_date: '2024-09-30',
        start_time: '09:00',
        end_time: '11:00',
      },
      {
        nick_name: '示例團長2',
        theme_name: 'Ex主題',
        difficulty: '難度',
        team_id: 1,
        team_title: '範例團',
        reservation_date: '2024-09-30',
        start_time: '09:00',
        end_time: '11:00',
      },
      {
        nick_name: '示例團長3',
        theme_name: 'Ex主題',
        difficulty: '難度',
        team_id: 1,
        team_title: '範例團',
        reservation_date: '2024-09-30',
        start_time: '09:00',
        end_time: '11:00',
      },
    ],
  }

  useEffect(() => {
    fetch(`${TEAM_ALL}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error('Fetch Failed')
        }
        return r.json()
      })
      .then((myData) => {
        console.log(data)
        setData(myData)
      })
      .catch((error) => {
        console.error('Fetch error:', error)
        setData(exampleData)
      })
  }, [])

  return (
    <>
      <IndexLayout title="糾團">
        <div className={styles.teamsPage}>
          <div className={styles.pageTitle}>
            <h2>糾團頁面</h2>
          </div>
          <div className="container">
            <div className="row">
              <h4>團隊一覽</h4>
              <hr></hr>
            </div>
            <div className={`${styles.teamsSection} row`}>
              {data.rows.map((r, i) => {
                return (
                  <div
                    className={`${styles.teamUnite} col-12 col-sm-6 col-md-4 borderbox`}
                    key={r.team_id}
                  >
                    <div className={styles.teamCard}>
                      <div className="teamPhoto">
                        <img
                          src="/teams/collage-maker-02.jpg"
                          alt="cat"
                          width={'100%'}
                        />
                      </div>
                      <div className={styles.teamTourInfo}>
                        <span className={styles.teamTitle}>{r.theme_name}</span>
                        <span>{r.difficulty}</span>
                      </div>
                      <div className={styles.teamContent}>
                        <h5>團名：{r.team_title}</h5>
                        <p>
                          團長：{r.nick_name}
                          <br />
                          時段：{r.reservation_date}
                          <br />
                          {r.start_time} ~ {r.end_time}
                        </p>
                        <div className="row">
                          <div className="col-6">
                            <IoMdPeople />
                            人數：2 / 6
                          </div>
                          <div className="col-6">
                            <MdSchedule />
                            狀態：招募中
                          </div>
                        </div>
                        <div
                          style={{ textAlign: 'center', paddingTop: '10px ' }}
                        >
                          <Link href={`/teams/${r.team_id}`}>
                            <PdBtnContained btnText="查看詳情" color="black" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </IndexLayout>
    </>
  )
}
