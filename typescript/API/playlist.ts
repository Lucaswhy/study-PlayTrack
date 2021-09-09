import express from 'express'
// import passport from 'passport'
import PlaylistController from '../controllers/PlaylistController'

const route = express.Router()

route.get('/api/playlist/', PlaylistController.select)

route.get('/api/playlist/:name', PlaylistController.selectOne)

route.post('/api/playlist/', PlaylistController.create)

route.put('/api/playlist/:id', PlaylistController.update)

route.delete('/api/playlist/:id', PlaylistController.delete)

export default route
