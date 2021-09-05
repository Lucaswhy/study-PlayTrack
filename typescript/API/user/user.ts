import express from 'express';
import passport from "passport";
import User from '../../entities/User';

const db = require('../../models/User');

const route = express.Router();

route.get('/api/user/', async (req, res) => {
    db.find({}).then((user: any) => {
        if (user.length > 0) {
            res.status(200).json({
                error: false,
                message: user
            });
        } else {
            res.status(204).json({
                error: false,
                message: 'Não há nenhum usuário cadastrado no sistema.'
            });
        }
    }).catch((e: String) => {
        console.log('Error in catch' + e);
        res.status(500).json({
            error: true,
            message: 'Não foi possível realizar a consulta.'
        })
    })
})

route.get('/api/user/:id', (req, res) => {
    db.findById(req.params.id).then((user: any) => {
        if (user) {
            res.status(201).json({
                error: false,
                message: user
            });
        }
        else {
            res.status(404).json({
                error: false,
                message: "Esse usuário não existe no sistema."
            })
        }
    });
});

module.exports = route;