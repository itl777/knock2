import Image from 'next/image'
import BlackBtn from '@/components/UI/black-btn'
import myStyle from './list.module.css'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

export default function FavCardLarge({ dbData }) {
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
        id={dbData.product_name}
        className={`${myStyle['pd-card']} pd-card position-relative mb-2`}
      >
        <div className={`${myStyle['img-div']}`}>
          <Image
            // src={`http://127.0.0.1:3001/images/${dbData.product_img}`}
            src="/products/p1-1.jpg"
            width={81}
            height={113}
            style={imgStyle}
            draggable="false"
            alt="..."
          />

          <IconButton aria-label="delete" size="large" sx={trashStyle}>
            <DeleteIcon />
          </IconButton>
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
