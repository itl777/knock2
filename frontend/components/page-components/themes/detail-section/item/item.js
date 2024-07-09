import React from 'react'
import myStyle from './item.module.css'
import { FaPeopleGroup } from 'react-icons/fa6'

export default function Item() {
  return (
    <>
      <div className={myStyle.item}>
        <div className="container">
          <div className="row">
            <div className="d-flex flex-wrap flex-column col-3">
              <FaPeopleGroup className={myStyle.group} />
              <div className={myStyle.p}>2 - 5 人</div>
            </div>
            <div className="d-flex flex-wrap flex-column align-items-center col-3">
              <FaPeopleGroup className={myStyle.group} />
              <div>2 - 5人</div>
            </div>
            <div className="d-flex flex-wrap flex-column align-items-center col-3">
              <FaPeopleGroup className={myStyle.group} />
              <div>2 - 5人</div>
            </div>
            <div className="d-flex flex-wrap flex-column align-items-end col-3">
              <FaPeopleGroup className={myStyle.group} />
              <div>2 - 5人</div>
            </div>
          </div>
        </div>
      </div>
      <div className={myStyle.price}></div>
    </>
  )
}
