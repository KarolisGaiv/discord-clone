import { socket } from '@/libs/socket'
import { useState } from 'react'
import Avatar from 'boring-avatars'
import moment from 'moment'
import './style.css'
import { AiTwotonePlusCircle } from 'react-icons/ai'
import { GoGift } from 'react-icons/go'
import { PiGif } from 'react-icons/pi'
import { TbFileSmile } from 'react-icons/tb'
import { FaRegFaceSmile } from 'react-icons/fa6'
import { FaIcons } from 'react-icons/fa'
// import { FaIcons } from "react-icons/fa6";

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

      <form className="text-field-wrapper" onSubmit={handleSendMessage}>
        <AiTwotonePlusCircle className="icon" />
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder={`Message #${channel.name}`}
        />
        <div className="right-side-icons-wrapper">
          <div className="icon-wrapper">
            <GoGift className="icon" />
          </div>

          <div className="gif-icon-wrapper">
            <PiGif className="icon" />
          </div>

          <div className="icon-wrapper">
            <TbFileSmile className="icon" />
          </div>

          <div className="icon-wrapper">
            <FaRegFaceSmile className="icon" />
          </div>
        </div>
      </form>
    </main>
  )
}
