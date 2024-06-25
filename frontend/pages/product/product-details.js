import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Breadcrumb from '@/components/page-components/products/breadcrumb'
import ProductTag from '@/components/page-components/products/product-tag'
import ProductReview from '@/components/page-components/products/product-review'
import ReviewStar from '@/components/UI/review-star'
import PdBtnOutlined from '@/components/UI/pd-btn-outlined'
import FilterBtn from '@/components/UI/filter-btn'
import PdBtnContained from '@/components/UI/pd-btn-contained'

export default function ProductDetails() {
  return (
    <>
      <div className="container">
        {/* 麵包屑 還沒改中間圖 */}
        <Breadcrumb />
      </div>

      {/* 商品詳情 */}
      <div className="container">
        <div className="row">
          {/*詳情左側-商品圖 */}
          <div className="col-5 px-0">
            {/* 相似套件們 */}
            {/* react-responsive-carousel */}
            {/* react-slick 的 Custom Paging */}
            <img
              src="img/tea3.jpg"
              alt=""
              width="100%
      "
            />
          </div>
          {/* 詳情右側 */}
          <div className="col-6 offset-1 d-flex flex-column justify-content-between px-0">
            <div className="d-flex justify-content-between align-items-center">
              <h1>桌遊名字</h1>
              <div>
                <ReviewStar />
              </div>
            </div>
            <div className="d-flex">
              <ProductTag tag={'派對遊戲'} />
              <ProductTag tag={'奇幻、可愛'} />
              <ProductTag tag={'8歲'} />
              <ProductTag tag={'2-5人'} />
            </div>
            <div>
              《領土爭奪》是一個簡明輕快的奇幻風格卡牌遊戲。遊戲中玩家要使用擁有各種技能的「人物卡」去爭奪王國重要設施的「領土卡」。率先獲得一定分數或一定數量領土的玩家即可稱霸獲得勝利!經典標準版+豪華典藏版，一次兩種版本，滿足收藏者的喜好！
            </div>
            <div>$1999</div>
            <div className="d-flex">
              <div>數量:</div>
              <div>數量按鈕</div>
            </div>
            <div className="d-flex justify-content-between">
              <PdBtnOutlined btnText={'加入收藏'} />
              <PdBtnContained btnText={'加入購物車'} color={'grey'} />
              <PdBtnContained btnText={'直接購買'} color={'black'} />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <a href="#">商品詳情</a>
            <a href="#">商品評價</a>
          </div>
          <div className="col-12 bg-white">
            <div className="mx-5 my-3 d-flex flex-column justify-content-between text-center">
              {/* 評價 */}
              <div className="col-10 offset-1 d-flex justify-content-center my-5 position-relative">
                <ProductReview />
              </div>
              {/* <div>評價B</div> */}
              <div className="col-10 offset-1 d-flex justify-content-center my-5 position-relative">
                <ProductReview />
              </div>
              <div>
                {/* <a href="#">更多評論</a> */}
                <FilterBtn btnText={'更多評論'} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>
        {`
          .d-grid {
            grid-template-columns: auto auto auto;
          }
          .container {
            max-width: 1200px;
            margin-bottom: 5rem;
          }
           {
          }
          body {
            font-family: 'Noto Sans TC', 'Noto Serif JP';
            font-style: normal;
             {
              /* background-image: url('/pics/background.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover; */
            }
          }
          .add-line::after {
            content: '';
            width: 100%;
            height: 2px;
            position: absolute;
            bottom: 0px;
            background: #d9d9d9;
          }

          .col-12.bg-white {
            border-radius: 16px;
          }
        `}
      </style>
    </>
  )
}
