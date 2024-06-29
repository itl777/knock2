import Image from 'next/image'
import lineImg from '@/public/products/line.svg'
import FavCard from '@/components/page-components/products/favorite-section/favorite-tab/tab-drag/fav-card'
import { useEffect, useState, useRef } from 'react'
import myStyle from './favorite.module.css'
import FavoriteTab from './favorite-tab'

export default function FavoriteSection() {
  return (
    <div>
      <div className={`${myStyle.container} container p-4`}>
        {/* <div className="d-flex justify-content-between"> */}

        <h5 className={myStyle.title}>我的收藏</h5>

        <FavoriteTab />
        {/* 線 */}
        {/* <div className={myStyle.line}>
          <Image src={lineImg} alt="" />
        </div> */}
      </div>
      {/* <style jsx>
        {`
          .container {
            background-color: white;
            border-radius: 12px;
            margin-bottom: 30px;
            padding-bottom: 20px;
          }
           {
          }
          .bg-gray {
            background-color: #f2f2f2;
            border-radius: 20px;
            padding: 20px 0;
            height: 100%;
          }
          .d-grid {
            grid-template-columns: auto auto auto;
          }
        `}
      </style> */}
    </div>
  )
}
