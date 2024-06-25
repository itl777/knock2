import { useState } from 'react'
import Head from 'next/head'
import Navbar from './navbar/index'
import Footer from './footer/index'
import TopBtn from './top-btn'

export default function IndexLayout({
  children = '',
  title = '',
  pageName = '',
  background = '',
}) {
  const siteTitle = '悄瞧'

  return (
    <>
      <Head>
        <title>{`${title ? `${title} | ` : ''}${siteTitle}`}</title>
      </Head>
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
            background-size: cover;
          }
          .dark {
            background: url('/bg-dark.png') no-repeat;
            background-size: cover;
          }
        `}
      </style>
    </>
  )
}
