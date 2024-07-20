import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from '@/context/auth-context'
import myStyle from './message.module.css'

const socket = io('http://localhost:4040')

export default function Message() {
  // 使用者名稱
  const [username, setUsername] = useState('')
  // 訊息
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  // 新房間
  const [room, setRoom] = useState('') //

  // 取得會員id
  const { auth, authIsReady } = useAuth()
  useEffect(() => {
    // 設定room名稱 [room_XXX]
    const roomName = `room_${auth.id}`
    console.log('會員資料:', auth)
    setUsername(auth.nickname)
    setRoom(roomName)

    socket.emit('joinRoom', { room: roomName, username })
  }, [authIsReady, auth])

  useEffect(() => {
    socket.on('chat message', ({ room, username, message }) => {
      console.log('前台clint:', { room, username, message })
      setMessages((prevMsg) => [...prevMsg, { room, username, message }])
    })

    socket.on('history', (history) => {
      console.log('history 監聽', history)
      setMessages(history)
    })

    return () => {
      socket.off('chat message')
      socket.off('history')
    }
  }, [])

  // 點送出按鈕
  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      // 傳給server
      console.log('發送訊息:', room, username, message)
      socket.emit('chat message', { room, username, message })
      // setMessages((prevMsg) => [...prevMsg, { room, username, message }])
      setMessage('')
    }
  }

  return (
    <div className={myStyle.fix}>
      {/* 頂端返回 商店名稱 */}
      <div className={myStyle.top}>
        <h5>目前位置 : {room}</h5>
      </div>

      {/* 文字區 */}
      <div className={myStyle.messageArea}>
        <div className={myStyle.msgtext}>
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.username}: </strong>
              {msg.message}
            </p>
          ))}
        </div>

        
        {/* 按鈕 */}
        <form
          id={myStyle.form}
          className={myStyle.input}
          onSubmit={sendMessage}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}
