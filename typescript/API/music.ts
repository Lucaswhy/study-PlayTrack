import express from 'express'
// import passport from 'passport'
import MusicController from '../controllers/MusicController'

const route = express.Router()

route.get('/api/music/', MusicController.select)

route.get('/api/music/:title', MusicController.selectOne)

route.post('/api/music/', MusicController.create)

route.put('/api/music/:id', MusicController.update)

route.delete('/api/music/:id', MusicController.delete)

export default route
