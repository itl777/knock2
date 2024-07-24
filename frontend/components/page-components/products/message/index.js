import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client'
import { useAuth } from '@/context/auth-context'
import myStyle from './message.module.css'
import { IoIosArrowBack } from 'react-icons/io'
import { GoPaperAirplane } from 'react-icons/go'
import { AiFillMessage } from 'react-icons/ai'
import 'animate.css/animate.css'

const socket = io('http://localhost:4040')

export default function Message() {
  const router = useRouter()
  // ****************IT 畫面在最頂端時隱藏top按鈕
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  // ****************IT
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
    if(roomName === 'room_0') return
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
      // console.log('history 監聽', history)
      setMessages(history)
    })
    socket.on('disconnect', () => {
      console.log('前端用戶斷開連接')
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
    messageEndRef.current?.scrollIntoView({ block: 'end', inline: 'nearest' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, router.isReady, toggleButton])

  const handleButton = () => {
    setToggleButton(!toggleButton)
  }

  return toggleButton ? (
    // 最外層

    <div
      className={`${myStyle.fix} animate__animated animate__fadeInUp animate__faster`}
    >
      {/* 頂端區 */}
      <div className={myStyle.top}>
        <button className={myStyle.topArrow} onClick={handleButton}>
          <IoIosArrowBack />
        </button>
        {/* <h5>悄瞧{room}</h5> */}
        <h5>悄瞧</h5>
      </div>

      {/* 文字區 */}
      <div id={myStyle.messageArea}>
        <div className={myStyle.msgtext} ref={messageEndRef}>
          {/* 訊息放置處 */}
          {messages.map((msg, index) => {
            if (msg.username !== '管理員') {
              return (
                <div
                  key={index}
                  className={`${myStyle.message} ${myStyle.left}`}
                >
                  <p key={index} className={myStyle.msgLeft}>
                    {/* <strong>{msg.username}: </strong> */}
                    {msg.message}
                  </p>
                </div>
              )
            } else {
              return (
                <div
                  key={index}
                  className={`${myStyle.message} ${myStyle.right}`}
                >
                  <img src="/ghost/ghost_15.png" alt="" />
                  <p key={index} className={myStyle.msgRight}>
                    {/* <strong>{msg.username}: </strong> */}
                    {msg.message}
                  </p>
                </div>
              )
            }
          })}
          {/* <div ref={messageEndRef} /> */}
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
    <div className={`${visible ? '' : myStyle['visible']}`}>
      <button
        className={`${myStyle.openButton} animate__animated animate__fadeInDown animate__faster`}
        onClick={handleButton}
      >
        <AiFillMessage />
      </button>
    </div>
  )
}
