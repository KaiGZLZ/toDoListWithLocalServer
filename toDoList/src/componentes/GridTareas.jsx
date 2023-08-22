import Tarjeta from "./Tarjeta";
import "../hojas-de-estilo/GridTareas.css";

function GridTareas({ tasks }) {

  return(
    <ul className='grid-tareas'>
      {
        tasks.map((task) =>
          <Tarjeta
            key={task.id}
            id={task.id}
            titulo={task.title}
            prioridad={task.priority}
            descripcion={task.description}
            responsable={task.responsible}
              />
        )
      };
    </ul>
  );
}

export default GridTareas;