import React, { useState } from 'react'
import AddChatForm from './add_chat'
import ChatDisplay from './display_chat'

const ChatArea = ({ chat_at, chat_by }) => {
  const [submissionCount, setSubmissionCount] = useState(0)

  const handleFormSubmit = () => {
    setSubmissionCount((prevCount) => prevCount + 1)
  }

  return (
    <>
      <AddChatForm
        chat_at={chat_at}
        chat_by={chat_by}
        onSubmit={handleFormSubmit}
      />
      <ChatDisplay chat_at={chat_at} submissionCount={submissionCount} />
    </>
  )
}

export default ChatArea
