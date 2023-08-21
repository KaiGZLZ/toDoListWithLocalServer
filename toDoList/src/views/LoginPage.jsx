import React from "react";
import "../hojas-de-estilo/Formulario.css"

function LoginPage(){


  return( <>
    
    {/* Formular section */}
    <div>
      <div className='formulario-contenedor'>

      <form className="formulario" >

        <input className="entrada-datos" type="text"
          placeholder="Tarea" 
          />
        <input className="entrada-datos" type="text"
          placeholder="Descripcion" 
          />
        <input className="entrada-datos" type="text"
          placeholder="Responsable" 
          />

        <div className="opciones-prioridad">
          <p className="titulo-Prioridad">Prioridad</p>
          <div className="opciones-contenedor">
            <div className="opcion">
              <input type="radio" id="prioridadAlta" name="prioridad" />
              <label htmlFor="prioridadAlta"> Baja</label>
            </div>
            <div className="opcion">
              <input type="radio" id="prioridadMedia" name="prioridad" />
              <label htmlFor="prioridadMedia"> Media</label>
            </div>
            <div className="opcion">
              <input type="radio" id="prioridadBaja" name="prioridad" />
              <label htmlFor="prioridadBaja"> Alta</label>
            </div>
          </div>
        </div>
        <button className='boton-submit'> Enviar </button>
      </form>
      </div>
    </div>

    
    
    
    
    
    
    </>
    
  );
}

export default LoginPage;