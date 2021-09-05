import express from 'express';
import passport from "passport";

const User = require('../../models/User');

const route = express.Router();

route.post('/valida_usuario',(req, res)=>{
    console.log(req.body);
    res.status(200).json({
        error: false,
        message: 'API up!'
    })
});

module.exports = route;