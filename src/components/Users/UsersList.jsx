import './style.css'
import Avatar from 'boring-avatars'

function UsersList({ listOfUsers }) {
  return (
    <section className="server-users-wrapper">
      <ul className="server-users-list">
        {listOfUsers.map(user => (
          <li key={user.userId} className="user-container">
            <Avatar name={user.username} size={30} variant="beam" className="avatar" />
            <span className="user-name-container">{user.username}</span>
            {/* <div>{user.connected ? 'Online' : 'Offline'}</div> */}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default UsersList
