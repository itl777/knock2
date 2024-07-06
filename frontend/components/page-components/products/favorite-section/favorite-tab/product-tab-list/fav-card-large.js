import Image from 'next/image'
import BlackBtn from '@/components/UI/black-btn'
import myStyle from './list.module.css'
import DeleteIconBtn from './delete-icon-btn'
import React from 'react'
import { useProduct } from '@/context/product-context'

export default function FavCardLarge({ dbData }) {
  const { cardChange, setCardChange } = useProduct()

  const imgStyle = {
    width: ' 100%',
    height: '100%',
    borderRadius: '12px 12px 0 0',
  }

  return (
    <>
      <div
        draggable="true"
        id={dbData.product_name}
        className={`${myStyle['pd-card']} pd-card position-relative mb-2`}
      >
        <div className={`${myStyle['img-div']}`}>
          <Image
            src="/products/p1-1.jpg"
            width={81}
            height={113}
            style={imgStyle}
            draggable="false"
            alt="..."
          />
          <DeleteIconBtn
            cardChange={cardChange}
            setCardChange={setCardChange}
            product_id={dbData.product_id}
          />
        </div>
        <div
          className={`${myStyle['gap']} d-flex flex-column align-items-center`}
        >
          <p className={myStyle['card-text']}>{dbData.product_name}</p>
          <p className={myStyle['card-text']}>${dbData.price}</p>
          <BlackBtn btnText={'加入購物車'} />
        </div>
      </div>
    </>
  )
}
