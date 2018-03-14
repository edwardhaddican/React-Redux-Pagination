const {join} = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3000

app.use(morgan('dev'))

app.use(express.static(join(__dirname, 'public')))

app.get('/puppies', async (req, res, next) => {
  // const puppies = await Puppy.findAll().catch(next)
  // res.json(puppies)
  res.json([{id: 1, name: 'cody'}, {id: 2, name: 'franklin'}])
})

app.get('/', (req, res, next) => {
  res.sendFile(join(__dirname, 'index.html'))
})

app.listen(PORT, console.log(`Listening on port ${PORT}`))
