import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Avatar from '@mui/joy/Avatar'
import NavMenu from './nav-menu'
import CheckoutOffcanvas from '@/components/UI/checkout-offcanvas'
import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/configs/api-path'

import styles from './nav-styles.module.scss'
import { FaCircleUser } from 'react-icons/fa6'
import { TiThMenu } from 'react-icons/ti'

export default function Navbar({ pageName }) {
  const { login, auth } = useAuth()
  const [menuState, setMenuState] = useState(`${styles['menu-hide']}`)
  const [showNavMenu, setShowNavMenu] = useState(false)
  const [navMenuAnimate, setNavMenuAnimate] = useState('')
  const timeOutRef = useRef(null)
  const hideNavMenuRef = useRef(null)

  const openMenu = () => {
    const newMenu =
      menuState === 'animate__bounceInDown'
        ? 'animate__bounceOutUp'
        : 'animate__bounceInDown'
    setMenuState(newMenu)
  }

  const handleMouseOut = () => {
    timeOutRef.current = setTimeout(() => {
      setNavMenuAnimate('animate__bounceOutUp')
      hideNavMenuRef.current = setTimeout(() => {
        setShowNavMenu(false)
      }, 1000)
    }, 1000)
  }

  const handleMouseOver = (event) => {
    event.preventDefault()
    login('test@test.com', '123456')

    clearTimeout(timeOutRef.current)
    clearTimeout(hideNavMenuRef.current)
    if (showNavMenu === false) setShowNavMenu(true)
    setNavMenuAnimate('animate__bounceInDown')
  }

  const handleNavMenuMouseOver = () => {
    clearTimeout(timeOutRef.current)
    clearTimeout(hideNavMenuRef.current)
  }

  return (
    <>
      <header
        className={styles['navbar']}
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleNavMenuMouseOver}
      >
        {showNavMenu && auth.id ? <NavMenu show={navMenuAnimate} /> : ''}
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
              <Link href="" onClick={handleMouseOver}>
                {auth.id ? (
                  <Avatar
                    size="md"
                    variant="solid"
                    alt={auth.nickname}
                    src={
                      auth.avatar ? `${API_SERVER}/avatar/${auth.avatar}` : ''
                    }
                  />
                ) : (
                  <FaCircleUser />
                )}
              </Link>
              <a>
                <CheckoutOffcanvas />
              </a>
              <a>
                <TiThMenu onClick={openMenu} className={styles['menu']} />
              </a>
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
