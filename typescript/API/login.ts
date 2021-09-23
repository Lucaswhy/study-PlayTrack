import express from 'express'
import passport from 'passport'
import { IUser, IUserProtected } from '../models/User'

const route = express.Router()

route.post('/signin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
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
    const user = () : IUserProtected | null => {
      // @ts-ignore
      const reqUser : Array<IUser> = <IUser>req.user
      if (req.user !== undefined) {
        const a : IUserProtected = {
          Id: <Number>reqUser[0].Id,
          Name: <String>reqUser[0].Name,
          Email: <String>reqUser[0].Email,
          Avatar: <String>reqUser[0].Avatar,
          Music: <any>reqUser[0].Music,
          Playlist: <any>reqUser[0].Playlist
        }
        return a
      } else {
        const a : null = null
        return a
      }
    }

    return (res.status(200).json({
      error: false,
      value: user()
    }))
  }
})

route.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

export default route
