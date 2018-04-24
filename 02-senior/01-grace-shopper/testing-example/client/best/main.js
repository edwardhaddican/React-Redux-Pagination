import Ball from './ball'

const main = (context) => {
  const ball = new Ball('ball', context.document)
  context.requestAnimationFrame(() => ball.move(context))
}

export default main
