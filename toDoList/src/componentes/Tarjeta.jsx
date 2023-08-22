import React from "react";
import "../hojas-de-estilo/Tarjeta.css"
import { useLazyDeleteTaskQuery } from "../services/task.service";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/userSlice";

function Tarjeta({ id, titulo, prioridad, descripcion, responsable}){

  const dispatch = useDispatch();
    
  const [deleteTask, { isFetching }] = useLazyDeleteTaskQuery();
   
  const onDeleteTask = (data) => {
    deleteTask(data)
      .then( (response) => {
        // If the deletion is successful, the new task list is established
        dispatch(setTasks([...response.data.tasks]))
      })
      .catch((response) => {
        console.log(response.message);
      })
  }

  return(
    <div>
      <div className='tarjeta-contenedor'>

        <div className='parte-superior'>
          <p className='titulo-tarea'> { titulo } </p>
          <div className={`prioridad prioridad-${(prioridad === 0) ? 'baja' : (prioridad === 1) ? 'media' : 'alta'}`}>
              {(prioridad === 0) ? 'baja' : (prioridad === 1) ? 'media' : 'alta'}
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
          <div className='boton-borrar' onClick={() => isFetching ?  null : onDeleteTask({ idToDoToEliminate: id })}>
            Borrar
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tarjeta;