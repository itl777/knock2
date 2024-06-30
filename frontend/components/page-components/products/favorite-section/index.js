import Image from 'next/image'
import lineImg from '@/public/products/line.svg'
import FavCard from '@/components/page-components/products/favorite-section/favorite-tab/tab-drag/fav-card'
import { useEffect, useState, useRef } from 'react'
import myStyle from './favorite.module.css'
import FavoriteTab from './favorite-tab'


export default function FavoriteSection() {
  return (
    <div className={`${myStyle.container} container p-4`}>
      <h5 className={myStyle.title}>我的收藏</h5>

      <FavoriteTab />
    </div>
  )
}
