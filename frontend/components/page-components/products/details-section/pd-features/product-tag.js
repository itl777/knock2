import React from 'react'
import myStyle from './features.module.css'

export default function ProductTag({ tag = '分類標籤' }) {
  return (
    <>
      <p className={`${myStyle.tag} bg-secondary bg-opacity-25 rounded-pill px-3 py-1 me-3`}>
        #{tag}
      </p>
    </>
  )
}
