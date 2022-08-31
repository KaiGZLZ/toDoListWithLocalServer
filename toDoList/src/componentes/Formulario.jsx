import React from "react";
import "../hojas-de-estilo/Formulario.css"
//import { useState } from "react";
import { v4 as uuidv4} from "uuid"
import { useParams } from "react-router-dom";

function Formulario(props){

  const params = useParams();

  var nombreTarea = '';
  var nombreDescripcion = '';
  var nombreResponsable = '';
  var opcionPrioridad = '';

  //const [nombreTareaEstado, setInput] = useState('');

  const sendData = e => {  //  Al presionar el boton

    e.preventDefault();

    const dataToSend = {
      name: params.username,
      tarea: {
        id: uuidv4(),
        title: nombreTarea, 
        description: nombreDescripcion,
        responsible: nombreResponsable,
        priority: opcionPrioridad
      }
    }

    console.log(params);

    fetch('http://192.168.1.101:3000/register/tarea', {
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
  }

  const setTarea = e => { nombreTarea = e.target.value; }

  const setDescripcion = e => { nombreDescripcion = e.target.value; }

  const setResponsable = e => { nombreResponsable = e.target.value; }

  const setPrioridad = e => { opcionPrioridad = e.target.value; }

  return(
    <div>
      <div className='formulario-contenedor'>

      <form className="formulario" >

        <input className="entrada-datos" type="text" placeholder="Tarea" onChange={setTarea}/>
        <input className="entrada-datos" type="text" placeholder="Descripcion" onChange={setDescripcion}/>
        <input className="entrada-datos" type="text" placeholder="Responsable" onChange={setResponsable}/>

        <div className="opciones-prioridad">
          <p>Prioridad</p>
          <div className="opciones-contenedor">
            <div className="opcion">
              <input type="radio" id="prioridadAlta" name="prioridad" value={0} onClick={setPrioridad}/>
              <label htmlFor="prioridadAlta"> Baja</label>
            </div>
            <div className="opcion">
              <input type="radio" id="prioridadMedia" name="prioridad" value={1} onClick={setPrioridad}/>
              <label htmlFor="prioridadMedia"> Media</label>
            </div>
            <div className="opcion">
              <input type="radio" id="prioridadBaja" name="prioridad" value={2} onClick={setPrioridad}/>
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