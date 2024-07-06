import React, { useState } from 'react'
import FilterBtn from '@/components/UI/filter-btn'
import { useRouter } from 'next/router'
import { AiFillCaretUp } from 'react-icons/ai'
import { AiFillCaretDown } from 'react-icons/ai'
import { useProduct } from '@/context/product-context'

export default function FilterBtnArea() {
  const router = useRouter()
  const { showIcon, setShowIcon } = useProduct()

  const [priceToggle, setPriceToggle] = useState(false)
  // const [showIcon, setShowIcon] = useState(false)

  const handleFilterCreated = (sort, order) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: sort, order: order },
    })
    setShowIcon(false)

  }

  const handleFilterPrice = (sort, order) => {
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
        onClick={() => handleFilterCreated('created_at', 'DESC')}
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
        onClick={() => handleFilterPrice('price', priceToggle ? 'DESC' : 'ASC')}
      />
    </>
  )
}
