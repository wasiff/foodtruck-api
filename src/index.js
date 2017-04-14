import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// middleware
// parse application/json

app.use(bodyParser.json({
	limit:config.bodyLimit
}));


// passport config
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
	usernameField:'email',
	passwordField:'password'
},
	Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//api routes v1
app.use('/v1',routes);

var listener = app.server.listen(config.port,function(){
	console.log(`Started on port ${listener.address().port}`);
});


export default app;








