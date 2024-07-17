// components/page-components/themes/detail-section.js
import React from 'react'
import myStyle from './details.module.css'

export default function DetailSection({ Banner, Item, Step, Calendar }) {
  return (
    <>
      <div>{Banner}</div>
      {Item}
      {Step}
      {Calendar}
    </>
  )
}
