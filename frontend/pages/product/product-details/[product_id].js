import React from 'react'
import { useState, useEffect } from 'react'
import PdTabs from '@/components/page-components/products/details-section/pd-tabs/index'
import PdFeatures from '@/components/page-components/products/details-section/pd-features/index'
import IndexLayout from '@/components/layout'
import { useRouter } from 'next/router'
import DetailsSection from '@/components/page-components/products/details-section'
import Breadcrumb from '@/components/page-components/products/breadcrumb'
import { PRODUCT_DETAILS } from '@/configs/api-path'
import { ProductProvider } from '@/context/product-context'

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
    fetch(`${PRODUCT_DETAILS}/${router.query.product_id}`)
      .then((r) => r.json())
      .then((dbData) => {
        setData(dbData.rows)
      })
  }, [router.isReady])

  useEffect(() => {
    if (data && data.length > 0) {
      const newData = { ...data[0] }
      setProductData(newData)
    }
  }, [data])

  return (
    <>
      <ProductProvider>
        <IndexLayout pageName="productDetails" background="light">
          <DetailsSection
            breadcrumb={<Breadcrumb productName={productData.product_name} />}
            features={<PdFeatures data={data} />}
            tab={<PdTabs data={data} />}
          />
        </IndexLayout>
      </ProductProvider>
    </>
  )
}
