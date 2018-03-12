const router = require('express').Router()
module.exports = router

// /pugs
router.get('/', (req, res, next) => {
  res.send('Welcome to the pugs page!\n')
})

// /pugs/:pugId
router.get('/:pugId', (req, res, next) => {
  res.send(`Welcome to pug page ${req.params.pugId}\n`)
})
