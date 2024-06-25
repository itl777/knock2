import MyPagination from '@/components/product/pagination'
import Card from './card'

export default function PdCard({ data }) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 d-grid">
            {/* 商品卡片 */}

            {data.map((r, i) => {
              return <Card key={r.product_id} data={r} />
            })}

            {/* 商品區塊end */}
          </div>

          <MyPagination />
        </div>
      </div>

      <style jsx>
        {`
          .card-btn {
            border: 2px solid black;
            width: 270px;
          }

          .buy-btn-outer:first-child {
            border-right: 2px solid black;
          }
          .card {
            margin: 2.2rem;
          }
        `}
      </style>
    </>
  )
}
