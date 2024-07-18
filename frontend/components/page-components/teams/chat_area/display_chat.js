import { useState, useEffect } from 'react'
import moment from 'moment-timezone'
import { DISPLAY_CHAT } from '@/configs/api-path'
import { API_SERVER } from '@/configs/api-path'
import styles from '@/pages/teams/teams.module.css'
import Image from 'next/image'

const ChatDisplay = ({ chat_at, submissionCount }) => {
  const [chatData, setChatData] = useState([])

  const fetchChatData = async (chat_at) => {
    const url = DISPLAY_CHAT + chat_at
    try {
      const resChat = await fetch(url)
      const resChatData = await resChat.json()

      if (resChatData.success) {
        setChatData(resChatData.data)
      }
    } catch (e) {
      console.error('Error fetching chat data: ', e)
    }
  }

  useEffect(() => {
    if (chat_at) {
      fetchChatData(chat_at)
    }
  }, [chat_at, submissionCount])

  return (
    <>
      <div className={styles.borderbox}>
        <div className="row">
          <h4>留言區</h4>
        </div>
        {chatData.map((chat) => (
          <div key={chat.chat_id}>
            <div className="row">
              <div>
                <Image
                  src={chat.avatar ? `${API_SERVER}/avatar/${chat.avatar}` : ''}
                  width={26}
                  height={26}
                  alt={`${chat.nick_name} avatar`}
                />
                {/* <img
                  src={chat.avatar ? `${API_SERVER}/avatar/${chat.avatar}` : ''}
                  style={{ height: 26, width: 26 }}
                  alt={`${chat.nick_name} avatar`}
                /> */}
                {chat.nick_name}
                <br />
                {moment(chat.create_at)
                  .tz('Asia/Taipei')
                  .format('YYYY年MM月DD日 HH:mm')}
              </div>
              <div>{chat.chat_text}</div>
              <hr />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ChatDisplay
