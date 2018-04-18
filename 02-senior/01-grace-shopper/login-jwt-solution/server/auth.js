const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {User} = require('./db')
const {decode} = require('./custom-middleware')
module.exports = router

router.get('/me', decode, (req, res, next) => {
  res.json(req.user || {})
})

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user => {
      if (user) {
        const token = jwt.sign({userId: user.id}, 'codyismybro')
        res.json({user, token})
      } else {
        const err = new Error('Incorrect email or password!')
        err.status = 401
        next(err)
      }
    })
    .catch(next)
})

router.delete('/logout', (req, res, next) => {
  res.status(204).end()
})
