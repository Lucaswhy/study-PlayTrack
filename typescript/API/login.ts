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
        const userProtected : IUserProtected = {
          Id: <Number>reqUser[0].Id,
          Name: <String>reqUser[0].Name,
          Email: <String>reqUser[0].Email,
          Avatar: <String>reqUser[0].Avatar,
          Music: <any>reqUser[0].Music,
          Playlist: <any>reqUser[0].Playlist,
          Album: <any>reqUser[0].Album
        }
        return userProtected
      } else {
        const userProtected : null = null
        return userProtected
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
