import React, { useState } from 'react'
import styles from '@/pages/teams/teams.module.css'
import AddChatForm from './add_chat'
import ChatDisplay from './display_chat'

const ChatArea = ({ chat_at, chat_by }) => {
  const [submissionCount, setSubmissionCount] = useState(0)

  const handleFormSubmit = () => {
    setSubmissionCount((prevCount) => prevCount + 1)
  }

  return (
    <>
      <div className={styles.borderbox}>
        <div className="row">
          <h4 style={{ textAlign: 'center', padding: '12px' }}>留言區</h4>
          {!chat_by ? (
            <></>
          ) : (
            <AddChatForm
              chat_at={chat_at}
              chat_by={chat_by}
              onSubmit={handleFormSubmit}
            />
          )}
          <ChatDisplay chat_at={chat_at} submissionCount={submissionCount} />
        </div>
      </div>{' '}
    </>
  )
}

export default ChatArea
