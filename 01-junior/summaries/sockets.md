# Socket.io

## Server

```javascript
const express = require('express')
const app = express()
const socketio = require('socket.io')

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, () => {
    console.log(`Listening on http://localhost:${server.address().port}`)
})

// sets up a "socket control center" on the server
const io = socketio(server)

// listens for a socket connection from a new client
io.on('connection', socket => {
  console.log('A new client has connected!')
  console.log(socket.id)


  // listens for events from that client, and emits an event to
  // all other clients
  socket.on('somethingHappened', (payload) => {
    console.log('Got this from one client: ', payload)
    console.log('Now to tell everyone else:')
    socket.broadcast.emit('someoneDidSomething', payload)
  })

  // listens for disconnection from a particular client
  socket.on('disconnect', () => {
    console.log('Goodbye, ', socket.id, ' :(')
  })
})

```

## Client

```javascript
import io from 'socket.io-client'

// establishes the socket connection
const socket = io(window.location.origin)

// we receive a 'connect' event once the connection is made
socket.on('connect', () => {
  console.log('I have made a persistent two-way connection to the server!')
})

// listening for events from the server
socket.on('someoneDidSomething', (payload) => {
  console.log('someone else did a thing!')
  console.log('here is the thing I need to know: ', payload)
})

// emitting an event to the server (ex. when clicking a button)

const doSomethingButton = document.getElementById('do-something')

doSomethingButton.addEventListener('click', () => {
  socket.emit('somethingHappened', 'I clicked the button!')
})
```

