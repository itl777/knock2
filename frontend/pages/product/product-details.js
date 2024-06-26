import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Breadcrumb from '@/components/page-components/products/breadcrumb'
import PdTabs from '@/components/page-components/products/pd-tabs/index'
import PdFeatures from '@/components/page-components/products/pd-features'
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
          .d-grid {
            grid-template-columns: auto auto auto;
          }
          .pd-features {
            height: 500px;
          }
          .container {
            max-width: 1200px;
            margin-bottom: 5rem;
          }
          body {
            font-family: 'Noto Sans TC', 'Noto Serif JP';
            font-style: normal;
          }
          .add-line::after {
            content: '';
            width: 100%;
            height: 2px;
            position: absolute;
            bottom: 0px;
            background: #d9d9d9;
          }

          .col-12.bg-white {
            border-radius: 16px;
          }
        `}
      </style>
    </>
  )
}
