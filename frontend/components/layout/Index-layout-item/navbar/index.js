import { useState } from 'react'
import styles from './nav-styles.module.scss'
import { FaCircleUser } from 'react-icons/fa6'
import { TiThMenu } from 'react-icons/ti'
import Link from 'next/link'
import Image from 'next/image'
import NavMenu from './nav-menu'
import CheckoutOffcanvas from '@/components/UI/checkout-offcanvas'

export default function Navbar({ pageName }) {
  const [menuState, setMenuState] = useState(`${styles['menu-hide']}`)
  const [showNavMenu, setShowNavMenu] = useState(false)
  const [navMenuAnimate, setNavMenuAnimate] = useState('')

  const openMenu = () => {
    const newMenu =
      menuState === 'animate__bounceInDown'
        ? 'animate__bounceOutUp'
        : 'animate__bounceInDown'
    setMenuState(newMenu)
  }

  const handleMouseOver = () => {
    if (showNavMenu === false) setShowNavMenu(true)
    setNavMenuAnimate('animate__bounceInDown')
  }

  const handleMouseOut = () => {
    setNavMenuAnimate('animate__bounceOutUp')
  }

  return (
    <>
      <header className={styles['navbar']} onMouseLeave={handleMouseOut}>
        {showNavMenu ? <NavMenu show={navMenuAnimate} /> : ''}
        <nav>
          <ul className={styles['navbar-icon']}>
            <li>
              <Link href="/">
                <Image
                  src="/home/ghost-logo.svg"
                  alt="LOGO"
                  width={50}
                  height={50}
                  className={styles['logo-mobile']}
                />
              </Link>
            </li>
            <li>
              <Link href="/user" onMouseEnter={handleMouseOver}>
                <FaCircleUser />
              </Link>
              <a>
                <TiThMenu onClick={openMenu} className={styles['menu']} />
              </a>
            </li>
            <li>
              <CheckoutOffcanvas />
            </li>
          </ul>
          <ul
            className={`${styles['navbar-links']} animate__animated ${menuState}`}
          >
            <li>
              <Link href="/">
                <span
                  className={styles[pageName === 'index' ? 'page-name' : '']}
                >
                  首頁
                </span>
              </Link>
            </li>
            <li>
              <Link href="/themes">
                <span
                  className={styles[pageName === 'themes' ? 'page-name' : '']}
                >
                  密室逃脫
                </span>
              </Link>
            </li>
            <li className="logo">
              <Link href="/">
                <Image
                  src="/home/LOGO.svg"
                  alt="LOGO"
                  width={134.96}
                  height={61.26}
                  className={styles['logo-screen']}
                />
              </Link>
            </li>
            <li>
              <Link href="/teams">
                <span
                  className={styles[pageName === 'teams' ? 'page-name' : '']}
                >
                  揪團
                </span>
              </Link>
            </li>
            <li>
              <Link href="/product">
                <span
                  className={styles[pageName === 'product' ? 'page-name' : '']}
                >
                  桌遊商城
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
