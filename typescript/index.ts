import express from 'express'
import session from 'express-session'
// import flash from 'connect-flash'
import cors from 'cors'
// import passport from 'passport'
// require("./config/auth")(passport);
import path from 'path'

// //Configurando passport
// app.use(passport.initialize());
// app.use(passport.session());
// //Configurando o flash
// app.use(flash());

// Starting Database
import startDatabase from './config/database'

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)
startDatabase()

// Middleware
app.use(express.json({}))
app.use(cors())

app.use(session({
  secret: 'Playtrack',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: (2 * 60 * 60 * 1000) }
}))

app.use((req, res, next) => {
  req.header('Origin')
  res.header('Access-Control-Allow-Origin', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  // res.locals.success_msg = req.flash("success_msg");
  // res.locals.error_msg = req.flash("error_msg");
  // res.locals.error = req.flash("error");
  // res.locals.user = req.user || null;
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

app.get('/status', (req, res) => {
  res.json({
    error: false,
    message: 'Server is working normally.'
  })
})

app.get('*', function (req, res) {
  res.render('../../public/index')
})

const PORT = 8080
app.listen(PORT, () => {
  console.log('Server up.')
})
