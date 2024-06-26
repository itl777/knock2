import PdBtnContained from '@/components/UI/pd-btn-contained'
import PdBtnOutlined from '@/components/UI/pd-btn-outlined'

export default function BtnGroup() {
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
