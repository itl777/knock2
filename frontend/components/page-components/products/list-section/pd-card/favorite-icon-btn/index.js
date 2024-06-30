import { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function FavoriteIconBtn({ product_id }) {
  const btnStyle = {
    position: 'absolute',
    top: '6px',
    right: '6px',
  }
  const [likeMe, setLikeMe] = useState(false)

  const toggleButton = async (e) => {
    if (!likeMe) {
      try {
        const r = await fetch(
          `http://localhost:3001/products/favorite/add/${product_id}`,
          {
            method: 'POST',
          }
        )
        const result = await r.json()
        console.log(result)
      } catch (ex) {
        console.log(ex)
      }
    } else {
      try {
        const r = await fetch(
          `http://localhost:3001/products/favorite/delete/${product_id}`,
          {
            method: 'DELETE',
          }
        )
        const result = await r.json()
        console.log(result)
      } catch (ex) {
        console.log('DELETE', ex)
      }
    }

    setLikeMe(!likeMe)
    console.log('likeMe',!likeMe)
  }

  // const handleClick = async (e) => {
  //   try {
  //     const r = await fetch(
  //       `http://localhost:3001/products/favorite/add/${product_id}`,
  //       {
  //         method: 'POST',
  //       }
  //     )
  //     const result = await r.json()
  //     console.log(result)
  //   } catch (ex) {
  //     console.log(ex)
  //   }
  // }

  return (
    <>
      <IconButton
        onClick={toggleButton}
        aria-label="favorite"
        size="large"
        sx={btnStyle}
      >
        <FavoriteIcon style={{ fill: '#fff' }} />
      </IconButton>
    </>
  )
}
