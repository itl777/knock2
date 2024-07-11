import Link from 'next/link'
import Image from 'next/image'

import { API_SERVER } from '@/configs/api-path'
import { useAuth } from '@/context/auth-context'

import Avatar from '@mui/joy/Avatar'
import { FaCircleUser } from 'react-icons/fa6'
import { TiThMenu } from 'react-icons/ti'
import CheckoutOffcanvas from '@/components/page-components/checkout/checkout-offcanvas'
import styles from '../nav-styles.module.scss'

export default function NavbarIcon({ handleNavMenuOpen, handleMobileMenu }) {
  const { auth } = useAuth()
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
          <Link href="" onClick={handleNavMenuOpen}>
            {auth.id ? (
              <Avatar
                size="md"
                variant="solid"
                alt={auth.nickname}
                src={auth.avatar ? `${API_SERVER}/avatar/${auth.avatar}` : ''}
              />
            ) : (
              <FaCircleUser />
            )}
          </Link>
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
