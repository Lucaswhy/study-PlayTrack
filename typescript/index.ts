import express from 'express'
import session from 'express-session'
import path from 'path'
// Starting Database
import startDatabase from './config/database'
// import flash from 'connect-flash'
import cors from 'cors'
const passport = require('passport')
require('./config/auth')(passport)

const app = express()

app.use(express.static(path.join('../public')))
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

app.use((req, res, next) => {
  res.locals.user = req.user || null
  req.header('Origin')
  res.header('Access-Control-Allow-Origin', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  app.use(cors())
  next()
})

// API LOGIN

// eslint-disable-next-line import/first
import login from './API/login'

app.use('/', login)

// API USER

// eslint-disable-next-line import/first
import user from './API/user'

app.use('/', user)

// API MUSIC

// eslint-disable-next-line import/first
import music from './API/music'

app.use('/', music)

// API PLAYLIST

// eslint-disable-next-line import/first
import playlist from './API/playlist'

app.use('/', playlist)

// API ALBUM

// eslint-disable-next-line import/first
import album from './API/album'

app.use('/', album)

app.get('/status', (req, res) => {
  res.json({
    error: false,
    message: 'Server is working normally.'
  })
})

app.get('*', function (req, res) {
  res.render('../public/index.html')
})

const PORT = 8080
app.listen(PORT, () => {
  console.log('Server up.')
})
