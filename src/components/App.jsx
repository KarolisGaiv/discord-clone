import { useEffect, useState } from 'react'
import { socket } from '@/libs/socket'
import ChannelsList from './ChannelsList'
import UsersList from './UsersList'
import ChatWindow from './ChatWindow'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [nickName, setNickName] = useState('')
  const [hasNickname, setHasNickname] = useState(false)
  const [channels, setChannels] = useState([])
  const [users, setUsers] = useState([])
  const [selectedChannel, setSelectedChannel] = useState(null)

  useEffect(() => {
    if (hasNickname) {
      socket.auth = { username: nickName }
      socket.connect()
    }

    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    socket.on('channels', receivedChannels => {
      setChannels(receivedChannels)
    })

    socket.on('users', listOfUsers => {
      setUsers(listOfUsers)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('channels')
      socket.off('users')
    }
  }, [hasNickname, nickName])

  function handleNicknameSubmit(event) {
    event.preventDefault()
    socket.emit('user:join', { username: nickName })
    setHasNickname(true)
  }

  function handleChannelSelect(channel) {
    setSelectedChannel(channel)
  }

  return (
    <div>
      {!hasNickname ? (
        <form onSubmit={handleNicknameSubmit}>
          <label htmlFor="nickName">Enter your nickname:</label>
          <input
            id="nickName"
            type="text"
            value={nickName}
            onChange={e => setNickName(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <ChannelsList channels={channels} onChannelSelect={handleChannelSelect} />
          <UsersList listOfUsers={users} />
          {selectedChannel ? <ChatWindow channel={selectedChannel} /> : <p>No channel selected</p>}
        </div>
      )}
    </div>
  )
}

export default App
