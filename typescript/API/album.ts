import express from 'express'
// import passport from 'passport'
import AlbumController from '../controllers/AlbumController'

const route = express.Router()

route.get('/api/album/', AlbumController.select)

route.get('/api/album/:name', AlbumController.selectOne)

route.post('/api/album/', AlbumController.create)

route.put('/api/album/:id', AlbumController.update)

route.delete('/api/album/:id', AlbumController.delete)

export default route
