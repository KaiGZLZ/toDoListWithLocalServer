const express = require('express');
const server = express();


const cors = require('cors');


const { mongoose } = require('./database')


//  Models

const UserModel = require('./Models/users');


//  Middlewares

server.use(cors());    
server.use(express.json()); //  Este comando es indispensable para poder leer el req.body de las solicitudes que lleguen 




//  SECCION DE REGISTRO DE USUARIOS

server.post('/register/user', async (req, res) => {

    const user = req.body;

    const newUser = new UserModel({
        name: user.name,
        password: user.password,
    })

    try {
      await newUser.save()
      
      res.send({"result":true, "description":'El usuario se agregó correctamente'});
    }
    catch(e) {
      
      console.log(e.message)
      res.send({"result":false, "description": e.message});
    }
})


//  LOGGING SECTION 

server.post('/user', async (req,res) => { //  Lo que sucede al momento de presionar "Ingresar" en el formulario de ingreso

  let userRequested = req.body.name;
  let passwordUserRequested = req.body.password;

  const user = await UserModel.findOne({ name: userRequested, password:  passwordUserRequested})

  if (user){
    res.send({"result": true, "data":JSON.stringify(user.tareas),  "description":'Enviadas las tareas del usuario'});
  }
  else{
    res.send({"result": false, "data":null,  "description":'No existe dicho usuario'});
  }
})


//  ADD TODO

server.post('/register/tarea', async (req,res) => { //  Lo que sucede al momento de presionar "guardar" en el formulario de registro

    const newTask = req.body.tarea;
 
    const user = await UserModel.findOne({name: req.body.name}).then();

    user.tareas.unshift(newTask);

    try {
      await user.save();
      console.log('Success Added');
      res.send({"result": true, "description":'Tarea agregada correctamente'});
    }
    catch(error) {
      console.log('Failed Added');
      res.status = 404;
      res.send({"result": false, "description":'Sintax Error. El recurso no fue encontrado'});
    }
       

   /* await UserModel.updateOne({name: req.body.name},  { $push: { tareas:  newTask } })
        .then(result => {
          if(result.matchedCount > 0)
            console.log('Agregado con exito');
          else
            console.log('El usuario no existe');
        })
        .catch(err => console.error(err))*/
})

//  DELETE TODO


server.delete('/delete/tarea', async (req,res) => { //  Lo que sucede al momento de presionar "guardar" en el formulario de registro

  let usernameOwner = req.body.name;
  let idToToDoToDelete = req.body.idToDoToEliminate;
  
  const user = await UserModel.findOne({name: usernameOwner}).then();

  if (user) {
    const indexToDoToDelete = user.tareas.findIndex((toDo) => toDo.id == idToToDoToDelete);
  
    user.tareas.splice(indexToDoToDelete, 1) //  Se elimina la tarea con el id
  
    try {
      await user.save();
      console.log('Success Deleted');
      res.send({"result": true, "description":'Tarea eliminada correctamente'});
    }
    catch(error) {
      console.log('Failed the elimination');
      res.status = 404;
      res.send({"result": false, "description":'La tarea no fue encontrada'});
    }
  }
  else {
    res.send({"result": false, "description":'El usuario no existe'});
  }
})


//  DELETE USERS

server.delete('/delete/user', async (req,res) => { //  Lo que sucede al momento de presionar "Eliminar Usuario" en el formulario de registro

  let usernameToDelete = req.body.name;
  let passwordUsernameToDelete = req.body.password;

  const user = await UserModel.findOneAndDelete({name: usernameToDelete, password: passwordUsernameToDelete}).then();

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


//  SECCION PARA ACTIVAR EL SERVIDOR

const PORT = process.env.PORT  || 3000;

server.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto ${PORT}....`);
});



