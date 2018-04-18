module.exports = (req, res, next) => {
  // is the user making this request an admin?
  // scenario A: not logged in (req.user === undefined)
  // scenario B: logged in, not an admin (req.user.isAdmin === false)
  // scenario C: logged, is an admin (req.user.isAdmin === true)
  if (req.user && req.user.isAdmin) {
    // if so, continue
    next()
  } else {
    // else, get outta town
    const err = new Error('get outta town')
    err.status = 403
    next(err)
  }
}
