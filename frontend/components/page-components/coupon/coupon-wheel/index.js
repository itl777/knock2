import React, { useState, useEffect } from 'react'
import styles from './coupon-wheel.module.css'
import BlackBtn from '@/components/UI/black-btn'
import FilterBtn from '@/components/UI/filter-btn'
import axios from 'axios'
import { useSnackbar } from '@/context/snackbar-context'
import confetti from 'canvas-confetti'

export default function CouponWheel({ availableCoupons, memberId, fetchNewCoupons }) {
  const { openSnackbar } = useSnackbar()
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState(null)
  // const [availableCoupons, setAvailableCoupons] = useState([])
  const [winCoupon, setWinCoupon] = useState({})

  const segments = [
    { label: '中獎', color: '#FF6B6B' },
    { label: '中獎', color: '#4ECDC4' },
    { label: '中獎', color: '#45B7D1' },
    { label: '再抽一次', color: '#F9C80E' },
    { label: '未中獎', color: '#FF8C42' },
  ]

  // 領取優惠券
  const handleAddCoupon = async (coupon_id) => {
    if (!coupon_id) {
      openSnackbar('領取優惠券失敗', 'error')
      return
    }

    try {
      const response = await axios.post(`http://localhost:3001/coupons/add`, {
        member_id: memberId,
        coupon_id: coupon_id,
      })

      if (response.data.status) {
        setWinCoupon({})
        setWinner(null)
        fetchNewCoupons(memberId)
        openSnackbar('已成功領取優惠券！', 'success')
      }
    } catch (error) {
      console.error('Error adding coupon:', error)
      openSnackbar('領取優惠券失敗', 'error')
    }
  }

  // 計算每個扇形角度
  const segmentAngle = 360 / segments.length

  // 執行抽獎
  const spinWheel = () => {
    setWinCoupon({})
    setWinner(null)
    if (!isSpinning) {
      setIsSpinning(true)

      // 確保在扇形正中間
      const extraRotation = Math.floor(Math.random() * segments.length)
      const segmentCenterAngle = segmentAngle / 2
      let newRotation =
        rotation + 360 * 5 + extraRotation * segmentAngle + segmentCenterAngle

      // 如果是現在位置除以扇形角度為整數，要多加扇形角度的一半
      newRotation = Number.isInteger(newRotation / segmentAngle)
        ? newRotation + segmentAngle / 2
        : newRotation

      console.log('New rotation:', newRotation)
      setRotation(newRotation)

      setTimeout(() => {
        setIsSpinning(false)

        // 計算指針位置
        const normalizedRotation = newRotation % 360
        console.log('Normalized rotation:', normalizedRotation)
        const winningIndex =
          (segments.length -
            Math.floor(
              (normalizedRotation + segmentCenterAngle) / segmentAngle
            )) %
          segments.length

        console.log('Winning index:', winningIndex)
        console.log('Winning segment:', segments[winningIndex])
        setWinner(segments[winningIndex])

        if (segments[winningIndex].label === '中獎') {
          if (availableCoupons.length > 0) {
            const coupon = RandArray(availableCoupons)
            setWinCoupon({
              coupon_id: coupon.id,
              coupon_name: coupon.coupon_name,
            })
            triggerConfetti()
          } else {
            setWinCoupon({
              coupon_id: null,
              coupon_name: 'No Coupons Available',
            })
          }
        }
      }, 5000)
    }
  }

  // 使用亂數取 array
  const RandArray = (array) => {
    var rand = (Math.random() * array.length) | 0
    var rValue = array[rand]
    return rValue
  }

  // 取得抽血結果文字
  const getResult = () => {
    if (winner) {
      if (winner.label === '中獎') {
        return `恭喜您中獎！請立即領取${winCoupon.coupon_name}`
      } else {
        return `${winner.label}！`
      }
    } else {
      return ``
    }
  }

  // 煙花效果
  const triggerConfetti = () => {
    var duration = 5 * 1000
    var end = Date.now() + duration

    ;(function frame() {
      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: 200,
        gravity: 0.2,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        colors: ['#ffc0cb'],
        shapes: ['circle'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  }

  return (
    <div className={styles.container}>
      {console.log('Current rotation:', rotation)}
      {console.log('Is spinning:', isSpinning)}
      {console.log('Current winner:', winner)}
      {/* {availableCoupons && availableCoupons.map((v) => <p>{v.coupon_name}</p>)} */}
      <div className={styles.wheelBox}>
        {/* 輪盤背景 */}
        <div
          className={styles.wheelBg}
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {/* 輪盤分隔 */}

          {segments.map((segment, index) => {
            const angle = (index / segments.length) * 360
            const skewY = 90 - 360 / segments.length
            return (
              <div
                key={index}
                className={styles.segment}
                style={{
                  transform: `rotate(${angle}deg) skewY(-${skewY}deg)`,
                  background: segment.color,
                }}
              >
                <span
                  className={styles.wheelText}
                  style={{
                    transform: `skewY(${skewY}deg) rotate(${
                      360 / segments.length / 2
                    }deg)`,
                  }}
                >
                  {segment.label}
                </span>
              </div>
            )
          })}
        </div>
        {/* 中央的圓形div和圖片 */}
        <div
          className={styles.ghostImgBox}
          // style={{
          //   position: 'absolute',
          //   top: '50%',
          //   left: '50%',
          //   transform: 'translate(-50%, -50%)',
          //   width: '96px',
          //   height: '96px',
          //   padding: '10px',
          //   borderRadius: '50%',
          //   backgroundColor: 'var(--pri-1)',
          //   display: 'flex',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   zIndex: 10,
          // }}
        >
          <img
            className={styles.ghostImg}
            src="/ghost/ghost_11.png"
            // style={{
            //   height: '100%',
            //   marginBottom: '6px',
            // }}
          />
        </div>
        {/* 指針 */}
        <div className={styles.pointer}></div>
      </div>
      <BlackBtn
        btnText={isSpinning ? '旋轉中...' : '我要抽獎！'}
        href={null}
        onClick={spinWheel}
        disabled={isSpinning}
        style={{ marginTop: '20px' }}
      />
      {winner && (
        <div className={styles.resultBox}>
          <p>{getResult()}</p>
          <FilterBtn
            btnText="領取"
            href={null}
            onClick={() => handleAddCoupon(winCoupon.coupon_id)}
          />
        </div>
      )}
    </div>
  )
}
