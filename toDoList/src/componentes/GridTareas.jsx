import Tarjeta from "./Tarjeta";
import "../hojas-de-estilo/GridTareas.css";

function GridTareas({ tareas , borrarTarea}) {
  return(
    <ul className='grid-tareas'>
      {
        tareas.map((tarea) =>
          <Tarjeta  
            key={tarea.id}
            id={tarea.id}
            titulo={tarea.titulo}
            prioridad={tarea.prioridad}
            descripcion={tarea.descripcion}
            responsable={tarea.responsable}      

            onBorrar={borrarTarea}
              />
        )
      };
    </ul>
  );
}

export default GridTareas;