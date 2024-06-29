import React from 'react'
import { useState, useEffect } from 'react'
import PdTabs from '@/components/page-components/products/details-section/pd-tabs/index'
import PdFeatures from '@/components/page-components/products/details-section/pd-features/index'
import IndexLayout from '@/components/layout'
import { useRouter } from 'next/router'
import DetailsSection from '@/components/page-components/products/details-section'
import Breadcrumb from '@/components/page-components/products/breadcrumb'

export default function ProductDetails() {
  const router = useRouter()
  const [data, setData] = useState([])
  const [productData, setProductData] = useState({
    product_name: '',
    price: 0,
    summary: '',
    players: '',
    age: '',
    category_id: 0,
  })

  useEffect(() => {
    console.log(router.query.product_id)
    fetch(`http://127.0.0.1:3001/products/details/${router.query.product_id}`)
      .then((r) => r.json())
      .then((dbData) => {
        console.log('routerData', dbData.rows)
        setData(dbData.rows)
      })
  }, [router])

  useEffect(() => {
    if (data && data.length > 0) {
      const newData = { ...data[0] }
      // console.log('newData', newData)
      setProductData(newData)
    }
  }, [data])

  return (
    <>
      <IndexLayout pageName="productDetails" background="light">
        <DetailsSection
          breadcrumb={<Breadcrumb productName={productData.product_name} />}
          features={<PdFeatures data={data} />}
          tab={<PdTabs data={data} />}
        />

        {/* <PdFeatures data={data} />
        <PdTabs data={data} /> */}
      </IndexLayout>
    </>
  )
}
