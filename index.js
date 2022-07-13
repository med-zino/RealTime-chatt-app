const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

//Run when a cleint connect
io.on('connection', (socket) => {
  //emit is used for only the user concerned
  socket.emit('message', 'Welcome to chatcord')

  // Broadcast when a user connects , it's for all other users expet the
  // original user
  socket.broadcast.emit('message', 'A new user has joined the chatt')

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chatt')
  })

  socket.on('chatMessage', (msg) => {
    io.emit('message', msg)
  })

  // use io.emit to notify all users together
})

const PORT = 4000 || process.env.PORT

server.listen(PORT, () => console.log('server running on port 4000'))
