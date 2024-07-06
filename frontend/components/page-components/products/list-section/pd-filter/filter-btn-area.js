import React, { useState } from 'react'
import FilterBtn from '@/components/UI/filter-btn'
import { useRouter } from 'next/router'
import { AiFillCaretUp } from 'react-icons/ai'
import { AiFillCaretDown } from 'react-icons/ai'

export default function FilterBtnArea() {
  const router = useRouter()
  const [priceToggle, setPriceToggle] = useState(false)
  const [showIcon, setShowIcon] = useState(false)

  const handleFilter = (sort, order) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: sort, order: order },
    })
    setShowIcon(true)
    setPriceToggle(!priceToggle)
  }

  return (
    <>
      <FilterBtn
        btnText={'最新上架'}
        onClick={() => handleFilter('created_at', 'DESC')}
      />
      <FilterBtn
        btnText={
          <>
            價格排序
            {showIcon &&
              (priceToggle ? <AiFillCaretUp /> : <AiFillCaretDown />)}
          </>
        }
        marginLeft={'10px'}
        onClick={() => handleFilter('price', priceToggle ? 'DESC' : 'ASC')}
      />
    </>
  )
}
