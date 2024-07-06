import React, { createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { PRODUCT_FAVORITE, PRODUCT_LIST } from '@/configs/api-path'

const ProductContext = createContext()

export function useProduct() {
  return useContext(ProductContext)
}

export const ProductProvider = ({ children }) => {
  const router = useRouter()
  // 數量在這裡
  const [buyQuantity, setBuyQuantity] = useState(1)

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    rows: [],
  })

  const getFavorite = async (page) => {
    page = page || 1
    const url = `${PRODUCT_FAVORITE}?page=${page}`
    try {
      const res = await fetch(url)
      const resData = await res.json()
      if (resData.success) {
        setData(resData)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getProductRows = async (page, category_id, sort, order) => {
    // if (!page) {
    //   router.push({
    //     pathname: router.pathname,
    //     query: { ...router.query, page: 1 },
    //   })
    // }
    page = page || 1
    category_id = category_id || ''
    sort = sort || ''
    order = order || ''
    const url = `${PRODUCT_LIST}?page=${page}&category_id=${category_id}&sort=${sort}&order=${order}`
    try {
      const res = await fetch(url)
      const resData = await res.json()
      if (resData.success) {
        setData(resData)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    let { page, category_id, sort, order } = router.query
    // if (!page) {
    //   router.push({
    //     pathname: router.pathname,
    //     query: { ...router.query, page: 1 },
    //   })
    // }
    if (router.isReady) {
      // console.log(router.asPath)
      const url = router.asPath.split('?')
      if (url[0] === '/product/product-favorite') {
        getFavorite(page)
      } else if (url[0] === '/product') {
        getProductRows(page, category_id, sort, order)
      }
    }
    // window.scrollTo({ top: 0, behavior: 'auto' })
  }, [router.query])

  return (
    <ProductContext.Provider
      value={{
        getFavorite,
        getProductRows,
        data,
        router,
        buyQuantity,
        setBuyQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
