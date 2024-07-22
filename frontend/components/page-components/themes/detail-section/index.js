// @/components/page-components/themes/detail-section.js
import React from 'react'
import myStyle from './details.module.css'
import MoreThemes from '@/components/page-components/themes/detail-section/more-themes'

export default function DetailSection({ Banner, Item, Step, Calendar }) {
  return (
    <>
      {Banner}
      {Item}
      {Step}
      {Calendar}
      <MoreThemes />
    </>
  )
}
