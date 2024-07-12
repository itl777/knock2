import { useState, useEffect } from 'react'
import { PRODUCT_BACKEND_IMG } from '@/configs/api-path'
import 'hover.css/css/hover-min.css'

export const useProductImg = (product_id) => {
  const [data, setData] = useState([])
  // 取得商品join img 內容
  const myId = product_id

  const getImgArray = async (myId) => {
    const url = `http://localhost:3001/products/img/${myId}`

    let newData = []
    try {
      const res = await fetch(url)
      const resData = await res.json()
      if (resData.success) {
        resData.rows.map((v) => {
          newData.push(v.img_id)
        })
        setData(newData)
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    getImgArray(product_id)
  }, [product_id])

  // 一個產品三張圖
  // 一個變數存首張的檔名、一個變數存[]

  // 取用位置list 用

  // 細節用map插入

  return data
}
