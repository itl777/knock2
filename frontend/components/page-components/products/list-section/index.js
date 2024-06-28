import Breadcrumb from '@/components/page-components/products/breadcrumb'
import PdFilter from '@/components/page-components/products/list-section/pd-filter'
import PdCard from '@/components/page-components/products/list-section/pd-card'
import myStyle from './list.module.css'

export default function ListSection({ data, setPage }) {
  return (
    <div className={myStyle.section}>
      <Breadcrumb />
      <PdFilter />
      <PdCard data={data} setPage={setPage} />
    </div>
  )
}
