function ChannelsList({ channels }) {
  return (
    <div>
      <h1>Available Channels:</h1>
      <ul>
        {channels.map((channel, index) => (
          <button key={index}>{channel.name}</button>
        ))}
      </ul>
    </div>
  )
}

export default ChannelsList
