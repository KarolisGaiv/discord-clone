import { socket } from '@/libs/socket'
import { useEffect, useState } from 'react'

export default function ChatWindow({ channel }) {
  const [newMessage, setNewMessage] = useState('')
  const [messageList, setMessageList] = useState(channel.messages)

  useEffect(() => {
    setMessageList(channel.messages)

    socket.on('message:channel', (channelName, message) => {
      if (channelName === channel.name) {
        setMessageList(prevMessages => [...prevMessages, message])
      }
    })

    return () => {
      socket.off('message:channel')
    }
  }, [channel.name, channel.messages])

  function handleSendMessage() {
    socket.emit('message:channel:send', channel.name, newMessage)
    setNewMessage('')
  }

  return (
    <div>
      <h2>Channel: {channel.name}</h2>

      <div>
        {messageList.map(message => (
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
