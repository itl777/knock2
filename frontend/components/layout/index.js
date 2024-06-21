import Navbar from './navbar'
import Footer from './footer'

export default function IndexLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
