import React from "react";
import { useParams } from "react-router-dom";
import "../hojas-de-estilo/Tarjeta.css"





function Tarjeta({ id, titulo, prioridad, descripcion, responsable, onBorrar, ipServer}){
 
  //const valorPrioridad = () => ((prioridad == 0) ? 'baja' : (prioridad == 1) ? 'media' : 'alta');

  const params = useParams();

  const dataToSend = {
    name: params.username,
    idToDoToEliminate: id
  }

  const deleteToDo = () => {

    console.log('Enviando mensaje');

    fetch(ipServer + 'task/delete', {
      method: 'DELETE', 
      body: JSON.stringify(dataToSend), 
      headers:{
      'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => { console.log(response.description) }
    );

    onBorrar(id); //  Se borra en la pantalla*/
  }


  return(
    <div>
      <div className='tarjeta-contenedor'>

        <div className='parte-superior'>
          <p className='titulo-tarea'> { titulo } </p>
          <div className={`prioridad prioridad-${(prioridad == 0) ? 'baja' : (prioridad == 1) ? 'media' : 'alta'}`}>
              {(prioridad == 0) ? 'baja' : (prioridad == 1) ? 'media' : 'alta'}
          </div>
        </div>

        <div className='parte-media'>
          <div className="descripcion">
            { descripcion }
          </div>
          <div className="responsable">
            { responsable }
          </div>
        </div>

        <div className='parte-inferior'>
          <div className='boton-borrar' onClick={deleteToDo}>
            Borrar
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tarjeta;