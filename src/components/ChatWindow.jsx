import { socket } from '@/libs/socket'
import { useEffect, useState } from 'react'

export default function ChatWindow({ channel, messages }) {
  const [newMessage, setNewMessage] = useState('')

  function handleSendMessage() {
    socket.emit('message:channel:send', channel.name, newMessage)
    setNewMessage('')
  }

  return (
    <div>
      <h2>Channel: {channel.name}</h2>

      <div>
        {messages.map(message => (
          <div key={message.id}>
            <strong>{message.username}</strong>: {message.message}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder={`Message #${channel.name}`}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}
