const express = require('express');
const cors = require('cors');
const fs = require('fs'); //  Libreria File System

const data = require('./data.js');

const server = express();

server.use(cors());    
server.use(express.json()); //  Este comando es indispensable para poder leer el req.body de las solicitudes que lleguen 


function saveData (usersData) {

  let nuevaData = "let data = {'users':" + usersData + "}; module.exports = data;"

  fs.writeFile('data.js', nuevaData, (err) =>{
    if (err){
        throw err;
    }
    console.log('Contenido reemplazado exitosamente');
}) 
}
  

//  SECCION DE REGISTRO DE USUARIOS

server.post('/register/user', (req,res) => { //  Lo que sucede al momento de presionar "Registrar" en el formulario de registro

  let nuevoUser = req.body;

  const indiceNuevousuario = data.users.findIndex((user) => user.name == nuevoUser.name)

  if (indiceNuevousuario >= 0){ //  Ya hay una persona con ese nombre
    res.send({"result": false, "description":'Ya hay una persona con ese nombre'});
    return;
  }

  data.users.push(nuevoUser); //  Se agrega un nuevo usuario a la lista
  saveData(JSON.stringify(data.users));
  res.send({"result":true, "description":'El usuario se agregó correctamente'});
})


//  SECCION PARA LOGEARSE

server.post('/user', (req,res) => { //  Lo que sucede al momento de presionar "Ingresar" en el formulario de ingreso

  let userRequested = req.body.name;
  let passwordUserRequested = req.body.password;

  const indexUserToEntry = data.users.findIndex((user) => (user.name == userRequested)&&(user.password == passwordUserRequested))

  if (indexUserToEntry >= 0){ //  SI hay una persona con ese nombre
    res.send({"result": true, "data":JSON.stringify(data.users[indexUserToEntry].tareas),  "description":'Enviadas las tareas del usuario'});
    return;
  }
  
  res.send({"result": false, "data":null,  "description":'No existe dicho usuario'});
    
})


//  SECCION PARA AGREGAR Y ELIMINAR NUEVAS TAREAS

server.post('/register/tarea', (req,res) => { //  Lo que sucede al momento de presionar "guardar" en el formulario de registro

  let userOwner = req.body.name;
  let newToDo = req.body.tarea;

  console.log(req.body.name);

  const indexUserOwner = data.users.findIndex((user) => user.name == userOwner)

  if (indexUserOwner >= 0){ //  Ya hay una persona con ese nombre
    
    data.users[indexUserOwner].tareas.unshift(newToDo) //  Se agrega una nueva tarea al usuario
    saveData(JSON.stringify(data.users));
    res.send({"result": true, "description":'Tarea agregada correctamente'});
    return;
  }
  res.status = 404;
  res.send({"result": false, "description":'Sintax Error. El recurso no fue encontrado'});
})

server.delete('/delete/tarea', (req,res) => { //  Lo que sucede al momento de eliminar una tarea  

  let usernameOwner = req.body.name;
  let idToToDoToDelete = req.body.idToDoToEliminate;
  
  const indexUserOwner = data.users.findIndex((user) => user.name == usernameOwner);
  
  if (indexUserOwner >= 0){ //  SI hay una persona con ese nombre
    
    const indexToDoToDelete = data.users[indexUserOwner].tareas.findIndex((tarea) => tarea.id == idToToDoToDelete);

    if (indexToDoToDelete >= 0){ //  SI hay una tarea con ese nombre
    
      data.users[indexUserOwner].tareas.splice(indexToDoToDelete, 1) //  Se elimina la tarea con el id
      saveData(JSON.stringify(data.users));
      res.send({"result": true, "description":'Tarea eliminada correctamente'});
      return;
    } else{
      res.send({"result": false, "description":'La tarea no fue encontrada'});
    }

  } else{
    res.send({"result": false, "description":'El usuario no existe'});
  }
})



//  SECCION PARA ELIMINAR USUARIOS

server.delete('/delete/user', (req,res) => { //  Lo que sucede al momento de presionar "Eliminar Usuario" en el formulario de registro

  let usernameToDelete = req.body.name;
  let passwordUsernameToDelete = req.body.password;

  const indexUserNameToDelete = data.users.findIndex((user) => (user.name == usernameToDelete)&&(user.password == passwordUsernameToDelete))

  if (indexUserNameToDelete >= 0){ //  Ya hay una persona con ese nombre
    data.users.splice(indexUserNameToDelete, 1); //  Se agrega un nuevo usuario a la lista
    saveData(JSON.stringify(data.users));
    res.send({"result": true, "description":'Usuario eliminado correctamente'});
    return;
  } else{
    res.send({"result": false, "description":'La contraseña es incorrecta'});
  };
})



//  SECCION PARA ACTIVAR EL SERVIDOR

const PORT = process.env.PORT  || 3000;

server.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto ${PORT}....`);
});



