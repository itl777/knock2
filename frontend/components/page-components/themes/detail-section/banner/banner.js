import React, { useState, useEffect } from 'react'
import { useTheme } from '@/context/theme-context'
import { useRouter } from 'next/router'
import myStyle from './banner.module.css'
import { FaStar } from 'react-icons/fa'
import BasicModal02 from '@/components/UI/basic-modal02'
import { motion } from 'framer-motion'

const Banner = () => {
  const { themeDetails, getThemeDetails } = useTheme()
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const { branch_themes_id } = router.query
    if (branch_themes_id) {
      setLoading(true)
      getThemeDetails(branch_themes_id).finally(() => setLoading(false))
    }
  }, [router.query, getThemeDetails])

  if (loading) {
    return <div></div>
  }

  if (!themeDetails) {
    return <div>No theme data available</div>
  }

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const createStars = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <FaStar key={index} style={{ marginRight: '6px' }} />
    ))
  }

  return (
    <>
      <div
        style={{
          position: 'relative',
          height: 'calc(100vh - 100px)',
          overflow: 'hidden',
          background: `linear-gradient(to top, rgba(0, 0, 0, 0.65), rgba(155, 155, 155, 0.3)), url("/themes-main/${themeDetails.theme_img}") no-repeat center center / cover`,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-6">
              <h1 className={myStyle.h1}>{themeDetails.theme_name}</h1>
              <p className={myStyle.p}>{themeDetails.theme_desc}</p>
              <hr className={myStyle.hr} />
              <div className={myStyle.comment}>
                <div className={myStyle.section}>
                  <span className={myStyle.title}>主題與劇情</span>
                  <span className={myStyle.star}>
                    {createStars(themeDetails.storyline)}
                  </span>
                </div>
                <div className={myStyle.section}>
                  <span className={myStyle.title}>謎題與設計</span>
                  <span className={myStyle.star}>
                    {createStars(themeDetails.puzzle_design)}
                  </span>
                </div>
                <div className={myStyle.section}>
                  <span className={myStyle.title}>環境與氛圍</span>
                  <span className={myStyle.star}>
                    {createStars(themeDetails.atmosphere)}
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

      <BasicModal02
        open={modalOpen}
        onClose={closeModal}
        modalTitle="注意事項"
        modalBody={
          <div>
            <p>1. 活動採包場制，不協助並團，預約須達「遊戲最低人數」。</p>
            <p>
              2.
              變更或取消預訂日期，請於預約日前一日來電通知。臨時取消將會影響您下次預約的優先權利。
            </p>
            <p>
              3.
              在遊戲人數範圍內可以臨時追加人數，不需與客服聯繫，當日將以現場人數收費。遇天災或不可抗力因素取消或變更場次，以網站公告為準。
            </p>
            <p>
              4. 請「準時到場」集合報到，現場以{' '}
              <span style={{ color: '#B99755', fontWeight: 'bold' }}>
                現金收費
              </span>{' '}
              並進行事前說明。超過表定時間未報到入場，即取消場次，開放給現場玩家預約。
            </p>
            <p>
              5.
              活動流程包含事前說明、進行密室逃脫、遊戲後故事解說（無全程謎題講解）。
            </p>
            <p>
              6.
              遊玩人數低於建議人數時難度較高，不足開場人數時將導致活動無法進行。本遊戲因場景及遊戲設計，{' '}
              <span style={{ color: '#B99755', fontWeight: 'bold' }}>
                未滿12歲、孕婦及行動不便者不得入場
              </span>
              。
            </p>
            <p>
              8.
              如因年齡未達遊戲主題限制，本工作室有權拒絕玩家入場，並不得將未成年孩童托管在場館內。如有特殊需求（嬰兒車、寵物等），請先來電詢問。
            </p>
            <p>9. 遊戲期間請勿飲食、攝影及錄音。</p>
            <p>10. 場內設置各項活動機關，請「穿著方便活動的衣物」。</p>
            <p style={{ color: '#B99755', fontWeight: 'bold' }}>
              遊戲過程中如有毀損道具及場景之行為，造成本工作室損失，將提出求償。（包含道具維修、場景修復、營業損失之費用等等）。
            </p>
          </div>
        }
      />
    </>
  )
}

export default Banner
