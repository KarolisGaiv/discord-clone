import { socket } from '@/libs/socket'
import { useState } from 'react'
import Avatar from 'boring-avatars'
import moment from 'moment'
import './style.css'

export default function ChatWindow({ channel, messages }) {
  const [newMessage, setNewMessage] = useState('')

  function handleSendMessage(e) {
    e.preventDefault()
    socket.emit('message:channel:send', channel.name, newMessage)
    setNewMessage('')
  }

  return (
    <main className="chat-wrapper">
      <section className="channel-name-container">
        <h3>
          # <span>{channel.name}</span>
        </h3>
      </section>

      <div className="message-list">
        {messages.map(message => (
          <div key={message.id} className="chat-message">
            <Avatar name={message.username} size={30} variant="beam" className="avatar" />
            <h4 className="message-container">
              <div>
                <span className="username-label">{message.username}</span>
                <span className="timestamp-label">{moment(message.timestamp).calendar()}</span>
              </div>
              <div>
                <span className="message-content">{message.message}</span>
              </div>
            </h4>
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
    </main>
  )
}
