import Head from 'next/head'
import Navbar from './navbar/index'
import Footer from './footer/index'
import TopBtn from './top-btn'

export default function IndexLayout({ children, title = '', pageName = '' }) {
  const siteTitle = '悄瞧'
  return (
    <>
      <Head>
        <title>{`${title ? `${title} | ` : ''}${siteTitle}`}</title>
      </Head>
      <Navbar pageName={pageName} />
      {children}
      <TopBtn />
      <Footer />
    </>
  )
}
