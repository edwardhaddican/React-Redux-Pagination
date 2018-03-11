const express = require('express')
const pugRouter = require('./pug-router')
const app = express()
const PORT = 3000

app.use('/pugs', pugRouter)

app.get('/', (req, res, next) => {
  res.send('Welcome to the home page\n')
})

app.listen(PORT, console.log(`Listening: ${PORT}`))
