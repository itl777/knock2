import { useEffect, useState } from 'react'
import IndexLayout from '@/components/layout'
import ListSection from '@/components/page-components/products/list-section'
import Breadcrumb from '@/components/page-components/products/breadcrumb'
import PdFilter from '@/components/page-components/products/list-section/pd-filter'
import PdCard from '@/components/page-components/products/list-section/pd-card'

export default function ProductList() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`http://127.0.0.1:3001/products?page=${page}`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data.data)
        setData(data.data)
      })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [page])

  return (
    <>
      <IndexLayout pageName="product" background="light">
        <ListSection
          data={data}
          setPage={setPage}
          top={<Breadcrumb />}
          filter={<PdFilter />}
          card={<PdCard data={data} setPage={setPage} />}
        />
      </IndexLayout>
    </>
  )
}
