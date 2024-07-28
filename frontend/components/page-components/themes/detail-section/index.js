// @/components/page-components/themes/detail-section.js
import React, { useEffect, useRef } from 'react'
import MoreThemes from '@/components/page-components/themes/detail-section/more-themes'
import BookingBtn from './booking-btn'
import Game from './game'

export default function DetailSection({ Banner, Item, Step, Calendar }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = (e) => {
      const section = sectionRef.current
      if (section) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 0 && rect.bottom > window.innerHeight) {
          e.preventDefault()
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: false })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={sectionRef}>
      {Banner}
      {Item}
      <div id="step-section">{Step}</div>
      {Calendar}
      <BookingBtn targetId="step-section" />
      <Game />
      <MoreThemes />
    </div>
  )
}
