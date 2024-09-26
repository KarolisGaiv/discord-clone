import { useEffect, useState } from 'react'
import { socket } from '@/libs/socket'
import ChannelsList from '@/components/Channels/ChannelsList'
import UsersList from '@/components/Users/UsersList'
import ChatWindow from '@/components/Chat/ChatWindow'
import '@/index.css'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [nickName, setNickName] = useState('')
  const [hasNickname, setHasNickname] = useState(false)
  const [channels, setChannels] = useState([])
  const [users, setUsers] = useState([])
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [channelMessages, setChannelMessages] = useState({})

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

    // listen for incoming messages and store them in channelMessages state
    socket.on('message:channel', (channelName, message) => {
      setChannelMessages(prevState => ({
        ...prevState,
        [channelName]: [...(prevState[channelName] || []), message],
      }))
    })

    // update user status when user disconnects
    socket.on('user:disconnect', ({ userId }) => {
      setUsers(prevUsers =>
        prevUsers.map(user => (user.userId === userId ? { ...user, connected: false } : user)),
      )
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('channels')
      socket.off('users')
      socket.off('message:channel')
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
    <main className="app-container">
      {!hasNickname ? (
        <div className="entry-form-wrapper">
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
        </div>
      ) : (
        <section className="main-container">
          <ChannelsList channels={channels} onChannelSelect={handleChannelSelect} />
          <UsersList listOfUsers={users} />
          {selectedChannel ? (
            <ChatWindow
              channel={selectedChannel}
              messages={channelMessages[selectedChannel.name] || []}
            />
          ) : (
            <h1 className="default-message-view">No channel selected</h1>
          )}
        </section>
      )}
    </main>
  )
}

export default App
