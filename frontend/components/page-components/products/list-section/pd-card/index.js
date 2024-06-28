import MyPagination from '../../pagination'
import Card from './card'

export default function PdCard({ data, setPage }) {
  const cardData = data['rows'] || []
  // console.log('pdData', data)
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 d-grid">
            {/* 商品卡片 */}

            {cardData.map((r) => {
              return <Card key={r.product_id} dbData={r} />
            })}

            {/* 商品區塊end */}
          </div>

          <MyPagination totalPages={data.totalPages} setPage={setPage} />
        </div>
      </div>

      <style jsx>
        {`
          .d-grid {
            grid-template-columns: auto auto auto;
            max-width:1200px;
            padding:0;
            margin:auto;
          }
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
