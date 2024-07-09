import myStyle from './banner.module.css'
import { FaStar } from 'react-icons/fa6'

export default function Banner() {
  return (
    <>
      <div className={myStyle.theme}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <h1 className={myStyle.h1}>遺失的寶藏</h1>
              <p className={myStyle.p}>
                在神秘島嶼上，隱藏著古代海盜的寶藏。你和團隊將挑戰這個
                不可能的任務，解讀古老地圖，破解密碼，在限時內解開所有
                謎題，找到寶藏並逃脫。
                這次冒險充滿神秘和挑戰，不僅考驗智力，還需要勇氣和合作。
                準備好成為首批找到遺失寶藏的冒險者吧！
              </p>
              <hr className={myStyle.hr} />
              <div className={myStyle.comment}>
                <div className={myStyle.section}>
                  <span className={myStyle.title}>主題與劇情</span>
                  <span className={myStyle.star}>
                    <FaStar style={{ marginRight: '5px' }} />
                    <FaStar style={{ marginRight: '5px' }} />
                    <FaStar style={{ marginRight: '5px' }} />
                    <FaStar style={{ marginRight: '5px' }} />
                  </span>
                </div>
                <div className={myStyle.section}>
                  <span className={myStyle.title}>謎題與設計</span>
                  <span className={myStyle.star}>
                    <FaStar style={{ marginRight: '5px' }} />
                    <FaStar style={{ marginRight: '5px' }} />
                    <FaStar style={{ marginRight: '5px' }} />
                    <FaStar style={{ marginRight: '5px' }} />
                    <FaStar style={{ marginRight: '5px' }} />
                  </span>
                </div>
                <div className={myStyle.section}>
                  <span className={myStyle.title}>環境與氣氛</span>
                  <span className={myStyle.star}>
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                  </span>
                  <button className={myStyle.warning}>注意事項</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
