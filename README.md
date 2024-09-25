# Mini Discord Clone

Project idea is to create a mini discord clone with basic texting functionality using React and Web Sockets

### WebSocket server state

User list, sessions and messages are stored in memory. When the WebSocket server is restarted, all data is lost.

### Running the server

After installing dependencies with `npm install`, use the following command to start the WebSocket server:

```sh
npm run server
```

Alternatively, you can invoke Node.js directly with the given server file:

```sh
node server.cjs
```

React + Vite dev server must be running separately:

```sh
npm run dev
```
