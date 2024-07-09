import { useState, useEffect } from 'react'
import ProductTag from './product-tag'

export default function CategoryGroup({ productData }) {
  const [data, setData] = useState({})

  useEffect(() => {
    console.log('productData', productData)
    setData(productData)
  }, [productData])

  return (
    <>
      <div className="d-flex">
        <ProductTag tag={data.category_name} />
        <ProductTag tag={'奇幻、可愛'} />
        <ProductTag tag={data.age} />
        <ProductTag tag={data.players + '人'} />
      </div>
    </>
  )
}
