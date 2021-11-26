import { Router } from 'express'

import login from '../API/login'
import user from '../API/user'
import music from '../API/music'
import playlist from '../API/playlist'
import album from '../API/album'

const routes = Router()

routes.use('/', login)

routes.use('/', user)

routes.use('/', music)

routes.use('/', playlist)

routes.use('/', album)

routes.get('/status', (req, res) => {
  res.json({
    error: false,
    message: 'Server is working normally.'
  })
})

routes.get('*', function (req, res) {
  console.log('here')
  res.render('/index')
})

export default routes
