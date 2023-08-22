import React, { useEffect, useState } from "react";
import "../hojas-de-estilo/Formulario.css"
import { v4 as uuidv4} from "uuid"
import { useLazyRegisterTaskQuery } from "../services/task.service";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/userSlice";

function Formulario(){

  const dispatch = useDispatch();

  const [registerTask, {data, isFetching, isSuccess, error}] = useLazyRegisterTaskQuery();

  const [toDo, setToDo] = useState(
    {
      title: '',
      description: '',
      responsible: '',
      priority: ''
    }
  );

  // When the button is pressed
  const sendData = e => {

    e.preventDefault();

    const data = {
      task: {
        id: uuidv4(),
        title: toDo.title.trim(), 
        description: toDo.description.trim(),
        responsible: toDo.responsible.trim(),
        priority: (toDo.priority === '' ? 0 : toDo.priority)
      }
    }
    registerTask(data)
  }

  // Handle fetch results
  useEffect(() => {

    if(isSuccess){
      
      dispatch(setTasks([...data.tasks]))
      setToDo({...toDo, ...{title: '', description: '', responsible: '', priority: ''} });
    }

    if (error){
      console.log({error});
    }    
  }, [isFetching]);

  return(
    <div>
      <div className='formulario-contenedor'>

      <form className="formulario" >

        <input className="entrada-datos" type="text" 
          value={toDo.title}
          placeholder="Tarea" 
          onChange={e => setToDo({...toDo, ...{title: e.target.value} })}
          />
        <input className="entrada-datos" type="text" 
          value={toDo.description}
          placeholder="Descripcion" 
          onChange={e => setToDo({...toDo, ...{description: e.target.value} })}
          />
        <input className="entrada-datos" type="text" 
          value={toDo.responsible}
          placeholder="Responsable" 
          onChange={ e => setToDo({...toDo, ...{responsible: e.target.value} })}
          />

        <div className="opciones-prioridad">
          <p className="titulo-Prioridad">Prioridad</p>
          <div className="opciones-contenedor">
            <div className="opcion">
              <input type="radio" id="prioridadAlta" name="prioridad" value={0} onClick={ e => setToDo({...toDo, ...{priority: e.target.value} })}/>
              <label htmlFor="prioridadAlta"> Baja</label>
            </div>
            <div className="opcion">
              <input type="radio" id="prioridadMedia" name="prioridad" value={1} onClick={ e => setToDo({...toDo, ...{priority: e.target.value} })}/>
              <label htmlFor="prioridadMedia"> Media</label>
            </div>
            <div className="opcion">
              <input type="radio" id="prioridadBaja" name="prioridad" value={2} onClick={ e => setToDo({...toDo, ...{priority: e.target.value} })}/>
              <label htmlFor="prioridadBaja"> Alta</label>
            </div>
          </div>
        </div>
        <button className='boton-submit' disabled={isFetching} onClick={sendData}> 
          { isFetching && <div className='spinner'></div> }Enviar 
        </button>
      </form>
      </div>
    </div>
    
  );
}

export default Formulario;