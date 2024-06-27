import { createContext, useContext, useEffect, useState } from 'react'
import { API_SERVER, JWT_LOGIN_POST } from '@/config/app-path'

const AuthContext = createContext()
const storageKey = 'knock-knock-auth'
const emptyAuth = {
  id: 0,
  account: '',
  nickname: '',
  token: '',
}
// component
export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({ ...emptyAuth })

  const login = async (account, password) => {
    try {
      const r = await fetch(JWT_LOGIN_POST, {
        method: 'POST',
        body: JSON.stringify({ account, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await r.json()
      if (result.success) {
        // token 和用戶的相關資料存到 localStorage
        localStorage.setItem(storageKey, JSON.stringify(result.data))

        // 變更狀態
        setAuth(result.data)
      }
      return result.success
    } catch (ex) {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem(storageKey)
    setAuth(emptyAuth)
  }

  const getAuthHeader = () => {
    if (auth.token) {
      return { Authorization: 'Bearer ' + auth.token }
    } else {
      return {}
    }
  }

  // 用戶如果重刷頁面，狀態可以由 localStorage 載入
  useEffect(() => {
    const str = localStorage.getItem(storageKey)
    if (!str) return
    try {
      const data = JSON.parse(str)
      const { token } = data

      fetch(`${API_SERVER}/verify-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((r) => r.json())
        .then((result) => {
          if (!result.success) {
            return
          }
        })
      if (data?.id && data?.token) {
        setAuth(data)
      }
    } catch (ex) {
      console.log(ex)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, auth, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthContext
