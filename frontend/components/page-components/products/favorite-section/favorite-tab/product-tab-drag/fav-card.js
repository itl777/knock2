import Image from 'next/image'
import { FaXmark, FaCartShopping } from 'react-icons/fa6'
import { useProduct } from '@/context/product-context'
import myStyle from './drag.module.css'
import DeleteIconBtn from '../product-tab-list/delete-icon-btn'

export default function FavCard({ pdId = 1, dbData }) {
  const { cardChange, setCardChange } = useProduct()

  return (
    <>
      <div
        draggable="true"
        id={pdId}
        className="pd-card d-flex position-relative mb-2"
      >
        <div className="img-div position-relative">
          <Image
            src="/products/tea3.jpg"
            width={81}
            height={113}
            className={myStyle.imgStyle}
            draggable="false"
            alt=""
          />
          <div className={myStyle.xStyle}>
            <DeleteIconBtn
              cardChange={cardChange}
              setCardChange={setCardChange}
              product_id={dbData.product_id}
            />
          </div>
          {/* <FaXmark /> */}
        </div>
        <div className="p-2">
          <p>{dbData.product_name}</p>
          <p>${dbData.price}</p>
        </div>
        <FaCartShopping className={myStyle.cartStyle} />
      </div>
      <style jsx>
        {`
          .pd-card {
            width: 277px;
            height: 113px;
            background-color: white;
            border-radius: 12px;
          }
          .pd-card:hover {
            transform: rotate(10deg);
          }
          .img-div {
            width: 82px;
          }
        `}
      </style>
    </>
  )
}
