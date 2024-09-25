import './style.css'

function ChannelsList({ channels, onChannelSelect }) {
  return (
    <section className="channels-wrapper">
      <ul className="channels-list">
        {channels.map((channel, index) => (
          <li key={index}>
            <button className="channel-button" onClick={() => onChannelSelect(channel)}>
              {channel.name.charAt(0)}
            </button>
            <span className="channel-name-label">{channel.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ChannelsList
