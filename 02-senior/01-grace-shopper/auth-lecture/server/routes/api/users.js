const router = require('express').Router()
const {User} = require('../../db')
const {isAdmin} = require('../../gatekeeping')
module.exports = router

// GET /api/users
// Hm...should everyone really be able to get these...?
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
