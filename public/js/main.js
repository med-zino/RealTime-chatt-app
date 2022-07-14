const chatForm = document.getElementById('chat-form')
const socket = io()
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
})

// Join chatroom
socket.emit('joinRoom', { username, room })

socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room)
  outputUsers(users)
})

socket.on('message', (message) => {
  console.log(message)
  outputMessage(message)
  chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const msg = e.target.elements.msg.value

  console.log(msg)
  socket.emit('chatMessage', msg)
})

function outputMessage(message) {
  console.log('clicked')
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = ` <p class="meta">${message.username} <span>${message.time}</span></p>
 <p class="text">
   ${message.text}
 </p>`
  document.querySelector('.chat-messages').appendChild(div)

  const mssg = document.getElementById('msg')
  mssg.value = ''
}

function outputRoomName(room) {
  roomName.innerText = room
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = ''
  users.forEach((user) => {
    const li = document.createElement('li')
    li.innerText = user.username
    userList.appendChild(li)
  })
}
