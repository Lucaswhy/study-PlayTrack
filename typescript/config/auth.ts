import { User, UserModel } from '../models/User'

const localStrategy = require('passport-local').Strategy

module.exports = function (passport: any) {
  // eslint-disable-next-line new-cap
  passport.use(new localStrategy({ usernameField: 'Email', passwordField: 'Password' }, (email: String, password: String, done: any) => {
    User.findOne({ Email: email }).then((user: UserModel | null) => {
      if (!user) {
        return done(null, false, { message: 'Esta conta não existe.' })
      }

      if (user.Password === password) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Senha incorreta.' })
      }
    })
  }))

  passport.serializeUser((user: UserModel, done: any) => {
    console.log('Serializando user: '); console.log(user.Name)
    done(null, user)
  })

  passport.deserializeUser((user: UserModel, done: any) => {
    User.find({ user: user }, (err, user) => {
      console.log('Deserializando usuario: '); console.log(user)
      done(err, user)
    })
  })
}
