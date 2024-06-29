import { useEffect, useState, useRef } from 'react'
import 'animate.css'
import Image from 'next/image'
import lineImg from '@/public/products/line.svg'
import FavCard from '@/components/page-components/products/fav-card'
import IndexLayout from '@/components/layout'
import UserLayout from '@/components/layout/user-layout'
import UserTab from '@/components/UI/user-tab'
import OrderListCards from '@/components/page-components/orders/order-list-cards'
import FavoriteSection from '@/components/page-components/products/favorite-section/index'

export default function ProductFavorite() {
  return (
    <>
      <IndexLayout title="結帳" background="light">
        <UserLayout userTab={<UserTab />} sectionRight={<FavoriteSection />} />
      </IndexLayout>
    </>
  )
}
