import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';

import cors from 'cors';

import passport from "passport";
//require("./config/auth")(passport);

import path from 'path';
import { pathToFileURL } from 'url';
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// //Configurando passport
// app.use(passport.initialize());
// app.use(passport.session());
// //Configurando o flash
// app.use(flash());

//Middleware
app.use((req, res, next) => {
    // res.locals.success_msg = req.flash("success_msg");
    // res.locals.error_msg = req.flash("error_msg");
    // res.locals.error = req.flash("error");
    // res.locals.user = req.user || null;
    next();
});

app.get('/status',(req, res)=>{
    res.json({
        error: false,
        message: 'Server is working normally.'
    })
});

app.get('*', function(req, res){
    res.render('../../public/index');
});

const PORT = 8080;
app.listen(PORT, () =>{ 
    console.log("Server up.");
});