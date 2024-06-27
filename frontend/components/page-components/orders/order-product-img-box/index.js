import styles from './order-product-img-box.module.css'
import NoData from '@/components/UI/no-data'

export default function OrderProductImgBox({
  imgSrc = '',
  imgAlt = 'knock_knock_product_image',
  width = '7rem',
  height = '7rem',
  radius = '1rem',
  smallWidth = '6rem',
  smallHeight = '6rem',
  smallRadius = '0.75rem',
}) {
  return (
    <div
      className={styles.itemImgBox}
      style={{
        '--img-width': width,
        '--img-height': height,
        '--img-radius': radius,
        '--small-img-width': smallWidth,
        '--small-img-height': smallHeight,
        '--small-img-radius': smallRadius,
      }}
    >
      {imgSrc ? (
        <img src={imgSrc} alt={imgAlt} />
      ) : (
        <NoData text="無商品圖" borderRadius="0rem" fontSize="14px" />
      )}
    </div>
  )
}
