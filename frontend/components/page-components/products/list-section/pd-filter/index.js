import React from 'react'
import Image from 'next/image'
import frameSvg from '@/public/products/frame.svg'
import 'hover.css/css/hover-min.css'
import CategoryBtn from './category-btn'
import SearchInput from './search-input'
import FilterBtnArea from './filter-btn-area'
import myStyle from './filter.module.css'

export default function PdFilter() {
  return (
    <>
      <div className="container">
        <div className={myStyle.frame}>
          <Image
            className={`${myStyle.ghostLeft} hvr-buzz`}
            src="/ghost/ghost_14.png"
            width={178}
            height={155}
            alt="Picture of the author"
          />
          <Image
            className={`${myStyle.ghostRight} hvr-wobble-top`}
            src="/ghost/ghost_13.png"
            width={147}
            height={145}
            alt="Picture of the author"
          />

          <Image id="frame-head" layout="responsive" src={frameSvg} alt="" />
        </div>

        <div id="frame">
          <CategoryBtn />

          {/* price range */}
          <div className="row mt-4">
            <div className="col-4 offset-1 d-flex align-items-end">
              <div className="text">
                <div>Price range:</div>
              </div>
              <div>
                <input type="range" className="form-range" id="customRange1" />
              </div>
            </div>

            <div className="col-4 d-flex justify-content-center ">
              <SearchInput />
            </div>

            <div className="col-3 text-end d-flex align-items-end">
              <FilterBtnArea />
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
            padding: 0;
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
