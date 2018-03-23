import io from 'socket.io-client'

const socket = io(window.location.origin)
const colors = document.getElementById('colors')
const tellEveryone = document.getElementById('tell-everyone')

let favoriteColor = 'Red'

const init = () => {
  colors.addEventListener('click', (evt) => {
    favoriteColor = evt.target.innerText
  })

  tellEveryone.addEventListener('click', (evt) => {
    socket.emit('favoriteColor', favoriteColor)
  })
}

socket.on('connect', () => {
  console.log('So good to be connected!')

  socket.emit('iWantToJoinARoom', window.location.pathname)
})

socket.on('someoneElseHasAFavoriteColor', (favoriteColor) => {
  console.log('Someone else has this favorite color: ', favoriteColor)
})

init()
