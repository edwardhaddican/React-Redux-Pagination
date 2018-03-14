const {join} = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3000

app.use(morgan('dev'))

app.use(express.static(join(__dirname, 'public')))

app.get('/', (req, res, next) => {
  res.sendFile(join(__dirname, 'index.html'))
})

app.listen(PORT, console.log(`Listening on port ${PORT}`))
