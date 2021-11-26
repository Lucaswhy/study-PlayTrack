import express, { NextFunction, Request, Response } from 'express'
import session from 'express-session'
import path from 'path'
import cors from 'cors'
import routes from './shared/index'
// Starting Database
import startDatabase from './config/database'
import AppError from './shared/errors/AppError'
import '@shared/typeorm'
// import flash from 'connect-flash'

const passport = require('passport')
require('./config/auth')(passport)

const app = express()

app.use(express.static(path.join('../public')))
app.set('views', path.join('../public'))

startDatabase()

// Middleware
app.use(session({
  secret: 'Playtrack',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: (2 * 60 * 60 * 1000) }
}))

// Json parser from express + cors
app.use(express.json({}))
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// starting View engine
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)

// starting Passport
app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

// Setting CORS
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }
  res.locals.user = req.user || null
  req.header('Origin')
  res.header('Access-Control-Allow-Origin', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  app.use(cors())
  next()
})

const PORT = 8080
app.listen(PORT, () => {
  console.log('Server up.')
})
