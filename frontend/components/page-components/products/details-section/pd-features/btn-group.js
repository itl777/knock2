import PdBtnContained from '@/components/UI/pd-btn-contained'
import PdBtnOutlined from '@/components/UI/pd-btn-outlined'
import { useProduct } from '@/context/product-context'

export default function BtnGroup({ product_id }) {
  // 從context來的quantity
  const { quantity, setQuantity } = useProduct()

  return (
    <>
   
        <div className="d-flex justify-content-between">
          <PdBtnOutlined btnText={'加入收藏'} />
          <PdBtnContained btnText={'加入購物車'} color={'grey'} />
          <PdBtnContained btnText={'直接購買'} color={'black'} />
        </div>
    
    </>
  )
}
