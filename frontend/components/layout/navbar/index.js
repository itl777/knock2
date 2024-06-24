import { useState } from 'react'
import styles from './nav-styles.module.scss'
import { FaCircleUser, FaCartShopping } from 'react-icons/fa6'
import { TiThMenu } from 'react-icons/ti'
import Link from 'next/link'
import Image from 'next/image'
import NavMenu from './nav-menu'

export default function Navbar() {
  const [menuState, setMenuState] = useState(`${styles['menu-hide']}`)
  const [showNavMenu, setShowNavMenu] = useState(`${styles['nav-menu-hide']}`)

  const openMenu = () => {
    const newMenu =
      menuState === 'animate__bounceInDown'
        ? 'animate__bounceOutUp'
        : 'animate__bounceInDown'
    setMenuState(newMenu)
  }

  const handleMouseOver = () => {
    setShowNavMenu('animate__bounceInDown')
  }

  const handleMouseOut = () => {
    setShowNavMenu('animate__bounceOutUp')
  }

  return (
    <>
      <header className={styles['navbar']} onMouseLeave={handleMouseOut}>
        <NavMenu show={showNavMenu} />
        <nav>
          <ul className={styles['navbar-icon']}>
            <li>
              <Link href="#">
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
              <Link href="#" onMouseEnter={handleMouseOver}>
                <FaCircleUser />
              </Link>
              <Link href="#">
                <FaCartShopping />
              </Link>
              <a>
                <TiThMenu onClick={openMenu} className={styles['menu']} />
              </a>
            </li>
          </ul>
          <ul
            className={`${styles['navbar-links']} animate__animated ${menuState}`}
          >
            <li>
              <Link href="#">
                <span>首頁</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span>密室逃脫</span>
              </Link>
            </li>
            <li className="logo">
              <Link href="#">
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
              <Link href="#">
                <span>揪團</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span>桌遊商城</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
