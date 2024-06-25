import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Breadcrumb from '@/components/page-components/products/breadcrumb'
import PdFilter from '@/components/page-components/products/pd-filter'
import PdCard from '@/components/page-components/products/pd-card'


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
      <>
        {/* 麵包屑 還沒改中間圖 */}
        <Breadcrumb />

        <PdFilter />

        <PdCard data={data} />

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
            }
          `}
        </style>
      </>
    </>
  )
}
