import Link from 'next/link'
import Image from 'next/image'
import pdImg from '@/public/products/p1.png'
import BuyBtn from './buy-btn'
import 'hover.css/css/hover-min.css'

export default function Card({ dbData }) {
  return (
    <>
      <div
        className="card hvr-grow-shadow"
        id={dbData.product_id}
        style={{ width: '20rem' }}
      >
        <Link href={`product-details`} style={{ textDecoration: 'none' }}>
          <Image
            src={pdImg}
            width={318}
            height={200}
            className="card-img-top"
            alt="..."
          />
        </Link>
        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title">{dbData.product_name}</h5>

          <div className="card-btn-outer d-flex justify-content-center my-3">
            <div className="card-btn d-flex">
              <div className="buy-btn-outer w-100 py-1">
                <div className="buy-btn">${dbData.price}</div>
              </div>
              <div className="buy-btn-outer w-100">
                {/* <a
                  href={`product-details/${data.product_id}`}
                  className="buy-btn"
                > */}
                <BuyBtn product_id={dbData.product_id} />
                {/* </a> */}
              </div>
            </div>
          </div>
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
