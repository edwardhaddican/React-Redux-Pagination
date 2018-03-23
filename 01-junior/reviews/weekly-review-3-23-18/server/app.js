const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
const socketio = require('socket.io')

// Logging middleware
app.use(morgan('dev'))

// Body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// If you want to add routes, they should go here!

// For all GET requests that aren't to an API route,
// we will send the index.html!
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal server error')
})

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

const io = socketio(server)

const roomDictionary = {}

io.on('connection', (socket) => {
  console.log(`Welcome, ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`Leaving so soon, ${socket.id}? You will be missed :(`)
  })

  socket.on('favoriteColor', (favoriteColor) => {
    console.log('Someone has a favorite color of: ', favoriteColor)
    const roomName = roomDictionary[socket.id]
    socket.to(roomName).emit('someoneElseHasAFavoriteColor', favoriteColor)
  })

  socket.on('iWantToJoinARoom', roomName => {
    console.log(`${socket.id} is joining" ${roomName}`)
    socket.join(roomName)
    roomDictionary[socket.id] = roomName
  })
})
