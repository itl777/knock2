import { useState, useEffect } from 'react'
import myStyle from './favorite-icon.module.css'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { PRODUCT_FAVORITE } from '@/configs/api-path'
import { useSnackbar } from '@/context/snackbar-context'

export default function FavoriteIconBtn({ product_id }) {
  const { openSnackbar } = useSnackbar()

  const [data, setData] = useState([])
  const [likeMe, setLikeMe] = useState(false)
  const btnStyle = {
    position: 'absolute',
    top: '6px',
    right: '6px',
  }

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

  const getFavoriteArray = async () => {
    const url = `${PRODUCT_FAVORITE}/api`
    let newData = []
    try {
      const res = await fetch(url)
      const resData = await res.json()
      if (resData.success) {
        resData.rows.map((v) => {
          newData.push(v.fav_product_id)
        })
        // 連結此商品有無在table state
        setLikeMe(newData.includes(product_id))
        // 取得使用者所有[fav_product_id]
        setData(newData)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getFavoriteArray()
  }, [])

  const toggleButton = async (e) => {
    if (!likeMe) {
      try {
        const r = await fetch(`${PRODUCT_FAVORITE}/add/${product_id}`, {
          method: 'POST',
        })
        // const result = await r.json()
        dataChange(product_id) //改顯示狀態
        openSnackbar('成功加入收藏')
      } catch (ex) {
        console.log(ex)
      }
    } else {
      try {
        const r = await fetch(`${PRODUCT_FAVORITE}/delete/${product_id}`, {
          method: 'DELETE',
        })
        // const result = await r.json()
        dataChange(product_id) //改顯示狀態
        openSnackbar('已取消收藏', 'error')
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
