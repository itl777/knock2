import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import BuyBtn from './buy-btn'
import 'hover.css/css/hover-min.css'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import myStyle from './card.module.css'
import FavoriteIconBtn from './favorite-icon-btn'
import BuyBtn2 from './buy-btn2' // ******* Iris added *******
import { useCart } from '@/context/cart-context' // ******* Iris added *******

export default function Card({ dbData }) {
  // ******* Iris Added Start *******
  // getDeviceId()
  // const { handleBuyClick } = useAddToCart(dbData, loginMemberId)
  const { handleAddToCart } = useCart()
  // const { handleLogin } = useLogin() // 暫時用不到
  // ******* Iris Added Start End *******

  return (
    <>
      <div
        className="card hvr-grow-shadow"
        id={dbData.product_id}
        style={{ width: '20rem' }}
      >
        <Link
          href={`product/product-details/${dbData.product_id}`}
          style={{ textDecoration: 'none' }}
        >
          <Image
            src={`http://127.0.0.1:3001/images/${dbData.product_img}`}
            width={318}
            height={200}
            className="card-img-top"
            alt="..."
          />
        </Link>
        {/* 收藏按鈕 */}
        <FavoriteIconBtn product_id={dbData.product_id} />

        {/* <IconButton
          href={`${API_SERVER}/product/favorite/add/${dbData.product_id}`}
          aria-label="favorite"
          size="large"
          sx={btnStyle}
        >
          <FavoriteIcon style={{ fill: '#fff' }} />
        </IconButton> */}

        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title">{dbData.product_name}</h5>

          <div className="card-btn-outer d-flex justify-content-center my-3">
            <div className="card-btn d-flex">
              <div className="buy-btn-outer w-100 py-1">
                <div className="buy-btn">${dbData.price}</div>
              </div>
              <div className="buy-btn-outer w-100">
                {/* <a
                  href={`product-details/${data.product_id}`}
                  className="buy-btn"
                > */}

                {/* ******* Iris Added Start ******* */}
                {/* <BuyBtn product_id={dbData.product_id} /> */}
                <BuyBtn2 onClick={() => handleAddToCart(dbData.product_id, 1)} />

                {/* ******* Iris Added End ******* */}
                {/* </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .card-btn {
            border: 2px solid black;
            width: 270px;
          }

          .buy-btn-outer:first-child {
            border-right: 2px solid black;
          }
          .card {
            margin: 2.2rem;
          }
        `}
      </style>
    </>
  )
}
