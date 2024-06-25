import Image from 'next/image'
import ReviewStar from '../../UI/review-star'
export default function ProductReview() {
  return (
    <>
      <div className="add-line pb-5 d-flex justify-content-between align-items-center">
        <div>
          <Image
            src="/products/p1.png"
            width={95}
            height={95}
            alt="Picture of the author"
          />
        </div>

        <div className="text-nowrap px-5">
          <ReviewStar />
        </div>

        <div>
          <div className="text-start">
            卡坦島是一款絕佳的策略遊戲，玩法簡單易懂但深度豐富。我們全家每次玩都樂此不疲，強烈推薦！卡坦島是一款絕佳的策略遊戲，玩法簡單易懂但深度豐富。我們全家每次玩都樂此不疲，強烈推薦！卡坦島是一款絕佳的策略遊戲，玩法簡單易懂但深度豐富。我們全家每次玩都樂此不疲，強烈推薦！
          </div>
          <div className="d-flex justify-content-end">
            <p className="mb-0 ps-4">購買人：OOO</p>
            <p className="mb-0 ps-4">評價日期：2019/03/14</p>
          </div>
        </div>
      </div>
    </>
  )
}
