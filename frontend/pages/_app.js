import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
import { AuthContextProvider } from '@/context/auth-context'
import { SnackbarContextProvider } from '@/context/snackbar-context'
import { LoginContextProvider } from '@/context/login-context'
import { DateProvider } from '@/context/date-context'
import { ConfirmDialogProvider } from '@/context/confirm-dialog-context'
import { CartProvider } from '@/context/cart-context'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import LoadingSpinner from '@/components/UI/loading-spinner'

export default function MyApp({ Component, pageProps }) {
  // 使用自訂在頁面層級的版面(layout)
  const getLayout = Component.getLayout || ((page) => page)

  const [pageLoading, setPageLoading] = useState() // 控制網頁 loading

  // loading control
  useEffect(() => {
    const handleStart = () => setPageLoading(true)
    const handleComplete = () => setPageLoading(false)

    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleComplete)
    Router.events.on('routeChangeError', handleComplete)

    return () => {
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleComplete)
      Router.events.off('routeChangeError', handleComplete)
    }
  }, [])

  return getLayout(
    <>
      {pageLoading && <LoadingSpinner />}
      <AuthContextProvider>
        <SnackbarContextProvider>
          <ConfirmDialogProvider>
            <CartProvider>
              <LoginContextProvider>
                <DateProvider>
                  <Component {...pageProps} />
                </DateProvider>
              </LoginContextProvider>
            </CartProvider>
          </ConfirmDialogProvider>
        </SnackbarContextProvider>
      </AuthContextProvider>
    </>
  )
}
