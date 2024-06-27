import Image from 'next/image'
import Link from 'next/link'

import { useAuth } from '@/context/auth-context'
import { API_SERVER } from '@/config/app-path'

import styles from './nav-menu.module.scss'
import { MdLogout } from 'react-icons/md'
import Avatar from '@mui/joy/Avatar'
import MenuList from './menu'

export default function NavMenu({ show = '' }) {
  const { login, logout, auth } = useAuth()
  console.log(`${API_SERVER}/avatar/${auth.avatar}`)
  return (
    <>
      <div
        className={`${styles['nav-menu']} animate__animated ${show}`}
        // style={{ display: show === true ? 'flex' : 'none' }}
      >
        <ul className={styles['user']}>
          <li>
            <div className={styles['avatar']}>
              <Avatar
                size="lg"
                variant="plain"
                alt=""
                src={auth.avatar ? `${API_SERVER}/avatar/${auth.avatar}` : ''}
              />
            </div>
            <span>{auth.nickname}</span>
          </li>
          <li>
            <Link href="#/" onClick={logout}>
              <MdLogout />
              <span>登出</span>
            </Link>
          </li>
        </ul>
        <div className={styles['line']}></div>
        <div>
          <MenuList/>
        </div>
        <Image
          src="/ghost/ghost_02.png"
          alt="bg"
          width={317}
          height={234}
          className={styles['bg-ghost']}
        />
      </div>
    </>
  )
}
