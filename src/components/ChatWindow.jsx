import { socket } from '@/libs/socket'
import { useEffect, useState } from 'react'
import Avatar from 'boring-avatars'

export default function ChatWindow({ channel, messages }) {
  const [newMessage, setNewMessage] = useState('')

  function handleSendMessage(e) {
    e.preventDefault()
    socket.emit('message:channel:send', channel.name, newMessage)
    setNewMessage('')
  }

  return (
    <div>
      <h2>Channel: {channel.name}</h2>

      <div>
        {messages.map(message => (
          <div key={message.id}>
            <Avatar name={message.username} size={20} variant="beam" />
            <strong>{message.username}</strong>: {message.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder={`Message #${channel.name}`}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
