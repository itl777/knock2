import { useState, useRef } from 'react'
// context
import { useAuth } from '@/context/auth-context'
// styles
import styles from './nav-styles.module.scss'
// components
import NavbarIcon from './navbar-icon'
import NavbarLinks from './navbar-links'
import NavMenu from './nav-menu'
import AuthModal from '@/components/page-components/user/AuthModal'
import { useLoginModal } from '@/context/login-context/index'

export default function Navbar({ pageName }) {
  // context && Ref
  const { auth } = useAuth()
  const timeOutRef = useRef(null)
  const hideNavMenuRef = useRef(null)
  const { loginFormSwitch } = useLoginModal()
  // state
  const [menuState, setMenuState] = useState(`${styles['menu-hide']}`)
  const [showNavMenu, setShowNavMenu] = useState(false)
  const [navMenuAnimate, setNavMenuAnimate] = useState('')

  // function
  const handleMobileMenu = () => {
    const newMenu =
      menuState === 'animate__bounceInDown'
        ? 'animate__bounceOutUp'
        : 'animate__bounceInDown'
    setMenuState(newMenu)
  }

  const handleNavMenuClose = () => {
    timeOutRef.current = setTimeout(() => {
      setNavMenuAnimate('animate__bounceOutUp')
      hideNavMenuRef.current = setTimeout(() => {
        setShowNavMenu(false)
      }, 1000)
    }, 1000)
  }

  const handleNavMenuOpen = (event) => {
    event.preventDefault()
    if (!auth.id) {
      loginFormSwitch('Login')
      // login('test@test.com', '123456')
    } else {
      clearTimeout(timeOutRef.current)
      clearTimeout(hideNavMenuRef.current)
      if (showNavMenu === false) setShowNavMenu(true)
      setNavMenuAnimate('animate__bounceInDown')
    }
  }

  const handleNavMenuTimeOut = () => {
    clearTimeout(timeOutRef.current)
    clearTimeout(hideNavMenuRef.current)
  }

  return (
    <>
      <header
        className={styles['navbar']}
        onMouseLeave={handleNavMenuClose}
        onMouseEnter={handleNavMenuTimeOut}
      >
        {showNavMenu && auth.id ? <NavMenu show={navMenuAnimate} /> : ''}
        <AuthModal />
        <nav>
          <NavbarIcon
            key={auth}
            handleNavMenuOpen={handleNavMenuOpen}
            handleMobileMenu={handleMobileMenu}
          />
          <NavbarLinks pageName={pageName} menuState={menuState} />
        </nav>
      </header>
    </>
  )
}
