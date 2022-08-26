import React from "react";
import "../hojas-de-estilo/Formulario.css"
//import { useState } from "react";
import { v4 as uuidv4} from "uuid"

function Formulario(props){

  var nombreTarea = '';
  var nombreDescripcion = '';
  var nombreResponsable = '';
  var opcionPrioridad = '';

  //const [nombreTareaEstado, setInput] = useState('');

  const enviarDatos = e => {  //  Al presionar el boton

    e.preventDefault();

    const tareaNueva = {
      id: uuidv4(),
      titulo: nombreTarea, 
      descripcion: nombreDescripcion,
      responsable: nombreResponsable,
      prioridad: opcionPrioridad
    }
    props.onSubmit(tareaNueva);
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
              <label for="prioridadAlta"> Baja</label>
            </div>
            <div className="opcion">
              <input type="radio" id="prioridadMedia" name="prioridad" value={1} onClick={setPrioridad}/>
              <label for="prioridadMedia"> Media</label>
            </div>
            <div className="opcion">
              <input type="radio" id="prioridadBaja" name="prioridad" value={2} onClick={setPrioridad}/>
              <label for="prioridadBaja"> Alta</label>
            </div>
          </div>
        </div>
        <button className='boton-submit' onClick={enviarDatos}> Enviar </button>
      </form>
      </div>
    </div>
    
  );
}

export default Formulario;