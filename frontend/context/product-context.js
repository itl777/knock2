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

  const getProductRows = async (page) => {
    // if (!page) {
    //   router.push({
    //     pathname: router.pathname,
    //     query: { ...router.query, page: 1 },
    //   })
    // }
    page = page || 1
    const url = `http://127.0.0.1:3001/products?page=${page}`
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
    let { page } = router.query
    if (!page) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: 1 },
      })
    }
    if (router.isReady) {
      if (router.asPath.includes('/product/product-favorite')) {
        getFavorite(page)
      } else if (router.asPath.includes('/product')) {
        getProductRows(page)
      }
    }
    // window.scrollTo({ top: 0, behavior: 'auto' })
  }, [router.query])

  return (
    <ProductContext.Provider
      value={{ getFavorite, getProductRows, data, router }}
    >
      {children}
    </ProductContext.Provider>
  )
}
