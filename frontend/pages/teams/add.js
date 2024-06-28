import React from 'react'
import IndexLayout from '@/components/layout'
import styles from './teams.module.css'
import tempTour from '@/data/teams/temp-tour-data.json'

export default function Teams() {
  return (
    <div>
      <IndexLayout title="糾團">
        <div>
          <h2>新增團隊</h2>
        </div>
        <div className={styles.teamsPage}>
          <div className="row">
            <div className="col-6">
              <div className={styles.borderbox}>
                <h3 className="boxTitle">創立團隊</h3>
                <form>
                  <div className="mb-3">
                    <label htmlFor={'lead_name'} className="form-label">
                      團長： {tempTour.leader_id}
                    </label>
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>請選擇已預約的行程</option>
                      <option value="1">{tempTour.tour_name}</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className={styles.tourInfo}>
                    時間：{tempTour.tour_time}
                    <br />
                    場次：{tempTour.location}
                    <br />
                    人數：
                  </div>
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
                    <label className="form-check-label" htmlor={'exampleCheck1'}>
                      我已閱讀<b>注意事項</b>
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    創立團隊
                  </button>
                </form>
              </div>
            </div>
            <div className="col-6">
              <div className={styles.borderbox}>
                <h3 className="boxTitle">注意事項</h3>
                <ol>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </IndexLayout>
    </div>
  )
}
