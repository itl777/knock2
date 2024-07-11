import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
// Context
import { CartProvider } from '@/context/cart-context'
import { AuthContextProvider } from '@/context/auth-context'
import { SnackbarContextProvider } from '@/context/snackbar-context'
import { LoginContextProvider } from '@/context/login-context'

export default function MyApp({ Component, pageProps }) {
  // 使用自訂在頁面層級的版面(layout)
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <AuthContextProvider>
      <SnackbarContextProvider>
        <CartProvider>
          <LoginContextProvider>
            <Component {...pageProps} />
          </LoginContextProvider>
        </CartProvider>
      </SnackbarContextProvider>
    </AuthContextProvider>
  )
}
