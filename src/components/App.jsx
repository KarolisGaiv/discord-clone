import { useEffect, useState } from 'react'
import { socket } from '@/libs/socket'
import Channels from './Channels'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [nickName, setNickName] = useState('')
  const [hasNickname, setHasNickname] = useState(false)
  const [channels, setChannels] = useState([])

  useEffect(() => {
    socket.connect()

    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    socket.on('channels', receivedChannels => {
      setChannels(receivedChannels)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('channels')
    }
  }, [])

  function handleNicknameSubmit(event) {
    event.preventDefault()
    socket.emit('user:join', { username: nickName })
    setHasNickname(true)
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
          <Channels channels={channels} />
          {/* <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
          <p>User: {nickName}</p>
          {console.log(channels)} */}
        </div>
      )}
    </div>
  )
}

export default App
