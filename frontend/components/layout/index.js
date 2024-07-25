import { useState } from 'react'
import Head from 'next/head'
import Navbar from './Index-layout-item/navbar/index'
import Footer from './Index-layout-item/footer/index'
import TopBtn from './Index-layout-item/top-btn'

export default function IndexLayout({
  children = '',
  title = '',
  pageName = '',
  background = '',
}) {
  const siteTitle = '悄瞧'

  return (
    <>
      <section className={`layout ${background}`}>
        <Head>
          <title>{`${title ? `${title} | ` : ''}${siteTitle}`}</title>
        </Head>
        <Navbar pageName={pageName} />
        <main className="main">{children}</main>
        <TopBtn />
        <Footer />
      </section>
      <style jsx>
        {`
          .layout {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
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

          .main {
            flex: 1;
          }
        `}
      </style>
    </>
  )
}
