import { useState, useEffect } from 'react'

import { ADD_CHAT } from '@/configs/api-path'

import styles from '@/components/page-components/teams/teams.module.css'
import { useSnackbar } from '@/context/snackbar-context'

export default function AddChatForm({ chat_at, chat_by, onSubmit }) {
  const [chatText, setChatText] = useState('')
  const [isValid, setIsValid] = useState(false)
  const { openSnackbar } = useSnackbar()

  useEffect(() => {
    const length = chatText.length
    setIsValid(length >= 3 && length <= 80)
  }, [chatText])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isValid) return

    const response = await fetch(ADD_CHAT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_at,
        chat_by,
        chat_text: chatText,
      }),
    })

    if (response.ok) {
      openSnackbar('留言已送出!', 'success')
      // alert('留言已送出!')
      setChatText('')
      onSubmit()
    } else {
      // alert('留言發送失敗...')

      openSnackbar('留言發送失敗...', 'error')
    }
  }

  return (
    <div className="row">
      <div className={`typechat`}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            id="chat_text"
            name="chat_text"
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            placeholder="請輸入留言"
          />
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <button className={styles.buttonBrown}>送出留言</button>
            {/* <SubmitBtn btnText="送出留言" color="grey" /> */}
          </div>
        </form>
      </div>
    </div>
  )
}
