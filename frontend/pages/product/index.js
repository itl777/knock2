import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Breadcrumb from '@/components/page-components/products/breadcrumb'
import PdFilter from '@/components/page-components/products/list-section/pd-filter'
import PdCard from '@/components/page-components/products/list-section/pd-card'
import IndexLayout from '@/components/layout'

export default function ProductList() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`http://127.0.0.1:3001/products?page=${page}`)
      .then((r) => r.json())
      .then((data) => {
        // console.log(data.data.rows)
        // setData(data.data.rows)
        console.log(data.data)
        setData(data.data)
      })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [page])

  return (
    <>
      <IndexLayout pageName="product">
        <Breadcrumb />

        <PdFilter />

        <PdCard data={data} setPage={setPage} />

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
