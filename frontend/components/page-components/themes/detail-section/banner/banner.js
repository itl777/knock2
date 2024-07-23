import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/theme-context'
import { useRouter } from 'next/router'
import myStyle from './banner.module.css'
import { FaStar } from 'react-icons/fa'
import BasicModal03 from '@/components/UI/basic-modal03'
import BasicModal02 from '@/components/UI/basic-modal02'
import { motion } from 'framer-motion'
import { FaPlay, FaPause } from 'react-icons/fa'

const Banner = () => {
  const { themeDetails, getThemeDetails } = useTheme()
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const [soundBars, setSoundBars] = useState([])
  const [showMusicPrompt, setShowMusicPrompt] = useState(true)

  const FuzzyOverlay = () => {
    return (
      <motion.div
        animate={{
          opacity: [0.1, 0.15, 0.1],
          backgroundPosition: ['0% 0%', '130% 100%', '56% 0%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.05,
          ease: 'linear',
        }}
        style={{
          backgroundImage: 'url("/noise2.jpg")',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundSize: '150% 100%',
          pointerEvents: 'none',
          opacity: 1,
          zIndex: 3,
        }}
        className="absolute inset-0"
      />
    )
  }

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          setIsPlaying(false)
        })
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleAcceptMusic = () => {
    setShowMusicPrompt(false)
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        console.log('播放失敗:', error)
        setIsPlaying(false)
      })
  }

  const handleDeclineMusic = () => {
    setShowMusicPrompt(false)
  }

  useEffect(() => {
    const { branch_themes_id } = router.query
    if (branch_themes_id) {
      setLoading(true)
      getThemeDetails(branch_themes_id).finally(() => {
        setLoading(false)
        setShowMusicPrompt(true)
      })
    }

    setSoundBars(
      Array.from({ length: 20 }, () => ({
        minHeight: Math.floor(Math.random() * 3) + 3,
        maxHeight: Math.floor(Math.random() * 7) + 20,
        delay: Math.random() * 0.5,
      }))
    )
  }, [router.query, getThemeDetails])

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const createStars = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <FaStar key={index} style={{ marginRight: '6px' }} />
    ))
  }

  return (
    <>
      <BasicModal03
        open={showMusicPrompt}
        onClose={handleDeclineMusic}
        modalTitle="Do you want to listen to music?"
        modalBody={
          <div className={myStyle.musicPrompt}>
            <p>是否播放背景音樂來增強您的體驗？</p>
            <div className={myStyle.musicPromptButtons}>
              <button
                className={myStyle.acceptButton}
                onClick={handleAcceptMusic}
              >
                播放音樂
              </button>
              <button
                className={myStyle.declineButton}
                onClick={handleDeclineMusic}
              >
                不要播放
              </button>
            </div>
          </div>
        }
      />
      <div
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 100px)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        >
          <source src={`/mp4/01.mp4`} type="video/mp4" />
          您的瀏覽器不支持 video 標籤。
        </video>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(155, 155, 155, 0.1))',
            zIndex: 2,
          }}
        />
        <FuzzyOverlay />
        <div className="container" style={{ position: 'relative', zIndex: 4 }}>
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
            <div className="col-6 d-flex justify-content-end align-items-end ">
              <div className="d-flex align-items-end">
                {isPlaying && (
                  <div className={myStyle.soundBarsContainer}>
                    {soundBars.map((bar, i) => (
                      <div
                        key={i}
                        className={myStyle.soundBar}
                        style={{
                          '--min-height': `${bar.minHeight}px`,
                          '--max-height': `${bar.maxHeight}px`,
                          animationDelay: `${bar.delay}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: '100%' }}
                >
                  <button onClick={togglePlay} className={myStyle.playerButton}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                </div>
              </div>

              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio ref={audioRef} loop>
                <source src="/music/music02.mp3" type="audio/mpeg" />
                您的瀏覽器不支持 audio 元素。
              </audio>
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
