import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GET_CHAT } from '@/configs/api-path'
import styles from '../teams.module.css'
import PdBtnContained from '@/components/UI/pd-btn-contained'

export default function ChatDisplay() {

  const router = useRouter()

  const [chat, setChat] = useState({
    chat_at: 0,
    chat_by: 0,
    nick_name: '暱稱',
    avatar: 'default.png',
    chat_text: '留言內容',
    create_at: '留言時間',
  })

  const getChat = async (chat_at) => {

    const url = GET_CHAT + chat_at
    try {
      const res = await fetch(url)
      //
      const resData = await res.json()

      if (resData.success) {
        const chat = resData.data
        if (chat && chat.chat_at) {
          setChat({
            // chat_at: chatData.chat_at || 0,
            chat_by: chat.chat_by || 0,
            nick_name: chat.nick_name || '',
            avatar: chat.avatar || '',
            chat_text: chat.chat_text || '',
            create_at: chat.create_at || '',
          })
          console.log('chat data set successfully', chat)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query)
      const { chat_at } = router.query
      getChat(chat_at)
      console.log(chat)
    }
  })



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
        <img src={`/${chat.avatar}`} />
        <div>
          {chat.nick_name} {chat.create_at}
        </div>
        <div>{chat.chat_text}</div>
        <hr />
      </div>
    </>
  )
}
