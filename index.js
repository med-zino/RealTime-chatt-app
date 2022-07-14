const path = require('path')
var Filter = require('bad-words')
var Filter2 = require('bad-word-ar')
const formatMessage = require('./utils/messages')

const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

filter = new Filter()
filter2 = new Filter2('ar')

app.use(express.static(path.join(__dirname, 'public')))

const botName = 'chilChat'

//Run when a cleint connect
io.on('connection', (socket) => {
  //emit is used for only the user concerned
  socket.emit('message', formatMessage(botName, 'Welcome to chatcord'))

  // Broadcast when a user connects , it's for all other users expet the
  // original user
  socket.broadcast.emit(
    'message',
    formatMessage(botName, 'A new user has joined the chatt')
  )

  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName, 'A user has left the chatt'))
  })

  socket.on('chatMessage', (msg) => {
    var arabic = /[\u0600-\u06FF]/
    if (arabic.test(msg)) {
      io.emit('message', formatMessage('USER', filter2.clean(msg)))
    } else {
      io.emit('message', formatMessage('USER', filter.clean(msg)))
    }
  })

  // use io.emit to notify all users together
})

const PORT = 4000 || process.env.PORT

server.listen(PORT, () => console.log('server running on port 4000'))
