import Link from 'next/link'
import Image from 'next/image'

import { API_SERVER } from '@/configs/api-path'
import { useAuth } from '@/context/auth-context'

import Avatar from '@mui/joy/Avatar'
import { FaCircleUser } from 'react-icons/fa6'
import { TiThMenu } from 'react-icons/ti'
import ClearButton from '@/components/UI/ClearButton'
import CheckoutOffcanvas from '@/components/page-components/checkout/checkout-offcanvas'
import styles from '../nav-styles.module.scss'
import NavMenu from './nav-menu'
import { useState } from 'react'
import { useLoginModal } from '@/context/login-context/index'

export default function NavbarIcon({ handleMobileMenu }) {
  const { auth } = useAuth()
  const { loginFormSwitch } = useLoginModal()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleNavMenuOpen = (event) => {
    event.preventDefault()
    if (!auth.id) {
      loginFormSwitch('Login')
    } else {
      if (!open) {
        setAnchorEl(event.currentTarget)
      } else {
        setAnchorEl(null)
      }
    }
  }

  return (
    <>
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
          <ClearButton
            onClick={handleNavMenuOpen}
            btnText={
              auth.id ? (
                <Avatar
                  size="md"
                  variant="solid"
                  alt={auth.nickname}
                  src={auth.avatar ? `${API_SERVER}/avatar/${auth.avatar}` : ''}
                />
              ) : (
                <FaCircleUser />
              )
            }
          />
          <NavMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleNavMenuOpen}
          />
          <a>
            <CheckoutOffcanvas />
          </a>
          <a>
            <TiThMenu onClick={handleMobileMenu} className={styles['menu']} />
          </a>
        </li>
      </ul>
    </>
  )
}
