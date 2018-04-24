const jwt = require('jsonwebtoken')
const {User} = require('../db')

const forbid = (next) => {
  const err = new Error('forbidden')
  err.status = 403
  next()
}

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (token) {
    jwt.verify(token, 'codyismybro', (err, decoded) => {
      if (err) {
        forbid(next)
      } else {
        User.findById(decoded.userId)
          .then(user => {
            if (user) {
              req.user = user
              next()
            } else {
              forbid(next)
            }
          })
          .catch(next)
      }
    })
  } else {
    forbid(next)
  }
}
