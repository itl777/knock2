import Image from 'next/image'
import pdImg from '@/public/pics/t2.jpg'
import { useEffect, useState } from 'react'

export default function PdCard({ data }) {
  return (
    <>
      <div className="card" style={{ width: '20rem' }}>
        <Image src={pdImg} className="card-img-top" alt="..." />

        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title">{data.product_name}</h5>

          <div className="card-btn-outer d-flex justify-content-center my-3">
            <div className="card-btn d-flex">
              <div className="buy-btn-outer w-100 py-1">
                <a href="#" className="buy-btn">
                  ${data.price}
                </a>
              </div>
              <div className="buy-btn-outer w-100 py-1">
                <a href="#" className="buy-btn">
                  直接購買
                </a>
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
