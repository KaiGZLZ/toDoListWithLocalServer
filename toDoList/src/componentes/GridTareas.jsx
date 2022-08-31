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
            titulo={tarea.title}
            prioridad={tarea.priority}
            descripcion={tarea.description}
            responsable={tarea.responsible}      

            onBorrar={borrarTarea}
              />
        )
      };
    </ul>
  );
}

export default GridTareas;