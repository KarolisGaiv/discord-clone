import { useEffect, useState } from 'react'
import { socket } from '@/libs/socket'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [nickName, setNickName] = useState('')

  useEffect(() => {
    socket.connect()

    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  function handleNicknameSubmit(event) {
    event.preventDefault()
    console.log(nickName)
  }

  return (
    <div>
      <form onSubmit={handleNicknameSubmit}>
        <label htmlFor="nickName">Enter your nickname:</label>
        <input
          id="nickName"
          type="text"
          value={nickName}
          onChange={e => setNickName(e.target.value)}
        />
      </form>

      <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
    </div>
  )
}

export default App
