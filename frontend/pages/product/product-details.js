import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Breadcrumb from '@/components/page-components/products/breadcrumb'
import PdTabs from '@/components/page-components/products/details-section/pd-tabs/index'
import PdFeatures from '@/components/page-components/products/details-section/pd-features'
import IndexLayout from '@/components/layout'

export default function ProductDetails() {
  return (
    <>
      <IndexLayout pageName="productDetails">
        {/* 麵包屑 還沒改中間圖 */}
        <Breadcrumb />

        <PdFeatures />

        <PdTabs />
      </IndexLayout>

      <style jsx global>
        {`
          .container {
            max-width: 1200px;
            margin-bottom: 5rem;
          }
          .col-12.bg-white {
            border-radius: 16px;
          }
        `}
      </style>
    </>
  )
}
