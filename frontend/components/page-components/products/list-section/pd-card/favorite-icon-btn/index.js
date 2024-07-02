import { useState, useEffect } from 'react'
import myStyle from './favorite-icon.module.css'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function FavoriteIconBtn({ product_id }) {
  const [data, setData] = useState([])

  const dataChange = (id) => {
    let newData = [...data]
    if (!data.includes(id)) {
      newData.push(id)
    } else if (data.includes(id)) {
      newData = newData.filter((v) => v !== id)
    } else {
      console.log('dataChange出錯了')
    }

    setData(newData)
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:3001/products/favorite/api`)
      .then((r) => r.json())
      .then((data) => {
        //   {
        //     "success": true,
        //     "rows": [ 全部row資料(obj) ]
        // }

        let newData = []
        data.rows.map((v) => {
          newData.push(v.fav_product_id)
        })
        // 連結此商品有無在table state
        setLikeMe(newData.includes(product_id))
        // 取得使用者所有[fav_product_id]
        setData(newData)
      })
  }, [])
  // ---------
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
        dataChange(product_id) //改顯示狀態
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
        dataChange(product_id) //改顯示狀態
      } catch (ex) {
        console.log('DELETE', ex)
      }
    }

    setLikeMe(!likeMe)
  }

  
  return (
    <>
      <IconButton
        onClick={toggleButton}
        aria-label="favorite"
        size="large"
        sx={btnStyle}
      >
        <FavoriteIcon
          style={data.includes(product_id) ? { fill: 'red' } : { fill: '#fff' }}
        />
      </IconButton>
    </>
  )
}
