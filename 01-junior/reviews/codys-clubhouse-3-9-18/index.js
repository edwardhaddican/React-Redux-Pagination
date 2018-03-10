const {join} = require('path')
const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {STRING} = Sequelize
const db = new Sequelize('postgres://localhost:5432/codys-clubhouse-example')
const app = express()
const PORT = 3000

const Toy = db.define('toys', {
  name: STRING
})

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(join(__dirname, 'public')))

app.post('/toys', async (req, res, next) => {
  const newToy = await Toy.create({
    name: req.body.name
  })
  res.json(newToy)
})

app.get('/', async (req, res, next) => {
  const toys = await Toy.findAll()

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Cody's Clubhouse</title>
        <link href="/style.css" rel="stylesheet" />
      </head>
      <body>
        <h1>Welcome to Cody's Clubhouse</h1>
        <ul>
        ${toys.map(toy => `<li>${toy.name}</li>`).join('')}
        </ul>
      </body>
    </html>
  `)
})

const init = async () => {
  await db.sync()
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
}

init()

