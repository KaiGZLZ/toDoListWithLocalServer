import { useState } from "react";
import "../hojas-de-estilo/AplicacionTareas.css"
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link
} from "react-router-dom";

//  COMPONENTES 


import Formulario from "./Formulario";
import GridTareas from "./GridTareas";
import BotonOrdenamiento from "./BotonOrdenamiento";
import CuadroInicio from "./CuadroInicio";
import FormularioRegistro from "./FormularioRegistro";
import FormularioInicioSesion from "./FormularioInicioSesion";
import BotonDeSalida from "./BotonDeSalida";



function AplicacionTareas() {

  const [tareasOriginales, setTareasOriginales] = useState([]); //  Tareas por orden de llegada 
  const [tareas, setTareas] = useState([]);                     //  Tareas a ser mostradas en pantalla

  const [tipoDeOrdenamiento, setTipoDeOrdenamiento] = useState(0);

  var tareasOriginalesCopia;  /*  Variable para almacenar el cambio y mostrarlo inmediatamente. Fue la solucion que se 
                                  dio para el problema de que no se actualizaban los Hooks al momento de modificarlos 
                                  en la funcion agregarTarea, y utilizarlos inmediatamente en mostrarTareas */

  const agregarTarea = tarea => {

    if ((tarea.title.trim())&&(tarea.responsible.trim())){

      tarea.title = tarea.title.trim();
      tarea.responsible = tarea.responsible.trim();

      const tareasActualizadas = [tarea, ...tareasOriginales]; // De esta manera se une un objeto con un arreglo de objetos del mismo tipo
      
      setTareasOriginales(tareasActualizadas);

      tareasOriginalesCopia = tareasActualizadas.slice();
      mostrarTareas(tipoDeOrdenamiento);
      
    }
  }

  const eliminarTarea = id => {

    const tareasActualizadas = tareasOriginales.filter(tarea => tarea.id !== id);
    
    setTareasOriginales(tareasActualizadas);
    
    tareasOriginalesCopia = tareasActualizadas.slice();
    mostrarTareas(tipoDeOrdenamiento);
  }

  const mostrarTareas = tipoOrdenamiento => {

    setTipoDeOrdenamiento(tipoOrdenamiento);
    
    var tareaCopia; //  Lista de tareas que finalmente se va a mostrar


    if (tareasOriginalesCopia)  tareaCopia = tareasOriginalesCopia.slice();

    else  tareaCopia = tareasOriginales.slice();


    if(tipoOrdenamiento === 0){       //  Por orden de ingreso

      const tareasActualizadas = tareaCopia.slice();

      setTareas(tareasActualizadas);

    }
    else if(tipoOrdenamiento === 1){  //  Por orden Ascendente  

      const tareasActualizadas = tareaCopia.slice();

      tareasActualizadas.sort((a, b) => a.priority - b.priority);

      setTareas(tareasActualizadas);

    }
    else if(tipoOrdenamiento === 2){   // Por orden Descendente

      const tareasActualizadas = tareaCopia.slice(); 

      tareasActualizadas.sort((a, b) => b.priority - a.priority);

      setTareas(tareasActualizadas);
      
    }
  }

  return(
    <>
      <Router>
        <BotonOrdenamiento
          onPresionar={mostrarTareas}/>

          <Switch>
            <Route path="/user/:username" element={
              <>
              <Formulario
                onSubmit={agregarTarea}/>

              <BotonDeSalida/>

                <div className="seccion-formulario">
                  {/* Esta seccion deberá quedar vacia tal y como esta*/}
                </div>
                <div className='contenedor-principal'>
                  <div className="seccion-tareas">
                    <div>
                      <GridTareas 
                        tareas={tareas}
                        borrarTarea={eliminarTarea}/>
                    </div>
                  </div>
                </div>
              </>
              
            }>
            </Route>
            <Route path="/" element={
              <>
                <Formulario
                  onSubmit={agregarTarea}/>

                <CuadroInicio 
                  obtenerTareas={(toDoListObtained) => {setTareasOriginales(toDoListObtained); setTareas(toDoListObtained);} }
                  />
              </>
            }>
            </Route> 
          </Switch>
          
      </Router>
    </>
  );
}

export default AplicacionTareas;