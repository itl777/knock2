import Image from 'next/image'
import BlackBtn from '@/components/UI/black-btn'

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

export default function FavCardLarge({
  pdId = 1,
  pdName = '大富翁',
  pdPrice = '2500',
}) {
  const imgStyle = {
    width: ' 100%',
    height: '100%',
    borderRadius: '12px 12px 0 0',
  }
  const trashStyle = {
    position: 'absolute',
    top: '6px',
    right: '6px',
    color: '#fff',
  }

  return (
    <>
      <div
        draggable="true"
        id={pdId}
        className="pd-card position-relative mb-2"
      >
        <div className="img-div position-relative">
          <Image
            src="/pics/tea3.jpg"
            width={81}
            height={113}
            style={imgStyle}
            draggable="false"
            alt=""
          />

          <IconButton aria-label="delete" size="large" sx={trashStyle}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className="p-2 d-flex flex-column align-items-center">
          <p className="card-text">{pdName}</p>
          <p className="card-text">${pdPrice}</p>
          <BlackBtn btnText={'加入購物車'} />
        </div>
      </div>
      <style jsx>
        {`
          .pd-card {
            width: 260px;
            background-color: white;
            border-radius: 12px;
          }
          .img-div {
            width: 100%;
          }
          .p-2.d-flex.flex-column {
            gap: 10px;
          }
          .card-text {
            margin: 0;
            font-size: 20px;
            font-weight: 400;
          }
        `}
      </style>
    </>
  )
}
