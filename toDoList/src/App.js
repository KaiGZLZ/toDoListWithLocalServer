
import { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";

//  COMPONENTES 

import Formulario from "./componentes/Formulario";
import GridTareas from "./componentes/GridTareas";
import BotonOrdenamiento from "./componentes/BotonOrdenamiento";
import CuadroInicio from "./componentes/CuadroInicio";
import BotonDeSalida from "./componentes/BotonDeSalida";
import BotonEliminarCuenta from "./componentes/BotonEliminarCuenta";

import { apiUrl } from './config/config';


function App() {

  const ipServer = apiUrl;

  const [tareasOriginales, setTareasOriginales] = useState([]); //  Tareas por orden de llegada 
  const [tareas, setTareas] = useState([]);                     //  Tareas a ser mostradas en pantalla

  const [tipoDeOrdenamiento, setTipoDeOrdenamiento] = useState(0);

  var tareasOriginalesCopia;  /*  Variable para almacenar el cambio y mostrarlo inmediatamente. Fue la solucion que se 
                                  dio para el problema de que no se actualizaban los Hooks al momento de modificarlos 
                                  en la funcion agregarTarea, y utilizarlos inmediatamente en mostrarTareas */

  const addTodo = tarea => {

    tarea.title = tarea.title.trim();
    tarea.responsible = tarea.responsible.trim();

    const tareasActualizadas = [tarea, ...tareasOriginales]; // De esta manera se une un objeto con un arreglo de objetos del mismo tipo
    
    setTareasOriginales(tareasActualizadas);

    tareasOriginalesCopia = tareasActualizadas.slice();
    showTodos(tipoDeOrdenamiento);
  }
  
  const deleteTodo = id => {

    const tareasActualizadas = tareasOriginales.filter(tarea => tarea.id !== id);
    
    setTareasOriginales(tareasActualizadas);
    
    tareasOriginalesCopia = tareasActualizadas.slice();
    showTodos(tipoDeOrdenamiento);
  }
  
  const showTodos = tipoOrdenamiento => {

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
        <Switch>
          <Route path="/user/:username" element={
            <>
              <BotonOrdenamiento
                onPresionar={showTodos}/>

              <Formulario
                onSubmit={addTodo}
                ipServer={ipServer}/>

              <BotonDeSalida/>

              <BotonEliminarCuenta
                ipServer={ipServer}
                />

              <div className="seccion-formulario">
                {/* Esta seccion deberá quedar vacia tal y como esta*/}
              </div>
              <div className='contenedor-principal'>
                <div className="seccion-tareas">
                  <div>
                    <GridTareas 
                      tareas={tareas}
                      borrarTarea={deleteTodo}
                      ipServer={ipServer}
                      />
                  </div>
                </div>
              </div>
            </>
            
          }>
          </Route>
          <Route path="/" element={
            <>
              <Formulario
                onSubmit={addTodo}
                ipServer={ipServer}
                />

              <CuadroInicio 
                obtenerTareas={(toDoListObtained) => { setTareasOriginales(toDoListObtained); setTareas(toDoListObtained)} }
                ipServer={ipServer}
                />
            </>
          }>
          </Route> 
        </Switch>
      </Router>
    </>
  );
}


export default App;
