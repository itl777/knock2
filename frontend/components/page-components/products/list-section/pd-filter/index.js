import React from 'react'
import Image from 'next/image'
import 'hover.css/css/hover-min.css'
import CategoryBtn from './category-btn'
import SearchInput from './search-input'
import FilterBtnArea from './filter-btn-area'
import myStyle from './filter.module.css'
import PriceSlider from './price-slider'
import { FaEraser } from 'react-icons/fa6'
import { useRouter } from 'next/router'

export default function PdFilter() {
  const router = useRouter()
  const url = router.asPath.split('?')
  const handleClearUrl = () => {
    const { pathname } = router
    router.replace(pathname, undefined, { shallow: true })
  }

  return (
    <>
      <div className="container">
        <div className={myStyle.frame}>
          <Image
            className={`${myStyle.ghostLeft} hvr-wobble-top`}
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

          {url[1] ? (
            <button
              className={`${myStyle.eraserIcon} hvr-grow`}
              onClick={handleClearUrl}
            >
              <FaEraser />
            </button>
          ) : (
            ''
          )}

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

          <div className="row mt-5">
            <div className="col-3 d-flex align-items-center gap-3 justify-content-end">
              <FilterBtnArea />
            </div>

            <div className="col-6 d-flex flex-column justify-content-center align-items-center">
              <div className="text">
                <div className={myStyle.text}>價格範圍</div>
              </div>
              <div>
                <PriceSlider />
              </div>
            </div>

            <div className="col-3 d-flex justify-content-center ">
              <SearchInput />
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
