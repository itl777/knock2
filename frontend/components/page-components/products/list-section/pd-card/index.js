import MyPagination from '../../pagination'
import Card from './card'
import { useProduct } from '@/context/product-context'

export default function PdCard() {
  const { data } = useProduct()

  // const cardData = data['rows'] || []

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 d-grid">
            {/* 商品卡片 */}

            {data.rows.map((r) => {
              return <Card key={r.product_id} dbData={r} />
            })}

            {/* 商品區塊end */}
          </div>

          <MyPagination />
        </div>
      </div>

      <style jsx>
        {`
          .d-grid {
            grid-template-columns: auto auto auto;
            max-width: 1200px;
            padding: 0;
            margin: auto;
          }
        `}
      </style>
    </>
  )
}
