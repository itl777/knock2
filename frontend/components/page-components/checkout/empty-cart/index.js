import styles from './empty-cart.module.css'
import BlackBtn from '@/components/UI/black-btn'

export default function EmptyCart() {
  return (
    <div className={styles.emptyCartInfoContainer}>
      <h6>購物車尚無商品</h6>
      <BlackBtn btnText="前往桌遊商城" href="/product" paddingType="medium" />
    </div>
  )
}
