import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Breadcrumb from '@/components/page-components/products/breadcrumb'
import PdFilter from '@/components/page-components/products/list-section/pd-filter'
import PdCard from '@/components/page-components/products/list-section/pd-card'
import IndexLayout from '@/components/layout'

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
      <IndexLayout pageName="product">
        {/* 麵包屑 還沒改中間圖 */}
        <Breadcrumb />

        <PdFilter />

        <PdCard data={data} />

        <style jsx global>
          {`
            .container {
              max-width: 1200px;
              margin-bottom: 5rem;
            }
          `}
        </style>
      </IndexLayout>
    </>
  )
}
