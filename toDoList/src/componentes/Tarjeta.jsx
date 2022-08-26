import React from "react";
import "../hojas-de-estilo/Tarjeta.css"





function Tarjeta({ id, titulo, prioridad, descripcion, responsable, onBorrar}){
 
  //const valorPrioridad = () => ((prioridad == 0) ? 'baja' : (prioridad == 1) ? 'media' : 'alta');

  function valor() {

    if (prioridad == 0) return 'baja';
    
    else if (prioridad == 1) return 'media';

    else return 'alta';
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
          <div className='boton-borrar' onClick={() => onBorrar(id)}>
            Borrar
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tarjeta;