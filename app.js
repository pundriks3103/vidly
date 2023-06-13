//Requiring the necessary modules
require('dotenv').config();
const config = require('config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const dbg = require('debug')('app:db');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    dbg('Morgan Enabled...');
}
app.use(helmet());
//app.use(require('./logger'));
app.use('/', require('./routes/home'));
app.use('/api/genres', require('./routes/genres'));


//Configuration
console.log(`Name : ${config.get('name')}`);
console.log(`Mail server : ${config.get('mail.host')}`);


module.exports = app;