import React, { createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ProductContext = createContext()

export function useProduct() {
  return useContext(ProductContext)
}

export const ProductProvider = ({ children }) => {
  const router = useRouter()
  const [data, setData] = useState({
    success: false,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    rows: [],
  })

  const getFavorite = async (page) => {
    page = page || 1
    const url = `http://127.0.0.1:3001/products/favorite?page=${page}`
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
    if (router.isReady) {
      console.log('router.isReady', router.query)
      const { page } = router.query
      getFavorite(page)
    }
    // window.scrollTo({ top: 0, behavior: 'auto' })
  }, [router.query])

  return (
    <ProductContext.Provider value={{ getFavorite, data, router }}>
      {children}
    </ProductContext.Provider>
  )
}
