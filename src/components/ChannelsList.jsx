function ChannelsList({ channels, onChannelSelect }) {
  return (
    <div>
      <h1>Available Channels:</h1>
      <ul>
        {channels.map((channel, index) => (
          <li key={index}>
            <button onClick={() => onChannelSelect(channel)}>{channel.name}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChannelsList
