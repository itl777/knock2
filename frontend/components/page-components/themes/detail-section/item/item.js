import React from 'react'
import myStyle from './item.module.css'
import { FaRegClock, FaKey, FaBabyCarriage } from 'react-icons/fa6'
import { BsFillPeopleFill } from 'react-icons/bs'

export default function Item() {
  return (
    <>
      <div className={myStyle.item}>
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="d-flex flex-wrap flex-column col-3 align-items-center">
              <BsFillPeopleFill className={myStyle.group} />
              <div className={myStyle.p}>2 - 5 人</div>
            </div>
            <div className="d-flex flex-wrap flex-column align-items-center col-3">
              <FaRegClock className={myStyle.clock} />
              <div className={myStyle.p}>60 分鐘</div>
            </div>
            <div className="d-flex flex-wrap flex-column col-3 align-items-center">
              <FaKey className={myStyle.clock} />
              <div className={myStyle.p}>EASY</div>
            </div>
            <div className="d-flex flex-wrap flex-column col-3 align-items-center">
              <FaBabyCarriage className={myStyle.clock} />
              <div className={myStyle.p}>12 +</div>
            </div>
          </div>
        </div>
      </div>
      <div className={myStyle.price}>
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center flex-wrap">
            <div className="col-3 d-block align-items-center justify-content-center">
              <div className={myStyle.tag}>
                原價
                <div className={myStyle.org}>
                  650 <span className={myStyle.tag2}>元</span>
                </div>
              </div>
            </div>

            <div className="col-3 d-block align-items-center justify-content-center">
              <div className={myStyle.tag}>2人</div>
              <div className={myStyle.tag}>
                $ <span className={myStyle.other}>550</span> /人
              </div>
            </div>
            <div className="col-3 d-block align-items-center justify-content-center">
              <div className={myStyle.tag}>2人</div>
              <div className={myStyle.tag}>
                $ <span className={myStyle.other}>550</span> /人
              </div>
            </div>
            <div className="col-3 d-block align-items-center justify-content-center">
              <div className={myStyle.tag2}>2人</div>
              <div className={myStyle.tag2}>
                $ <span className={myStyle.other}>550</span> /人
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={myStyle.b}></div>
    </>
  )
}
