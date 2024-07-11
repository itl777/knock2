import styles from './order-product-img-box.module.css'
import { motion } from 'framer-motion';
import NoData from '@/components/UI/no-data'


export default function OrderProductImgBox({
  imgSrc = '',
  imgAlt = 'knock_knock_product_image',
  width = '6.5rem',
  height = '6.5rem',
  radius = '1rem',
  smallWidth = '6rem',
  smallHeight = '6rem',
  smallRadius = '0.75rem',
}) {
  return (
    <motion.div
      className={styles.itemImgBox}
      style={{
        '--img-width': width,
        '--img-height': height,
        '--img-radius': radius,
        '--small-img-width': smallWidth,
        '--small-img-height': smallHeight,
        '--small-img-radius': smallRadius,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {imgSrc ? (
        <motion.img src={imgSrc} alt={imgAlt} />
      ) : (
        <NoData text="無商品圖" borderRadius="0rem" />
      )}
    </motion.div>
  );
}
