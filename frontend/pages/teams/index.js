/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import IndexLayout from '@/components/layout'
import styles from './teams.module.css'
import Link from 'next/link'

import { TEAM_ONE } from '@/configs/team-api-path'

import PdBtnContained from '@/components/UI/pd-btn-contained'

import { IoMdPeople } from 'react-icons/io'
import { MdSchedule } from 'react-icons/md'
import { textAlign } from '@mui/system'

export default function TeamListTest() {
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  useEffect(() => {
    fetch(`${TEAM_ONE}`)
      .then((r) => r.json())
      .then((myData) => {
        console.log(data)
        setData(myData)
      })
  }, [])

  return (
    <>
      <IndexLayout title="糾團">
        <div>
          <h2>糾團頁面</h2>
        </div>

        <div className={styles.teamsPage}>
          <div className="container">
            <div className="row">
              <h4>團隊一覽</h4>
              <hr></hr>
            </div>
            <div className={`${styles.teamsSection} row`}>
              {data.rows.map((r, i) => {
                return (
                  <div
                    className={`${styles.teamUnite} col-4 borderbox`}
                    key={r.team_id}
                  >
                    <div className={styles.teamContent}>
                      <div className="teamPhoto">
                        {/* <img src={catImage} alt="cat" /> */}
                        <img
                          src="/teams/collage-maker-02.jpg"
                          alt="cat"
                          width={'100%'}
                        />
                      </div>
                      <div className={styles.teamInfo}>
                        <span className={styles.teamTitle}>{r.theme_name}</span>
                        <span>難度</span>
                      </div>
                      <h5>團名：{r.team_title}</h5>
                      <p>
                        團長：{r.nick_name}
                        <br />
                        時段：
                        <br />
                        <IoMdPeople />
                        人數：2 / 6
                        <MdSchedule />
                        狀態：招募中
                      </p>
                      <div style={{ textAlign: 'center' }}>
                        <Link href={`/teamNo/${r.team_id}`}>
                          <PdBtnContained btnText="查看詳情" color="black" />
                        </Link>
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
