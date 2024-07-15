import Banner from './banner/banner'
import Item from './item/item'
import Step from './step/step'
import Calendar from './calendar/calendar'
import { THEME_LIST, BRANCH_LIST } from '@/configs/api-path'
import { useEffect, useState } from 'react'

export default function DetailSection() {
  return (
    <>
      <Banner />
      <Item />
      <Step />
      <Calendar />
    </>
  )
}
