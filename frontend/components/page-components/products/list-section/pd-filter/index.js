import React from 'react'
import Image from 'next/image'
import frameSvg from '@/public/products/frame.svg'
import FilterBtn from '@/components/UI/filter-btn'
import 'hover.css/css/hover-min.css'
import CategoryBtn from './category-btn'

export default function PdFilter() {
  return (
    <>
      <div className="container">
        <Image id="frame-head" layout="responsive" src={frameSvg} alt="" />

        <div id="frame">
          <CategoryBtn />

          {/* price range */}
          <div className="row mt-4">
            <div className="col-6 offset-1 d-flex">
              <div className="text">
                <h6>Price range:</h6>
              </div>
              <div>
                <input type="range" className="form-range" id="customRange1" />
              </div>
            </div>

            <div className="col-4 text-end">
              <FilterBtn btnText={'最新上架'} href={'/'} />
              <FilterBtn btnText={'價格排序'} href={'/'} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          #frame {
            border-left: 2px solid black;
            border-right: 2px solid black;
            border-bottom: 2px solid black;

            padding: 50px 0;
          }
          .container {
            max-width: 1200px;
            margin-bottom: 5rem;
          }

          .text {
            display: fit-content;
          }
          .text h6 {
            font-weight: 600;
            font-family: 'Noto Serif JP', 'Noto Sans TC';
          }
        `}
      </style>
    </>
  )
}
