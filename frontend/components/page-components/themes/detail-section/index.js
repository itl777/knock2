import myStyle from './details.module.css'
import Image from 'next/image'

export default function DetailSection() {
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
              <hr
                style={{
                  borderColor: '#D9D9D9',
                  opacity: 0.8,
                  marginTop: '30px',
                }}
              />
              <p className={myStyle.p}>主題與劇情</p>
              <p className={myStyle.p}>主題與劇情</p>
              <p className={myStyle.p}>
                主題與劇情{' '}
                <span>
                  <button>注意事項</button>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={myStyle.item}></div>
      {/* <Image
        src="/themes-main/themes-1.jpg"
        alt="banner-background"
        fill="true"
      /> */}
    </>
  )
}
