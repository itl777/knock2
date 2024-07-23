// @/components/page-components/themes/detail-section.js
import React from 'react'
import MoreThemes from '@/components/page-components/themes/detail-section/more-themes'
import BookingBtn from './booking-btn'

export default function DetailSection({ Banner, Item, Step, Calendar }) {
  return (
    <>
      {Banner}
      {Item}
      <div id="step-section">{Step}</div>
      {Calendar}
      <BookingBtn targetId="step-section" />
      <MoreThemes />
    </>
  )
}
