import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from '@/context/auth-context'
import myStyle from './message.module.css'
import { IoIosArrowBack } from 'react-icons/io'
import { GoPaperAirplane } from 'react-icons/go'
import { AiFillMessage } from 'react-icons/ai'

const socket = io('http://localhost:4040')

export default function Message() {
  //toggle
  const [toggleButton, setToggleButton] = useState(false)
  // 使用者名稱
  const [username, setUsername] = useState('')
  // 訊息
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  // 新房間
  const [room, setRoom] = useState('')

  // 取得會員id
  const { auth, authIsReady } = useAuth()
  useEffect(() => {
    // 設定room名稱 [room_XXX]
    const roomName = `room_${auth.id}`
    console.log('會員資料:', auth)
    setUsername(auth.nickname)
    setRoom(roomName)

    socket.emit('joinRoom', { room: roomName, username: auth.nickname })
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
    socket.on('disconnect', () => {
      console.log('用戶斷開連接')
      // socket.emit('user_offline', room)
    })

    return () => {
      socket.off('chat message')
      socket.off('history')
      socket.off('joinRoom')
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

  const messageEndRef = useRef(null)

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleButton = () => {
    setToggleButton(!toggleButton)
  }

  return toggleButton ? (
    // 最外層
    <div className={myStyle.fix}>
      {/* 頂端區 */}
      <div className={myStyle.top}>
        <button className={myStyle.topArrow} onClick={handleButton}>
          <IoIosArrowBack />
        </button>
        <h5>目前位置 : {room}</h5>
      </div>

      {/* 文字區 */}
      <div id={myStyle.messageArea}>
        <div className={myStyle.msgtext}>
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.username}: </strong>
              {msg.message}
            </p>
          ))}
          <div ref={messageEndRef} />
        </div>
      </div>

      {/* 按鈕區 */}
      <div className={myStyle.bottom}>
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
          <button type="submit">
            <GoPaperAirplane />
          </button>
        </form>
      </div>
    </div>
  ) : (
    <button className={myStyle.openButton} onClick={handleButton}>
      <AiFillMessage />
    </button>
  )
}
