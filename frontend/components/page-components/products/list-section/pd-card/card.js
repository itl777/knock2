import Link from 'next/link'
import Image from 'next/image'
import pdImg from '@/public/products/p1.png'
import BuyBtn from './buy-btn'
import 'hover.css/css/hover-min.css'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import myStyle from './card.module.css'
import BuyBtn2 from './buy-btn2' // ******* Iris added *******
import { CART_POST } from '@/configs/api-path' // ******* Iris added *******

export default function Card({ dbData }) {
  const btnStyle = {
    position: 'absolute',
    top: '6px',
    right: '6px',
  }

  // ******* Iris Added Start *******
  const loginMemberId = 1 // 模擬登入暫時性資料
  const handleBuyClick = async () => {
    try {
      const response = await fetch(CART_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberId: loginMemberId,
          productId: dbData.product_id,
          cartQty: 1,
        }),
      })
      const data = await response.json()

      if (data.success) {
        window.location.href = '/checkout'
      } else {
        console.error('Failed to add item to cart')
      }
    } catch (error) {
      console.error('Error adding item to cart:', error)
    }
  }
  // ******* Iris Added Start End *******

  return (
    <>
      <div
        className="card hvr-grow-shadow"
        id={dbData.product_id}
        style={{ width: '20rem' }}
      >
        <Link href={`product-details`} style={{ textDecoration: 'none' }}>
          <Image
            src={`http://127.0.0.1:3001/images/${dbData.product_img}`}
            width={318}
            height={200}
            className="card-img-top"
            alt="..."
          />
          <IconButton aria-label="favorite" size="large" sx={btnStyle}>
            <FavoriteIcon style={{ fill: '#fff' }} />
          </IconButton>
        </Link>

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

                <BuyBtn2 onClick={handleBuyClick} />

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
