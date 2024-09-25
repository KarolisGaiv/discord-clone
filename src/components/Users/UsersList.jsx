function UsersList({ listOfUsers }) {
  return (
    <div>
      <h1>Available Users:</h1>
      <ul>
        {listOfUsers.map(user => (
          <li key={user.userId}>
            <div>{user.username}</div>
            <div>{user.connected ? 'Online' : 'Offline'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList
