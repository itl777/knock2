import React from 'react'
import Image from 'next/image'
import 'hover.css/css/hover-min.css'
import CategoryBtn from './category-btn'
import SearchInput from './search-input'
import FilterBtnArea from './filter-btn-area'
import myStyle from './filter.module.css'
import PriceSlider from './price-slider'

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

          <Image
            id="frame-head"
            src="/products/frame.svg"
            width={1200}
            height={58}
            alt="frame"
          />
        </div>

        <div id="frame">
          <CategoryBtn />

          {/* price range */}
          <div className="row mt-5">
            <div className="col-4 offset-1 d-flex justify-content-between align-items-center">
              <div className="text">
                <div className={myStyle.text}>Price range:</div>
              </div>
              <div>
                <PriceSlider />
              </div>
            </div>

            <div className="col-4 d-flex justify-content-center ">
              <SearchInput />
            </div>

            <div className="col-3 text-end d-flex align-items-center">
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
        `}
      </style>
    </>
  )
}
