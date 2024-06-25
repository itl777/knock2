import React from 'react'
import { useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import Breadcrumb from '@/components/page-components/products/breadcrumb'
import PdFilter from '@/components/page-components/products/pd-filter'
import PdCard from '@/components/page-components/products/pd-card'
import MyPagination from '@/components/page-components/products/pagination'

export default function ProductList() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:3001/product')
      .then((r) => r.json())
      .then((data) => {
        console.log(data.data.rows)
        setData(data.data.rows)
      })
  }, [])

  return (
    <>
      <div className="container">
        {/* 麵包屑 還沒改中間圖 */}
        <Breadcrumb />
      </div>

      <div className="container">
        <PdFilter />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 d-grid">
            {/* 商品卡片 */}
            {data.map((r, i) => {
              return <PdCard key={r.product_id} data={r} />
            })}

            {/* 商品區塊end */}
          </div>

          <MyPagination />
        </div>
      </div>
      <style jsx global>
        {`
          .d-grid {
            grid-template-columns: auto auto auto;
          }
          .container {
            max-width: 1200px;
            margin-bottom: 5rem;
          }
           {
          }
          body {
            font-family: 'Noto Sans TC', 'Noto Serif JP';
            font-style: normal;
             {
              /* background-image: url('/pics/background.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover; */
            }
          }
        `}
      </style>
    </>
  )
}
