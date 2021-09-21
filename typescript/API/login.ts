import express from 'express'
import passport from 'passport'

const route = express.Router()

route.post('/signin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/'
  })(req, res, next)
})

route.post('/api/login', (req, res, next) => {
  if (!req.isAuthenticated()) {
    return (res.status(200).json({
      error: false,
      value: null
    }))
  } else {
    return (res.status(200).json({
      error: false,
      value: req.user
    }))
  }
})

route.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

export default route
