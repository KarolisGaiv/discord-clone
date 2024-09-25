import './style.css'
import Avatar from 'boring-avatars'
import classNames from 'classnames'

function UsersList({ listOfUsers }) {
  return (
    <section className="server-users-wrapper">
      <ul className="server-users-list">
        {listOfUsers.map(user => (
          <li key={user.userId} className="user-container">
            <div className="avatar-container">
              <Avatar name={user.username} size={30} variant="beam" className="avatar" />
              <span
                className={classNames('user-status', {
                  online: user.connected,
                  offline: !user.connected,
                })}
              ></span>
            </div>
            <span className="user-name-container">{user.username}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default UsersList
