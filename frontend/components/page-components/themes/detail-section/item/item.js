import React from 'react'
import myStyle from './item.module.css'

export default function Item() {
  return (
    <>
      <div className={myStyle.item}></div>
      <div className={myStyle.price}></div>
    </>
  )
}
