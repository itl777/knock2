import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from './Index-layout-item/navbar/index'
import Footer from './Index-layout-item/footer/index'
import TopBtn from './Index-layout-item/top-btn'
import Router from 'next/router'
import LoadingSpinner from '@/components/UI/loading-spinner'

export default function IndexLayout({
  children = '',
  title = '',
  pageName = '',
  background = '',
}) {
  const siteTitle = '悄瞧'

  const [pageLoading, setPageLoading] = useState() // 控制網頁 loading

  // 控制網頁 loading
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

  return (
    <>
      <Head>
        <title>{`${title ? `${title} | ` : ''}${siteTitle}`}</title>
      </Head>
      {pageLoading && <LoadingSpinner />}
      <Navbar pageName={pageName} />
      <main className={`bg ${background}`}>
        {children}
        <TopBtn />
        <Footer />
      </main>
      <style jsx>
        {`
          .bg {
            background-color: white;
          }
          .light {
            background: url('/bg-light.png') no-repeat;
            background-attachment: fixed;
            background-size: cover;
          }
          .dark {
            background: url('/bg-dark.png') no-repeat;
            background-attachment: fixed;
            background-size: cover;
          }
        `}
      </style>
    </>
  )
}
