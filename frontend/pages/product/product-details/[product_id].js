import React from 'react'
import { useState, useEffect } from 'react'
import PdTabs from '@/components/page-components/products/details-section/pd-tabs/index'
import PdFeatures from '@/components/page-components/products/details-section/pd-features/index'
import IndexLayout from '@/components/layout'
import { useRouter } from 'next/router'

export default function ProductDetails() {
  const router = useRouter()
  const [data, setData] = useState([])

  useEffect(() => {
    console.log(router.query.product_id)
    fetch(`http://127.0.0.1:3001/products/details/${router.query.product_id}`)
      .then((r) => r.json())
      .then((dbData) => {
        console.log('data', dbData.rows)
        setData(dbData.rows)
      })
  }, [router])

  return (
    <>
      <IndexLayout pageName="productDetails" background="light">
        <PdFeatures data={data} />

        <PdTabs data={data} />
      </IndexLayout>
    </>
  )
}
