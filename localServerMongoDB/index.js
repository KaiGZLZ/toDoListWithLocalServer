const express = require('express');
const server = express();
const cors = require('cors');
const { mongoose } = require('./database')


//  Models

const User = require('./Models/user.model');
const errorHandler = require('./__helpers/errorHandler');


//  Middlewares

server.use(cors());
server.use(express.json());


// Principal Routes

server.use('/user', require('./controllers/user.controller'));
server.use('/task', require('./controllers/task.controller'));


//  DELETE TODO


//  DELETE USERS

server.delete('/delete/user', async (req,res) => { //  Lo que sucede al momento de presionar "Eliminar Usuario" en el formulario de registro

  let usernameToDelete = req.body.name;
  let passwordUsernameToDelete = req.body.password;

  const user = await User.findOneAndDelete({name: usernameToDelete, password: passwordUsernameToDelete}).then();

  if (user) {
    try {
      console.log('Elimination success');
      res.send({"result": true, "description":'Usuario eliminado correctamente'});
    }
    catch(error) {
      
    }
  }
  else {
    res.send({"result": false, "description":'La contraseña es incorrecta'});
  }
})


// Global Error Handler
server.use(errorHandler);


//  SECCION PARA ACTIVAR EL SERVIDOR

const PORT = process.env.PORT  || 4000;

server.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto ${PORT}....`);
});



