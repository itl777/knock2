import PdBtnContained from '@/components/UI/pd-btn-contained'
import PdBtnOutlined from '@/components/UI/pd-btn-outlined'
import { useProduct } from '@/context/product-context'
import { useCart } from '@/context/cart-context' // ****** Iris Added
import Image from 'next/image'
import myStyle from './features.module.css'

export default function BtnGroup({ product_id }) {
  // 從context來的quantity
  const { quantity, setQuantity } = useProduct()
  const { buyQuantity, setBuyQuantity } = useProduct() // ****** Iris Added
  const { handleAddToCart } = useCart() // ****** Iris Added 

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="position-relative">
          <Image
            className={myStyle['sm-likeStyle']}
            src="/ghost/ghost_10.png"
            width={44}
            height={37}
            alt="Picture"
          />
          <PdBtnOutlined btnText={'加入收藏'} />
        </div>
        <PdBtnContained btnText={'加入購物車'} color={'grey'} onClick={()=>{handleAddToCart(product_id, buyQuantity, "add")}} />
        <PdBtnContained btnText={'直接購買'} color={'black'} onClick={()=>{handleAddToCart(product_id, buyQuantity, "buy")}}/>
      </div>
    </>
  )
}
