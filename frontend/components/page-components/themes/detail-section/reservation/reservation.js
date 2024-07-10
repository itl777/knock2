import React from 'react'
import myStyle from './reservation.module.css'
import { CgNotes } from 'react-icons/cg'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { FaCheckCircle } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'

export default function Reservation() {
  return (
    <>
      <div className="container">
        <h2 className={myStyle.h1}>遺失的寶藏 - 台北店</h2>
        <hr className={myStyle.line}></hr>
        <div className="row mt-5 d-flex justify-content-between">
          <div className="col-2 d-flex flex-column align-items-center justify-content-center">
            <div className={myStyle.step}>
              Step. 1<div className={myStyle.step}>填寫預約</div>
            </div>
            <CgNotes className={myStyle.icon} />
            <span className={myStyle.p}>選擇場次和遊玩人數</span>
          </div>
          <div>
            <IoIosArrowForward className={myStyle.icon} />
          </div>

          <div className="col-3 d-flex flex-column align-items-center justify-content-center">
            <div className={myStyle.step}>
              Step. 2<div className={myStyle.step}>預付訂金</div>
            </div>
            <RiMoneyDollarCircleLine className={myStyle.icon} />
            <span className={myStyle.p}>填寫付款資料</span>
          </div>

          <div className="col-3 d-flex flex-column align-items-center justify-content-center">
            <div className={myStyle.step}>
              Step. 3<div className={myStyle.step}>確認資料</div>
            </div>
            <FaCheckCircle className={myStyle.icon} />
            <span className={myStyle.p}>確認預約資訊無誤</span>
          </div>

          <div className="col-3 d-flex flex-column align-items-center justify-content-center">
            <div className={myStyle.step}>
              Final<div className={myStyle.step}>預約完成</div>
            </div>
            <div className={myStyle.check}></div>
            <span className={myStyle.p2}>歡迎遊玩密室逃脫</span>
          </div>
        </div>
      </div>
    </>
  )
}
