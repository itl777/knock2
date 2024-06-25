import React from 'react'
import Image from 'next/image'
import styles from './nav-menu.module.scss'
import { MdLogout } from 'react-icons/md'

export default function NavMenu({ show = '' }) {
  return (
    <>
      <div
        className={`${styles['nav-menu']} animate__animated ${show}`}
        // style={{ display: show === true ? 'flex' : 'none' }}
      >
        <ul className={styles['user']}>
          <li>
            <div className={styles['avatar']}>
              {/* <Image /> */}
            </div>
            <span>會員暱稱</span>
          </li>
          <li>
            <MdLogout />
            <span>登出</span>
          </li>
        </ul>
        <div className={styles['line']}></div>
        <div>
          <div>M</div>
          <div>E</div>
          <div>N</div>
          <div>U</div>
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
