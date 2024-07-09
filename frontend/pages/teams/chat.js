import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CHAT_GET } from '@/configs/api-path'
import styles from './teams.module.css'
import PdBtnContained from '@/components/UI/pd-btn-contained'

export default function ChatDisplay({
  chat_at = 0,
  chat_by = 0,
  nick_name = '暱稱',
  avatar = 'default.png',
  chat_text = '留言內容',
  create_at = '留言時間',
}) {
  return (
    <>
      <div className={styles.borderbox}>
        <h4>留言給團長</h4>
        <form>
          <inputarea></inputarea>
        </form>
        <div style={{ textAlign: 'center' }}>
          <PdBtnContained btnText="送出留言" color="grey" />
        </div>
      </div>

      <div className={styles.borderbox}>
        <div>
          <h4>留言區</h4>
        </div>
        <img src={`/${avatar}`} />
        <div>
          {nick_name} {create_at}
        </div>
        <div>{chat_text}</div>
        <hr />
      </div>
    </>
  )
}
