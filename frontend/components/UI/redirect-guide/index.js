import styles from './redirect-guide.module.css'
import BlackBtn from '@/components/UI/black-btn'

export default function RedirectionGuide({
  text = '提示內容',
  btnText = 'button',
  href = '/',
  hideBtn = false,
}) {
  return (
    <div className={styles.container}>
      <h6>{text}</h6>
      <img src="/ghost/ghost_06.png" alt="" className={styles.ghostImg} />
      {!hideBtn && (
        <BlackBtn btnText={btnText} href={href} paddingType="medium" />
      )}
    </div>
  )
}
