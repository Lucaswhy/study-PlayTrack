import express from 'express'
// import passport from 'passport'

const route = express.Router()

route.post('/valida_usuario', (req, res) => {
  console.log(req.body)
  res.status(200).json({
    error: false,
    message: 'API up!'
  })
})

export default route
