import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/share-order.css'
import '@/styles/globals.css'
import { CartProvider } from '@/context/cart-context'

import AuthContext, { AuthContextProvider } from '@/context/auth-context'

export default function MyApp({ Component, pageProps }) {
  // 使用自訂在頁面層級的版面(layout)
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <AuthContextProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthContextProvider>
  )
}

