import express from 'express'
import passport from 'passport'

const route = express.Router()

route.post('/signin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/'
  })(req, res, next)
})

export default route
