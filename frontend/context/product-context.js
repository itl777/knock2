import React, { createContext, useContext } from 'react'

const ProductContext = createContext()

export function useProduct() {
  return useContext(ProductContext)
}

export const ProductProvider = (children) => {
  return (
    <ProductContext.Provider value={{}}>{children}</ProductContext.Provider>
  )
}
