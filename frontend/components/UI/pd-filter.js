import React from 'react'
import Image from 'next/image'
import frameSvg from '@/public/pics/frame.svg'
import FilterBtn from './filter-btn'

export default function PdFilter() {
  return (
    <>
      <Image id="frame-head" layout="responsive" src={frameSvg} alt="" />

      <div id="frame">
        <div className="row">
          <div className="col-6 offset-3">
            <ul id="category-ul" className="d-flex">
              <li className="line-img">派對遊戲</li>
              <li className="line-img">益智遊戲</li>
              <li className="line-img">兒童遊戲</li>
              <li className="line-img">家庭遊戲</li>
              <li className="line-img">猜謎遊戲</li>
            </ul>
          </div>
        </div>
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
            <FilterBtn btnText={'最新上架'} />
            <FilterBtn btnText={'價格排序'} />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          #frame {
            border-left: 3px solid black;
            border-right: 3px solid black;
            border-bottom: 3px solid black;

            padding: 50px 0;
          }

          .line-img {
            position: relative;
            box-sizing: border-box;
            width: 100%;
            text-align: center;
            font-weight: 700;
          }
          .line-img:not(:last-child)::before {
            content: '';
            position: absolute;
            box-sizing: border-box;
            top: 20%;
            right: 0;
            width: 2px;
            height: 1em;
            background-color: #878787;
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
