import { useState, useEffect } from 'react'
import moment from 'moment-timezone'
import { GET_CHAT } from '@/configs/api-path'
import styles from './teams.module.css'

const ChatDisplay = ({ chat_at }) => {
  const [chatData, setChatData] = useState([])

  const fetchChatData = async (chat_at) => {
    const url = GET_CHAT + chat_at
    try {
      const resChat = await fetch(url)
      const resChatData = await resChat.json()

      if (resChatData.success) {
        setChatData(resChatData.data)
      }
    } catch (e) {
      console.error("Error fetching chat data: ", e)
    }
  }

  useEffect(() => {
    if (chat_at) {
      fetchChatData(chat_at)
    }
  }, [chat_at])

  return (
    <>
      <div className={styles.borderbox}>
        <div className="container">
          <div className="row">
            <h4>留言區</h4>
          </div>
          <div className="row">
            {chatData.map((chat) => (
              <div key={chat.chat_id}>
                <div className="row">
                  {/* <img src={`/${chat.avatar}`} alt={`${chat.nick_name} avatar`} /> */}
                  <div>
                    {chat.nick_name} {moment(chat.create_at).tz('Asia/Taipei').format('YYYY年MM月DD日 HH:mm')}
                  </div>
                  <div>{chat.chat_text}</div>
                  <hr />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatDisplay
