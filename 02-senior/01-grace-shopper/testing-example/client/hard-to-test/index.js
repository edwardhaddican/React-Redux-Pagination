/* eslint curly:0 */
import '@tmkelly28/tk-css'
import '../index.css'

const ball = document.getElementById('ball')
let deltaX = 1
let deltaY = 1
ball.style.left = '0px'
ball.style.top = '0px'

export const moveBall = () => {
  const {left, top} = ball.style
  let x = +left.slice(0, -2)
  let y = +top.slice(0, -2)

  if (x >= window.innerWidth - 50)
    deltaX = -1
  else if (x <= 0)
    deltaX = 1
  else if (y >= window.innerHeight - 50)
    deltaY = -1
  else if (y <= 0)
    deltaY = 1
  x += deltaX
  y += deltaY
  const newLeft = x + 'px'
  const newTop = y + 'px'
  ball.style.left = newLeft
  ball.style.top = newTop
  window.requestAnimationFrame(moveBall)
}

window.requestAnimationFrame(moveBall)
