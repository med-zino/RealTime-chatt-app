const path = require('path')
const Filter = require('bad-words')
const Filter2 = require('bad-word-ar')
const formatMessage = require('./utils/messages')
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users')

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
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)

    socket.join(user.room)

    //emit is used for only the user concerned
    socket.emit('message', formatMessage(botName, 'Welcome to chatcord'))

    // Broadcast when a user connects , it's for all other users expet the
    // original user
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${username} has joined the chatt`)
      )

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    })

    socket.on('disconnect', () => {
      const user = userLeave(socket.id)
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username} has left the chat`)
        )

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room),
        })
      }
    })

    socket.on('chatMessage', (msg) => {
      const user = getCurrentUser(socket.id)
      const arabic = /[\u0600-\u06FF]/
      if (arabic.test(msg)) {
        io.to(user.room).emit(
          'message',
          formatMessage(user.username, filter2.clean(msg))
        )
      } else {
        io.to(user.room).emit(
          'message',
          formatMessage(user.username, filter.clean(msg))
        )
      }
    })
  })

  // use io.emit to notify all users together
})

server.listen(process.env.PORT || 4000, () =>
  console.log('server running on port 4000')
)
