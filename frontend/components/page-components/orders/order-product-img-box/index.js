import styles from './order-product-img-box.module.css'
import { motion } from 'framer-motion'
import NoData from '@/components/UI/no-data'
import { useEffect, useState } from 'react'  //************* IT */
import { useProductImg } from '@/hooks/useProductImg' //************* IT */
import { PRODUCT_IMG } from '@/configs/api-path' //************* IT */

export default function OrderProductImgBox({
  productId = 0, //************* IT */
  imgSrc = '',
  imgAlt = 'knock_knock_product_image',
  width = '6.25rem',
  height = '6.25rem',
  radius = '1rem',
  smallWidth = '5.75rem',
  smallHeight = '5.75rem',
  smallRadius = '0.75rem',
}) {
  {
    /* ************************連it的商品圖 start*/
  }
  const [isId, setIsId] = useState(0)
  const { data } = useProductImg(isId)
  useEffect(() => {
    setIsId(productId)
  }, [productId])
  {
    /* ************************連it的商品圖 end*/
  }

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
      {/* ************************連it的商品圖 start*/}
      {/* {data ? (
        <motion.img src={`${PRODUCT_IMG}/${data[0]}.jpg`} alt={imgAlt} />
      ) : (
        <NoData text="無商品圖" borderRadius="0rem" />
      )} */}
      {/* ************************連it的商品圖 end*/}

      {imgSrc ? (
        <motion.img src={`${imgSrc}.jpg`} alt={imgAlt} />
      ) : (
        <NoData text="無商品圖" borderRadius="0rem" />
      )}
    </motion.div>
  )
}
