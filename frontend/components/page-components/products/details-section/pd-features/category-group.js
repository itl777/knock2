import ProductTag from './product-tag'

export default function CategoryGroup() {
  return (
    <>
      <div className="d-flex">
        <ProductTag tag={'派對遊戲'} />
        <ProductTag tag={'奇幻、可愛'} />
        <ProductTag tag={'8歲'} />
        <ProductTag tag={'2-5人'} />
      </div>
    </>
  )
}
