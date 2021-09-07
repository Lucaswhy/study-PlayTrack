import express from 'express'
// import passport from 'passport'
import UserController from '../controllers/UserController'

const route = express.Router()

route.get('/api/user/', UserController.select)

route.get('/api/user/:id', UserController.selectOne)

route.post('/api/user/', UserController.create)

route.put('/api/user/', UserController.update)

route.delete('/api/user/:id', UserController.delete)

export default route
