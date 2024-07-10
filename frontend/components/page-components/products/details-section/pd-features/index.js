import ReviewStar from '@/components/UI/review-rating'
import PdSlick from '../pd-slick'
import NumInput from './num-input'
import BtnGroup from './btn-group'
import CategoryGroup from './category-group'
import myStyle from './features.module.css'
import { useEffect, useState } from 'react'



export default function PdFeatures({ dbData }) {
  const [productData, setProductData] = useState({
    product_name: '',
    price: 0,
    summary: '',
    players: '',
    age: '',
    category_id: 0,
  })

  
  useEffect(() => {
    if (dbData && dbData.length > 0) {
      const newData = { ...dbData[0] }
      setProductData(newData)
    }
  }, [dbData])
  return (
    <>
      {/* 商品詳情 */}
      <div className={`${myStyle['container']} container`}>
        <div className={`${myStyle['pd-features']} row pd-features `}>
          {/*詳情左側-商品圖 */}
          <div className="col-5 px-0 position-relative">
            <PdSlick />
          </div>

          {/* 詳情右側 */}
          <div className="col-6 offset-1 d-flex flex-column justify-content-between px-0">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className={myStyle.title}>{productData.product_name}</h1>
              <div>
              {/* 還沒接評價資料 */}
                <ReviewStar />
              </div>
            </div>

            <CategoryGroup productData={productData} />

            <div className={myStyle.content}>{productData.summary}</div>
            <div className={myStyle.price}>${productData.price}</div>

            <div className="d-flex">
              <div className={myStyle.content}>數量:</div>
              <NumInput />
            </div>
            <BtnGroup product_id={productData.product_id} />
          </div>
        </div>
      </div>
    </>
  )
}
