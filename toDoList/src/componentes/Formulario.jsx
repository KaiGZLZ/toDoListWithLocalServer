import React, { useState } from "react";
import "../hojas-de-estilo/Formulario.css"
//import { useState } from "react";
import { v4 as uuidv4} from "uuid"
import { useParams } from "react-router-dom";

function Formulario(props){

  const params = useParams();

  const [toDo, setToDo] = useState(
    {
      title: '',
      description: '',
      responsible: '',
      priority: ''
    }
  );
  
  //const [nombreTareaEstado, setInput] = useState('');

  const sendData = e => {  //  Al presionar el boton

    e.preventDefault();

    const dataToSend = {
      name: params.username,
      tarea: {
        id: uuidv4(),
        title: toDo.title.trim(), 
        description: toDo.description.trim(),
        responsible: toDo.responsible.trim(),
        priority: toDo.priority
      }
    /*  NOTA: Si los campos tuviesen el mismo nombre, se pudiesen colocar de la siguiente manera
      tarea: {
        id: uuidv4(), ...tarea

        pero se prefirió dejar de esta manera ya que es más sencillo de entender
      } */
    }

    fetch(props.ipServer + '/register/tarea', {
      method: 'POST', 
      body: JSON.stringify(dataToSend), 
      headers:{
      'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => { console.log(response.description) }
    );

    props.onSubmit(dataToSend.tarea);; //  Se borra en la pantalla*/

    setToDo({...toDo, ...{title: '', description: '', responsible: '', priority: ''} });
  }

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
          <p>Prioridad</p>
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
        <button className='boton-submit' onClick={sendData}> Enviar </button>
      </form>
      </div>
    </div>
    
  );
}

export default Formulario;