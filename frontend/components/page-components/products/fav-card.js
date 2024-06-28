import Image from 'next/image'
import { FaXmark, FaCartShopping } from 'react-icons/fa6'

export default function FavCard({ pdId = 1 }) {
  const imgStyle = {
    width: ' 100%',
    height: '100%',
    borderRadius: '12px 0 0 12px',
  }
  const xStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    color: 'rgb(158, 158, 158)',
  }
  const cartStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    color: '#5B5B5B',
  }

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
            style={imgStyle}
            draggable="false"
            alt=""
          />
          <FaXmark style={xStyle} />
        </div>
        <div className="p-2">
          <p>桌遊文字</p>
          <p>$1880</p>
        </div>
        <FaCartShopping style={cartStyle} />
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
