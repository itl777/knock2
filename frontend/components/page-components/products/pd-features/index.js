import ReviewStar from '@/components/UI/review-star'
import PdSlick from '../pd-slick'
import NumInput from './num-input'
import BtnGroup from './btn-group'
import CategoryGroup from './category-group'
import myStyle from './features.module.css'

export default function PdFeatures() {
  return (
    <>
      {/* 商品詳情 */}
      <div className={`$myStyle['container'] container`}>
        <div className={`row pd-features $myStyle['pd-features']`}>
          {/*詳情左側-商品圖 */}
          <div className="col-5 px-0 position-relative">
            <PdSlick />
          </div>

          {/* 詳情右側 */}
          <div className="col-6 offset-1 d-flex flex-column justify-content-between px-0">
            <div className="d-flex justify-content-between align-items-center">
              <h1>桌遊名字</h1>
              <div>
                <ReviewStar />
              </div>
            </div>

            <CategoryGroup />

            <div>
              《領土爭奪》是一個簡明輕快的奇幻風格卡牌遊戲。遊戲中玩家要使用擁有各種技能的「人物卡」去爭奪王國重要設施的「領土卡」。率先獲得一定分數或一定數量領土的玩家即可稱霸獲得勝利!經典標準版+豪華典藏版，一次兩種版本，滿足收藏者的喜好！
            </div>
            <div>$1999</div>

            <div className="d-flex">
              <div>數量:</div>
              <NumInput />
            </div>
            <BtnGroup />
          </div>
        </div>
      </div>
    </>
  )
}
