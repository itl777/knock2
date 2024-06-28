import ReviewStar from '@/components/UI/review-star'
import PdSlick from '../pd-slick'
import NumInput from './num-input'
import BtnGroup from './btn-group'
import CategoryGroup from './category-group'
import myStyle from './features.module.css'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/page-components/products/breadcrumb'
export default function PdFeatures({ data }) {
  // console.log('PdFeatures', data)
  const [productData, setProductData] = useState({
    product_name: '',
    price: 0,
    summary: '',
    players: '',
    age: '',
    category_id: 0,
  })

  useEffect(() => {
    if (data && data.length > 0) {
      const newData = { ...data[0] }
      // console.log('newData', newData)
      setProductData(newData)
    }
  }, [data])
  return (
    <>
     <div className="container" style={{ marginBottom: 0 }}>
      <Breadcrumb productName={productData.product_name} />
      </div>
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
                <ReviewStar />
              </div>
            </div>

            <CategoryGroup />

            <div className={myStyle.content}>{productData.summary}</div>
            <div className={myStyle.price}>${productData.price}</div>

            <div className="d-flex">
              <div className={myStyle.content}>數量:</div>
              <NumInput />
            </div>
            <BtnGroup />
          </div>
        </div>
      </div>
    </>
  )
}
