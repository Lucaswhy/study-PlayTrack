import express from 'express'
// import passport from 'passport'
import AlbumController from '../controllers/AlbumController'

import { Album } from '../models/Album'

const route = express.Router()

route.get('/api/album/', AlbumController.select)

route.get('/api/album/:name', AlbumController.selectOne)

route.post('/api/album/', AlbumController.create)

route.put('/api/album/:id', AlbumController.update)

route.delete('/api/album/:id', AlbumController.delete)

// route.get('/testealbum', async (req, res) => {
//   const album = await (<any>Album).find({ Name: 'FEVER' }).populate({ path: 'Music' })
//   console.log(album[0].Music)
//   res.render('./teste')
// })

export default route
