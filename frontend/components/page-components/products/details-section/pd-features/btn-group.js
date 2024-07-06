import PdBtnContained from '@/components/UI/pd-btn-contained'
import PdBtnOutlined from '@/components/UI/pd-btn-outlined'
import { useProduct } from '@/context/product-context'
import { useCart } from '@/context/cart-context' // ****** Iris Added

export default function BtnGroup({ product_id }) {
  // 從context來的quantity
  const { quantity, setQuantity } = useProduct()
  const { buyQuantity, setBuyQuantity } = useProduct() // ****** Iris Added
  const { handleAddToCart } = useCart() // ****** Iris Added 

  return (
    <>
      <div className="d-flex justify-content-between">
        <PdBtnOutlined btnText={'加入收藏'} />
        <PdBtnContained btnText={'加入購物車'} color={'grey'} onClick={()=>{handleAddToCart(product_id, buyQuantity, "add")}} />
        <PdBtnContained btnText={'直接購買'} color={'black'} onClick={()=>{handleAddToCart(product_id, buyQuantity, "buy")}}/>
      </div>
    </>
  )
}
