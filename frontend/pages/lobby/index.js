import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4040')

export default function Lobby() {
  // 使用者名稱
  const [username, setUsername] = useState('')
  const [isUsernameSet, setIsUsernameSet] = useState(false)
  // 訊息
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  // 新房間
  const [room, setRoom] = useState('')
  const [isRoomSet, setIsRoomSet] = useState(false)

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
      socket.close()
    }
  }, [])

  // 點送出按鈕
  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      // 傳給server
      socket.emit('chat message', { room, username, message })
      setMessage('')
    }
  }
  // Username
  const handleUsernameSubmit = (e) => {
    e.preventDefault()
    if (username) {
      setIsUsernameSet(true)
    }
  }
  // RoomSubmit
  const handleRoomSubmit = (e) => {
    e.preventDefault()
    if (room) {
      socket.emit('joinRoom', { room, username })
      setIsRoomSet(true)
    }
  }

  return (
    <div>
      <h1>React and Socket.io Chat</h1>
      {!isUsernameSet ? (
        <form onSubmit={handleUsernameSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Set Username</button>
        </form>
      ) : !isRoomSet ? (
        <form onSubmit={handleRoomSubmit}>
          <input
            type="text"
            placeholder="Enter room ID"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit">Join Room</button>
        </form>
      ) : (
        <div>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
          <div>
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.username}: </strong>
                {msg.message}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
