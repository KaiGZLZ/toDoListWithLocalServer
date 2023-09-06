const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config()
const { mongoose } = require('./database')
const jwt = require('./__helpers/jwt');
const errorHandler = require('./__helpers/errorHandler');


//  Middlewares

server.use(cors());
server.use(express.json());


// Use JWT authentication to secure the API
server.use(jwt());


// Principal Routes

server.use('/user', require('./controllers/user.controller'));
server.use('/task', require('./controllers/task.controller'));


// Global Error Handler
server.use(errorHandler);


//  SECTION TO ACTIVATE THE SERVER

const PORT = process.env.PORT  || 4000;

server.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto ${PORT}....`);
});



