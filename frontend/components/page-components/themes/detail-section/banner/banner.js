import React, { useState } from 'react'
import myStyle from './banner.module.css'
import { FaStar } from 'react-icons/fa6'
import BasicModal02 from '@/components/UI/basic-modal02'

export default function Banner() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

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
                  <span>主題與劇情</span>
                  <span className={myStyle.star}>
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                  </span>
                </div>
                <div className={myStyle.section}>
                  <span>謎題與設計</span>
                  <span className={myStyle.star}>
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                  </span>
                </div>
                <div className={myStyle.section}>
                  <span>環境與氣氛</span>
                  <span className={myStyle.star}>
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                    <FaStar style={{ marginRight: '6px' }} />
                  </span>
                  <button className={myStyle.warning} onClick={openModal}>
                    注意事項
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal component */}
      <BasicModal02
        open={modalOpen}
        onClose={closeModal}
        modalTitle="注意事項"
        modalBody={
          <div>
            <p>1. 活動採包場制，不協助併團，預約須達「遊戲最低人數」。</p>
            <p>
              2. 變更或取消預訂日期，請於預約日前一日來電通知。
              臨時取消將會影響您下次預約的優先權利。
            </p>
            <p>
              3.
              在遊戲人數範圍內可以臨時追加人數，不需與客服聯繫，當日將以現場人數收費。
              遇天災或不可抗力因素取消或變更場次，以網站公告為準。
            </p>
            <p>
              4. 請「準時到場」集合報到，現場以
              <span style={{ color: '#B99755', fontWeight: 'bold  ' }}>
                現金收費
              </span>
              並進行事前說明。
              <span style={{ color: '#B99755', fontWeight: 'bold  ' }}>
                超過表定時間未報到入場，即取消場次
              </span>
              ，開放給現場玩家預約
            </p>
            <p>
              5.
              活動流程包含事前說明、進行密室逃脫、遊戲後故事解說（無全程謎題講解）。
            </p>
            <p>
              6.
              遊玩人數低於建議人數時難度較高，不足開場人數時將導致活動無法進行。
              本遊戲因場景及遊戲設計，
              <span style={{ color: '#B99755', fontWeight: 'bold  ' }}>
                未滿12歲、孕婦及行動不便者不得入場
              </span>
              。
            </p>
            <p>
              8.
              如因年齡未達遊戲主題限制，本工作室有權拒絕玩家入場，且不得將未成年孩童託管在場館內。
              如有特殊需求（嬰兒車、寵物等），請先來電詢問。
            </p>
            <p>9. 遊戲期間請勿飲食、攝影及錄音。</p>
            <p>
              10. 場内設置各項活動機關，請「穿著方便活動的衣物」。
              <p style={{ color: '#B99755', fontWeight: 'bold  ' }}>
                遊戲過程中如有毀損道具及場景之行為，造成本工作室損失，將提出求償。
                (包含道具維修、場景修復、營業損失之費用等等)。
              </p>
            </p>
          </div>
        }
      />
    </>
  )
}
