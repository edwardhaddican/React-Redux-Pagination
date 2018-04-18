/* eslint curly:0 */
import '@tmkelly28/tk-css'
import '../index.css'

export class Ball {
  constructor (id, doc) {
    this.el = doc.getElementById(id)
    this.deltaX = 1
    this.deltaY = 1
    this.el.style.left = '0px'
    this.el.style.top = '0px'
    this.move = this.move.bind(this)
  }

  static pxToNumber (pxStr) {
    return +pxStr.slice(0, -2)
  }

  static px (n) {
    return n + 'px'
  }

  move (context) {
    const {left, top} = this.el.style
    const x = this.constructor.pxToNumber(left)
    const y = this.constructor.pxToNumber(top)
    this.checkForCollision(x, y, context.innerWidth, context.innerHeight)
    this.changePosition(x, y)
    context.requestAnimationFrame(() => this.move(context))
  }

  checkForCollision (x, y, maxWidth, maxHeight) {
    if (x >= maxWidth - 50)
      this.deltaX = -1
    else if (x <= 0)
      this.deltaX = 1
    else if (y >= maxHeight - 50)
      this.deltaY = -1
    else if (y <= 0)
      this.deltaY = 1
  }

  changePosition (x, y) {
    this.el.style.left = this.constructor.px(x + this.deltaX)
    this.el.style.top = this.constructor.px(y + this.deltaY)
  }
}

export const main = (context) => {
  const ball = new Ball('ball', context.document)
  context.requestAnimationFrame(() => ball.move(context))
}

main(window)
