
import { useEffect, useState } from "react";
import BotonOrdenamiento from "../componentes/BotonOrdenamiento";

import '../hojas-de-estilo/BotonOrdenamiento.css'
import Formulario from "../componentes/Formulario";
import { apiUrl } from "../config/config";
import BotonDeSalida from "../componentes/BotonDeSalida";
import BotonEliminarCuenta from "../componentes/BotonEliminarCuenta";
import GridTareas from "../componentes/GridTareas";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetTasksQuery } from "../services/task.service";
import { setTasks } from "../redux/userSlice";
//  COMPONENTES 


function Dashboard() {
  
  const [getTasks] = useLazyGetTasksQuery();

  const dispatch = useDispatch();

  const ipServer = apiUrl;
  
  const user = useSelector(state => state.user);

  const [shownTasks, setShownTasks] = useState([]);                     //  Tareas a ser mostradas en pantalla
  const [buttonState, setButtonState] = useState(0);


  useEffect(() => {

    orderTodos(buttonState)

  }, [user.tasks]);


  const orderTodos = orderType => {

    var tareaCopia = [...user.tasks];

    if(orderType === 0){       //  Por orden de ingreso

      const tareasActualizadas = tareaCopia.slice();

      setShownTasks(tareasActualizadas);

    }
    else if(orderType === 1){  //  Por orden Ascendente  

      const tareasActualizadas = tareaCopia.slice();

      tareasActualizadas.sort((a, b) => a.priority - b.priority);

      setShownTasks(tareasActualizadas);

    }
    else if(orderType === 2){   // Por orden Descendente

      const tareasActualizadas = tareaCopia.slice(); 

      tareasActualizadas.sort((a, b) => b.priority - a.priority);

      setShownTasks(tareasActualizadas);
      
    }
  }

  const orderTasksAction = () => {

    let orderType = buttonState === 2 ? 0 : buttonState + 1;

    orderTodos(orderType);
    setButtonState(orderType);
  }
  
  useEffect(() => {
    getTasks()
      .then((response) => {
        if(response.isSuccess){
          dispatch(setTasks([...response.data.tasks]))
        }
      })
  }, []);

  return( <>
        <BotonOrdenamiento 
            onClick={orderTasksAction}
            state={buttonState}/>

        <Formulario />

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
                    tasks={shownTasks}
                    />
                </div>
            </div>
        </div>
    </>
  );
}


export default Dashboard;
