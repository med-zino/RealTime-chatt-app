const chatForm = document.getElementById('chat-form')
const socket = io()
const chatMessages = document.querySelector('.chat-messages')

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
  div.innerHTML = ` <p class="meta">Mary <span>9:15pm</span></p>
 <p class="text">
   ${message}
 </p>`
  document.querySelector('.chat-messages').appendChild(div)

  const mssg = document.getElementById('msg')
  mssg.value = ''
}
