import './style.css'

function ChannelsList({ channels, onChannelSelect }) {
  return (
    <aside className="channels-wrapper">
      <ul className="channels-list">
        {channels.map(channel => (
          <li key={channel.name}>
            <button className="channel-button" onClick={() => onChannelSelect(channel)}>
              {channel.name.charAt(0)}
            </button>
            <span className="channel-name-label">{channel.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default ChannelsList
