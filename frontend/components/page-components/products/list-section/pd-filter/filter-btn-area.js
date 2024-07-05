import React from 'react'
import FilterBtn from '@/components/UI/filter-btn'

export default function FilterBtnArea() {
  return (
    <>
      <FilterBtn btnText={'最新上架'} href={'?sort=created_at'} />
      {/* href原理? 無法將?參數放置url。已測後端API正常 */}
      <FilterBtn btnText={'價格排序'} />
    </>
  )
}
